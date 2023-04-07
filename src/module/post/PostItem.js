import React from 'react';
import slugify from 'slugify';
import styled from 'styled-components';
import PostCategory from './PostCategory';
import PostImage from './PostImage';
import PostMeta from './PostMeta';
import PostTitle from './PostTitle';

const PostItemStyles = styled.div`
    .content {
        color: #000;
        .title {
            margin: 12px 0;
        }
    }
`

const PostItem = ({ data }) => {
    const date = new Date(data?.createdAt?.seconds * 1000|| Date.now)
    const dateFormat = new Date(date).toLocaleDateString("vi-Vi")
    if(!data) return;
    return (
        <PostItemStyles>
            <PostImage s height="200px" src={data?.image} alt="" className="shadow-md mb-5"></PostImage>
            <div className="content">
                <PostCategory to={`/category/${data?.category?.slug}`}>{data?.category?.name}</PostCategory>
                <PostTitle className="title" size="small" to={`/${data?.slug}`}>{data?.title}</PostTitle>
                <PostMeta  to={slugify(data?.author?.username || "",{lower: true})} time={dateFormat} author={data?.author?.username || ""}></PostMeta>
            </div>
        </PostItemStyles>
    );
};

export default PostItem;