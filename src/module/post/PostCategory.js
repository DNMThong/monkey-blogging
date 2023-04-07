import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

const PostCategoryStyles = styled.span`
    padding: 4px 12px;
    border-radius: 8px;
    color: #6b6b6b;
    font-weight: 500;
    display: inline-block;

    ${props => props.type === "primary" && css`
        background-color: #F3EDFF;
    `}

    ${props => props.type === "secondary" && css`
        background-color: #fff;
    `}

`

const PostCategory = ({children,to="/",className,type = "primary"}) => {
    return (
        <PostCategoryStyles className={className} type={type}>
            <Link to={to}>
                {children}
            </Link>
        </PostCategoryStyles>
    );
};

export default PostCategory;