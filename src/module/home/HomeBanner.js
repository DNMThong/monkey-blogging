import { Button } from 'components/button';
import React from 'react';
import styled from 'styled-components';

const HomeBannerStyles = styled.div`
    min-height: 400px;
    background-image: linear-gradient(
        to right bottom,
        ${props => props.theme.primary},
        ${props => props.theme.secondary}
    );
    .banner {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 40px;
        min-height: 400px;
        gap: 20px;

        &-content {
            display: flex;
            justify-content: center;
            flex-direction: column;
            gap: 20px;
            color: #fff;
            width: 50%;
            .heading {
                font-size: 40px;
                font-weight: 600;
            }

            .content {
                margin-bottom: 20px;
            }
        }

        &-img {
            width: 50%;
            img {
                width: 100%;
                object-fit: none;
            }
        }
    }

`

const HomeBanner = () => {
    return (
        <HomeBannerStyles>
            <div className="container">
                <div className="banner">
                    <div className="banner-content">
                        <h3 className="heading">Monkey Blogging</h3>
                        <p className="content">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
                        <Button type="button" to="/sign-up" kind="secondary" width="200px">Get start</Button>
                    </div>
                    <div className="banner-img">
                        <img src="banner-img.png" alt="banner" />
                    </div>
                </div>
            </div>
        </HomeBannerStyles>
    );
};

export default HomeBanner;