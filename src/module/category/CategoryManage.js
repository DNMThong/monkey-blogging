import { collection, deleteDoc, doc, endAt, getDoc, getDocs, limit, onSnapshot, query, startAfter, startAt, where } from "@firebase/firestore";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { db } from "firebase-app/firebase-config";
import DashboardHeading from "module/dashboard/DashboardHeading";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { categoryStatus, CATEGORY_PER_PAGE, userRole } from "utils/constants";
import Swal from 'sweetalert2'
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { Button } from "components/button";
import { debounce } from "lodash";
import { orderBy } from "lodash";
import { useAuth } from "contexts/auth-context";

const CategoryManage = () => {
  const [categories,setCategories] = useState([])
  const [lastDoc,setLastDoc] = useState();
  const navigate = useNavigate()
  const [total,setTotal] = useState(0);

  useEffect(() => {
    const colRef = collection(db,"categories")

    const q = query(colRef,limit(CATEGORY_PER_PAGE))

    onSnapshot(q,(snapshot) => {
      const listCategory = []
      snapshot.forEach(doc => {
        listCategory.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setCategories(listCategory)
    })

    const findLastDoc = async () => {
      // Query the first page of docs
      const first = query(collection(db, "categories"), limit(1));
      const documentSnapshots = await getDocs(first);
  
      // Get the last visible document
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
      setLastDoc(lastVisible)
    }

    onSnapshot(colRef,(snapshot) => {
      setTotal(snapshot.size)
    })

    findLastDoc()
  },[])

  const handleDeleteCategory = (id) => {
    const docCategory = doc(db,"categories",id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteDoc(docCategory)
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })


  }

  const handleSearch = debounce((e) => {
    const filter = e.target.value;
    const colRef = collection(db,"categories")
    const q = query(colRef,where("name",">=",filter),where("name","<=",filter+"utf8"));
    getDocs(q).then(snapshot => {
      const listCategory = []
      snapshot.forEach((doc) => {
        listCategory.push({
          id: doc.id,
          ...doc.data()
        })
      })
      
      setCategories(listCategory)
    })
  },500)

  const handleLoadMoreCategory = async () => {
   

    // Construct a new query starting at this document,
    // get the next 25 cities.
    const next = query(collection(db, "categories"),
        startAfter(lastDoc),
        limit(CATEGORY_PER_PAGE));
    const snapshot = await getDocs(next)

    snapshot.forEach(doc => {
      setCategories(prevCategory => [...prevCategory,{ id: doc.id, ...doc.data() }])
    })
    const documentSnapshots = await getDocs(next);
      // Get the last visible document
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    setLastDoc(lastVisible)
  }

  const { userInfo } = useAuth()
  if(userInfo.role!== userRole.ADMIN) return;

  return (
    <div>
      <DashboardHeading
        title="Categories"
        desc="Manage your category"
      >
        <div>
          <Button kind="ghost" to="/manage/add-category" width="200px">
            Create category
          </Button>
          <input onChange={handleSearch} type="text" className="border border-gray-400 mt-5 rounded-lg px-3 py-2" placeholder="Enter your search..."/>
        </div>
      </DashboardHeading>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Slug</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {
            categories.length > 0 &&
            categories.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  <span className="italic text-gray-400">{item.slug}</span>
                </td>
                <td>
                  { item.status === categoryStatus.APPROVED && <LabelStatus type="success">Approved</LabelStatus>}
                  { item.status === categoryStatus.UNAPPROVED && <LabelStatus type="warning">Unapproved</LabelStatus>}
                </td>
                <td>
                  <div className="flex items-center gap-4">
                    <ActionView></ActionView>
                    <ActionEdit onClick={() => navigate(`/manage/update-category?id=${item.id}`)}></ActionEdit>
                    <ActionDelete onClick={() => handleDeleteCategory(item.id)}></ActionDelete>
                  </div>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
      {
        total > categories.length &&
        <Button width="250px" className="mx-auto mt-5" kind="secondary" onClick={handleLoadMoreCategory}>Load more</Button>
      }
    </div>
  );
};

export default CategoryManage;
