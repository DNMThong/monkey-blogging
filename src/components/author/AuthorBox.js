import { doc, onSnapshot } from '@firebase/firestore';
import { db } from 'firebase-app/firebase-config';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const AuthorBoxStyles = styled.div`
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    .img {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      border-radius: inherit;
    }
    .img img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    .content {
      flex: 1;
      padding: 0 20px;
    }
    .name {
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 20px;
    }
    .desc {
      font-size: 14px;
      line-height: 2;
    }
`

const AuthorBox = ({ authorId }) => {
    const [author,setAuthor] = useState({})

    useEffect(() => {
        if(!authorId) return;
        const colRef = doc(db,"users",authorId)
        onSnapshot(colRef,(snapshot) => {
            setAuthor({
                ...snapshot.data()
            })
        })
    },[authorId])

    if(!authorId) return;
    return (
        <AuthorBoxStyles>
            <div className="img">
                <img
                    src={author?.avatar}
                    alt=""
                />
            </div>
            <div className="content">
                <h3 className="name">{author?.username}</h3>
                <p className="desc">
                    {author?.description}
                </p>
            </div>
        </AuthorBoxStyles>
    );
};

export default AuthorBox;