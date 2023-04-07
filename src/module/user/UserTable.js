import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot } from '@firebase/firestore';
import { ActionDelete, ActionEdit } from 'components/action';
import { LabelStatus } from 'components/label';
import { Table } from 'components/table';
import { auth, db } from 'firebase-app/firebase-config';
import { deleteUser } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { userRole, userStatus } from 'utils/constants';

const renderStatusLabel = (status) => {
    switch (status) {
        case userStatus.ACTIVE :
            return (
                <LabelStatus type="success">ACTIVE</LabelStatus>
            )
        case userStatus.PENDING :
            return (
                <LabelStatus type="warning">PEDING</LabelStatus>
            )
        case userStatus.BAN :
            return (
                <LabelStatus type="danger">ACTIVE</LabelStatus>
            )
        default: return null
    }
}

const renderRoleLabel = (role) => {
    switch (role) {
        case userRole.ADMIN :
            return "Admin"
        case userRole.MOD :
            return "Mod"
        case userRole.USER :
            return "User"
        default: return null
    }
}

const UserTable = () => {
    const [listUser,setListUser] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const colRef = collection(db,"users")
        onSnapshot(colRef,(snapshot) => {
            const result = []
            snapshot.forEach(doc => {
                result.push({
                    id: doc.id,
                    ...doc.data()
                })
            })
            setListUser(result)
        })
    },[])
    console.log(listUser)

    const handleDeleteUser = async (user) => {
        const docUser = doc(db,"users",user.id)
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
              await deleteDoc(docUser)
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Info</th>
                        <th>Username</th>
                        <th>Email address</th>
                        <th>Status</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                    listUser.length > 0 && 
                    listUser.map(item => (
                        <tr key={item.id}>
                            <td title={item.id}>{item.id.slice(0,5)+"..."}</td>
                            <td className="whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <img 
                                        src={item?.avatar} 
                                        alt="" 
                                        className="w-16 h-16 rounded-sm object-cover"
                                    />
                                    <div className="flex flex-col">
                                        <h3>{item?.fullname}</h3>
                                        <time className="text-gray-500">{new Date().toLocaleString("vi-VI")}</time>
                                    </div>
                                </div>
                            </td>
                            <td>{item?.username}</td>
                            <td>{item?.email}</td>
                            <td>{renderStatusLabel(Number(item?.status))}</td>  
                            <td>{renderRoleLabel(Number(item?.role))}</td>
                            <td>
                                <div className="flex items-center gap-4">
                                    <ActionEdit onClick={() => navigate(`/manage/update-user?id=${item.id}`)}></ActionEdit>
                                    <ActionDelete onClick={() => handleDeleteUser(item)}></ActionDelete>
                                </div>
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </Table>
        </div>
    );
};

export default UserTable;