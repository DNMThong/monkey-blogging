import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

const PostMetaStyles = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 10px;
    font-weight: 500;
    color: ${props => props.tc};

    .dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: ${props => props.tc};
        display: block;
    }
`

const PostMeta = ({time="Mar 23",to="/",author="Andiez Le",tc="#6b6b6b",...props}) => {
    return (
        <PostMetaStyles tc={tc} {...props}>
            <span className="time">{time}</span>
            <span className="dot"></span>
            <Link to={to}>
                <span className="author">{author}</span>
            </Link>
        </PostMetaStyles>
    );
};

export default PostMeta;