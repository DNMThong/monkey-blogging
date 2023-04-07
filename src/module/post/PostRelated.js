import { collection, getDocs, onSnapshot, query, where } from '@firebase/firestore';
import Heading from 'components/layout/Heading';
import { db } from 'firebase-app/firebase-config';
import React, { useEffect, useState } from 'react';
import PostItem from './PostItem';
let c = 0

const PostRelated = ({ categoryId }) => {
    const [posts,setPosts] = useState([])
    useEffect(() => {
        if(!categoryId) return;
        const colRef = collection(db,"posts")
        const q = query(colRef,where("category.id","==",categoryId))
        onSnapshot(q,(snapshot) => {
            const rs = []
            snapshot.forEach(item => {
                rs.push({
                    ...item.data()
                })
            })
            setPosts(rs)
        })
    },[categoryId])
    if(!categoryId) return;
    return (
        <div className="post-related">
            <Heading>Bài viết liên quan</Heading>
            <div className="grid-layout grid-layout--primary">
            {
                posts.length > 0 &&
                posts.map(item => (
                    <PostItem data={item} key={item.id}></PostItem>
                )) 
            }
            </div>
        </div>
    );
};

export default PostRelated;