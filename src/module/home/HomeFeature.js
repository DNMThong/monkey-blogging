import { collection, getDoc, limit, onSnapshot, query, where } from '@firebase/firestore';
import Heading from 'components/layout/Heading';
import { db } from 'firebase-app/firebase-config';
import PostFeatureItem from 'module/post/PostFeatureItem';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const HomeFeatureStyles = styled.div`
    margin-top: 40px;
`

const HomeFeature = () => {
    const [featurePosts,setFeaturePosts] = useState([])

    useEffect(() => {
        const colRef = collection(db,"posts")
        const q = query(colRef,where("status","==",1),where("hot","==",true),limit(3))
        const result = []
        onSnapshot(q,(snapshot) => {
            snapshot.forEach((item) => {
                result.push({
                    id: item.id,
                    ...item.data()
                })
            })
            setFeaturePosts(result)
        })
    },[])

    if(featurePosts.length <= 0) return null;

    return (
        <HomeFeatureStyles>
            <div className="container">
                <Heading>Bài viết nổi bật</Heading>
                <div className="grid-layout">
                    {
                        featurePosts.map(item => <PostFeatureItem key={item.id} data={item}></PostFeatureItem>)
                    }
                    
                </div>
            </div>
        </HomeFeatureStyles>
    );
};

export default HomeFeature;