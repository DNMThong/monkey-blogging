import { Button } from 'components/button';
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components'

const NotFoundPageStyles = styled.div`
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    .logo {
        img {
            width: 200px;
        }
    }

    .msg {
        display: block;
        font-size: 40px;
        font-weight: 700;
        margin: 40px 0;
    }

    .back {
        width: 200px;
    }

`

const NotFoundPage = () => {
    return (
        <NotFoundPageStyles>
            <NavLink to='/' className='logo'>
                <img src="/logoMonkey.svg" alt="logo-monkey-blogging" />
            </NavLink>
            <span className='msg'>Oops! Page not found</span>
            <Button className='back' to="/">Back to home</Button>
        </NotFoundPageStyles>
    );
};

export default NotFoundPage;