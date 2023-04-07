import React from 'react';
import slugify from 'slugify';
import styled from 'styled-components';
import PostCategory from './PostCategory';
import PostImage from './PostImage';
import PostMeta from './PostMeta';
import PostTitle from './PostTitle';

const PostNewestLargeStyles = styled.div`

    .content {
        margin-top: 20px;
        .title {
            margin: 12px 0;
        }  
    }
`

const PostNewestLarge = ({data}) => {
    if(!data) return null;
    const date = new Date(data?.createdAt?.seconds * 1000|| Date.now)
    const dateFormat = new Date(date).toLocaleDateString("vi-Vi")
    return (
        <PostNewestLargeStyles>
            <PostImage src={data?.image} alt=""></PostImage>
            <div className="content">
                <PostCategory>{data?.category?.name}</PostCategory>
                <PostTitle to={data?.slug} className="title" size="large">{data?.title}</PostTitle>
                <PostMeta to={slugify(data?.author?.fullname || "",{lower: true})} tc="#fff" time={dateFormat} author={data?.author?.fullname || ""}></PostMeta>
            </div>
        </PostNewestLargeStyles>
    );
};

export default PostNewestLarge;