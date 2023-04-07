import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import PropTypes from "prop-types";

const PostTitleStyles = styled.h3`
    ${props => props.size === "normal" && css`
        font-size: 20px;
    `};
    ${props => props.size === "small" && css`
        font-size: 18px;
    `};
    ${props => props.size === "large" && css`
        font-size: 24px;
    `};
    font-weight: 600;
    
    a {
        color: ${props => props.tc};
        display: block;
    }

`

const PostTitle = ({children,to="/",size="normal",tc="#232323",...props}) => {
    return (
        <PostTitleStyles {...props} size={size} tc={tc}>
            <Link to={to}>
                {children}
            </Link>
        </PostTitleStyles>
    );
};

PostTitle.propsType = {
    size : PropTypes.oneOf(["normal","small","large"]).isRequired
}

export default PostTitle;