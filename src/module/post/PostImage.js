import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PostImageStyles = styled.div`
    border-radius: ${props => props.border};
    width: ${props => props.width};
    height: ${props => props.height};

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: inherit;
    }
`

const PostImage = ({src,alt,border="16px",width="auto",height="auto",to,...props}) => {
    if(to) {
       return (
        <PostImageStyles border={border} width={width} height={height} {...props}>
            <Link to={to}>
                <img src={src} alt={alt} />
            </Link>
        </PostImageStyles>
       )
    }
    return (
        <PostImageStyles border={border} width={width} height={height} {...props}>
            <img src={src} alt={alt} />
        </PostImageStyles>
    );
};

export default PostImage;