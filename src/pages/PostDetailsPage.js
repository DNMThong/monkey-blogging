import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostItem from "module/post/PostItem";
import PostMeta from "module/post/PostMeta";
import React from "react";
import styled from "styled-components";
import parse from 'html-react-parser';
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "firebase-app/firebase-config";
import { forEach } from "lodash";
import NotFoundPage from "./NotFoundPage";
import { AuthorBox } from "components/author";
import PostRelated from "module/post/PostRelated";

const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
    .author-info {
      flex-direction: column;
      .img {
        width: 100%;
        height: auto;
      }
    }
  }
`;

const PostDetailsPage = () => {
  const { slug } = useParams()
  const [post,setPost] = useState()

  useEffect(() => {
    const colRef = collection(db,"posts")
    const q = query(colRef,where("slug","==",slug))
    onSnapshot(q,(snapshot) => {
      snapshot.forEach(item => {
        setPost(item.data())
      })
    })

  },[slug])

  useEffect(() => {
    document.body.scrollIntoView({ behavior: "smooth", block: "start" })
  },[slug])

  if(!slug) return <NotFoundPage></NotFoundPage>

  return (
    <PostDetailsPageStyles>
      <Layout>
        <div className="container">
          <div className="post-header">
            <PostImage
              src={post?.image}
              className="post-feature"
            ></PostImage>
            <div className="post-info">
              <PostCategory to={`/category/${post?.category?.slug}`} className="mb-6">{post?.category?.name}</PostCategory>
              <h1 className="post-heading">
                {post?.title}
              </h1>
              <PostMeta author={post?.author?.fullname} time={new Date(post?.createdAt?.seconds * 1000).toLocaleDateString("vi-VI")}></PostMeta>
            </div>
          </div>
          <div className="post-content">
            <div className="entry-content">
              {parse(post?.content || "")}
            </div>
            <AuthorBox authorId={post?.author?.id}></AuthorBox>
          </div>
          <PostRelated categoryId={post?.category?.id}></PostRelated>
        </div>
      </Layout>
    </PostDetailsPageStyles>
  );
};

export default PostDetailsPage;
