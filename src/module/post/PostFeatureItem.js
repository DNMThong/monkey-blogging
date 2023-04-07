import { doc, getDoc } from '@firebase/firestore';
import { db } from 'firebase-app/firebase-config';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import slugify from 'slugify';
import styled from 'styled-components';
import PostCategory from './PostCategory';
import PostImage from './PostImage';
import PostMeta from './PostMeta';
import PostTitle from './PostTitle';

const PostFeatureItemStyles = styled.div`
    border-radius: 16px;
    position: relative;
    color: #fff;

    img {
        border-radius: 16px;
    }

    .overlay {
        position: absolute;
        inset: 0;
        border-radius: 16px;
        background: rgba(0,0,0,0.4);
        mix-blend-mode: multiply;
        opacity: 0.6;
    }

    .post-content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px;

        .top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;

        }

    }
`

const PostFeatureItem = ({ data,...props }) => {
    // const [category,setCategory] = useState(null)
    // const [author,setAuthor] = useState(null)


    // useEffect(() => {
    //     const docRef = doc(db,"categories",data.categoryId)
    //     getDoc(docRef).then((snapshot) => {
    //         setCategory({
    //             ...snapshot.data(),
    //         })
    //     })
       
    // },[data.categoryId])

    // useEffect(() => {
    //     const docRef = doc(db,"users",data.author)
    //     getDoc(docRef).then((snapshot) => {
    //         setAuthor({
    //             ...snapshot?.data()
    //         })
    //     })
       
    // },[data.author])
   const { category ,author } = data
    if(!data) return null;
   const date = new Date(data?.createdAt?.seconds * 1000|| Date.now)
   const dateFormat = new Date(date).toLocaleDateString("vi-Vi")


    return (
        <PostFeatureItemStyles>
            <PostImage src={data.image} alt=""></PostImage>
            <div className="overlay"></div>
            <div className="post-content">
                <div className="top">
                    <PostCategory to={category?.slug || "/"} type="secondary" className="category">{category?.name || ""}</PostCategory>
                    <PostMeta to={slugify(author?.fullname || "",{lower: true})} tc="#fff" time={dateFormat} author={author?.fullname || ""}></PostMeta>
                </div>
                <PostTitle to={data?.slug || "/"} tc="#fff">{data.title}</PostTitle>
            </div>
        </PostFeatureItemStyles>
    );
};

export default PostFeatureItem;