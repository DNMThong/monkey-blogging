import { collection, limit, onSnapshot, query, where } from '@firebase/firestore';
import Heading from 'components/layout/Heading';
import { db } from 'firebase-app/firebase-config';
import PostItem from 'module/post/PostItem';
import PostNewestItem from 'module/post/PostNewestItem';
import PostNewestLarge from 'module/post/PostNewestLarge';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';

const HomeNewestStyles = styled.div`
    margin-top: 40px;

    .layout {
        display: grid;
        grid-template-columns: repeat(2,minmax(0, 1fr));
        gap: 40px;
        margin-bottom: 40px;
        
        .sidebar {
            padding: 0 20px;
            background-color: #F3EDFF;
            display: grid;
            grid-template-rows: repeat(3,1fr);
            border-radius: 16px;

            & > * {
                padding: 20px 0;
                border-bottom: 1px solid #E0E0E0;
            }

            & > *:last-child {
                border-bottom: none;
            }
        }
    }
`

const HomeNewest = () => {
    const [homeNewestPosts,setHomeNewestPosts] = useState([])

    useEffect(() => {
        const colRef = collection(db,"posts")
        const q = query(colRef,where("status","==",1),where("hot","==",false),limit(4))
        const result = []
        onSnapshot(q,(snapshot) => {
            snapshot.forEach((item) => {
                result.push({
                    id: item.id,
                    ...item.data()
                })
            })
            setHomeNewestPosts(result)
        })
    },[])

    const [first,...other] = homeNewestPosts;

    return (
        <HomeNewestStyles>
        <div className="container">
            <Heading>Mới nhất</Heading>
            <div className="layout">
                <PostNewestLarge data={first}></PostNewestLarge>
                <div className="sidebar">
                    {
                        other.length > 0 &&
                        other.map(item => (
                            <PostNewestItem key={item.id} data={item}></PostNewestItem>
                        ))
                    }
                </div>
            </div>
            <div className="grid-layout grid-layout--primary">
                <PostItem></PostItem>
                <PostItem></PostItem>
                <PostItem></PostItem>
                <PostItem></PostItem>
            </div>
        </div>
        </HomeNewestStyles>
    );
};

export default HomeNewest;