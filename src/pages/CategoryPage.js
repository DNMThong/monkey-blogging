import { collection, onSnapshot, query, where } from '@firebase/firestore';
import Heading from 'components/layout/Heading';
import Layout from 'components/layout/Layout';
import { db } from 'firebase-app/firebase-config';
import PostItem from 'module/post/PostItem';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
    const { slug } = useParams()
    const [posts,setPosts] = useState([])
    useEffect(() => {
        const colRef = collection(db,"posts")
        const q = query(colRef,where("category.slug","==",slug))

        onSnapshot(q,(snapshot) => {
            const rs = []
            snapshot.forEach(item => {
                rs.push({
                    id: item.id,
                    ...item.data()
                })
            })
            setPosts(rs)
        })
    },[])
    return (
        <Layout>
        <div className="container">
            <Heading className="mt-10">Danh mục</Heading>
            <div className="grid-layout grid-layout--primary">
            {
                posts.length > 0 &&
                posts.map(item => (
                    <PostItem data={item} key={item.id}></PostItem>
                )) 
            }
            </div>
        </div>
        </Layout>
    );
};

export default CategoryPage;