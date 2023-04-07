import { collection, getDocs, limit, onSnapshot, query, startAfter, where } from "@firebase/firestore";
import { ActionDelete, ActionEdit, ActionView } from "components/action";
import { Button } from "components/button";
import { LabelStatus } from "components/label";
import { Table } from "components/table";
import { useAuth } from "contexts/auth-context";
import { db } from "firebase-app/firebase-config";
import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postStatus, userRole } from "utils/constants";

const labelPostStatus = (status) => {
  switch (status) {
    case postStatus.APPROVED : 
      return <LabelStatus type="success">Approved</LabelStatus>
    case postStatus.PENDING : 
      return <LabelStatus type="warning">Pending</LabelStatus>
    case postStatus.REJECT : 
      return <LabelStatus type="error">Reject</LabelStatus>
    default: return null;
  }
}

const POSTS_PER_PAGE = 1



const PostManage = () => {
  const { userInfo } = useAuth()
  const [posts,setPosts] = useState([])
  const [lastDoc,setLastDoc] = useState(null)
  const [total,setTotal] = useState(0);
  const navigate = useNavigate()

  useEffect(() => {
    const colRef = collection(db,"posts");
    const q = query(colRef,limit(POSTS_PER_PAGE))
    onSnapshot(q,(snapshot) => {
      const listPost = []
      snapshot.forEach((item) => {
        listPost.push({
          id: item.id,
          ...item.data()
        })
      })
      setPosts(listPost)
      const findLastDoc = async () => {
        // Query the first page of docs
        const first = query(collection(db, "posts"), limit(1));
        const documentSnapshots = await getDocs(first);
    
        // Get the last visible document
        const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
        setLastDoc(lastVisible)
      }
  
      onSnapshot(colRef,(snapshot) => {
        setTotal(snapshot.size)
      })
  
      findLastDoc()
    })
  },[])

  

  const handleLoadMore = async () => {
    // Construct a new query starting at this document,
    // get the next 25 cities.
    const next = query(collection(db, "posts"),
        startAfter(lastDoc),
        limit(POSTS_PER_PAGE));
    const snapshot = await getDocs(next)

    snapshot.forEach(doc => {
      setPosts(prevCategory => [...prevCategory,{ id: doc.id, ...doc.data() }])
    })
    const documentSnapshots = await getDocs(next);
      // Get the last visible document
      const lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    setLastDoc(lastVisible)
  }

  const handleSearchPost = debounce((e) => {
    const filter = e.target.value;
    const colRef = collection(db,"posts")
    const q = query(colRef,where("title",">=",filter),where("title","<=",filter+"utf8"));
    getDocs(q).then(snapshot => {
      const listCategory = []
      snapshot.forEach((doc) => {
        listCategory.push({
          id: doc.id,
          ...doc.data()
        })
      })
      setPosts(listCategory)
    })
  },500)

  if(userInfo.role!== userRole.ADMIN) return;

  return (
    <div>
      <h1 className="dashboard-heading">Manage post</h1>
      <div className="mb-10 flex justify-end">
        <div className="w-full max-w-[300px]">
          <input
            type="text"
            className="w-full p-4 rounded-lg border border-solid border-gray-300"
            placeholder="Search post..."
            onChange={handleSearchPost}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {
          posts.length > 0 &&
          posts.map(post => (
            <tr key={post.id}>
              <td></td>
              <td title={post?.id}>{post?.id.slice(0,5)+"..."}</td>
              <td>
                <div className="flex items-center gap-x-3">
                  <img
                    src={post?.image}
                    alt=""
                    className="w-[66px] h-[55px] rounded object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold max-w-[300px] whitespace-pre-wrap">{post?.title}</h3>
                    <time className="text-sm text-gray-500">
                      {
                        new Date(post?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")
                      }
                    </time>
                  </div>
                </div>
              </td>
              <td>
                <span className="text-gray-500">{post?.category?.name}</span>
              </td>
              <td>
                <span className="text-gray-500">{post?.author?.username}</span>
              </td>
              <td>
                  {labelPostStatus(post?.status)}
              </td>
              <td>
                <div className="flex items-center gap-x-3 text-gray-500">
                  <ActionView onClick={() => navigate(`/${post?.slug}`)}></ActionView>
                  <ActionEdit onClick={() => navigate(`/manage/update-post?id=${post?.id}`)}></ActionEdit>
                  <ActionDelete></ActionDelete>
                </div>
              </td>
            </tr>
          ))
        }
        </tbody>
      </Table>
      {
        posts.length < total &&
        <Button kind="secondary" onClick={handleLoadMore}>Load more</Button>
      }
    </div>
  );
};

export default PostManage;
