import React from 'react';
import styled from 'styled-components';

const HeadingStyles = styled.h3`
    font-size: 28px;
    color: ${(props) => props.theme.tertiary};
    position: relative;
    line-height: 2;
    margin-bottom: 20px;

    &::after {
        content: "";
        width: 70px;
        height: 3px;
        border-radius: 2px;
        background-color: ${(props) => props.theme.accent};
        position: absolute;
        top: 0;
        left: 0;
    }
`

const Heading = ({children,className}) => {
    return (
        <HeadingStyles className={className}>
            {children}
        </HeadingStyles>
    );
};

export default Heading;