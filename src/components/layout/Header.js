import { Button } from "components/button";
import { Input } from "components/input";
import { useAuth } from "contexts/auth-context";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const menu = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "BLog",
  },
  {
    url: "/contract",
    title: "Contact",
  },
];

const HeaderStyles = styled.header`
  padding: 20px 0;
  .header-main {
    display: flex;
    align-items: center;
  }

  .logo-link {
    display: inline-block;
    img {
      width: 50px;
    }
  }

  .menu {
    display: flex;
    gap: 20px;
    list-style: none;
    margin-left: 20px;
    a {
      text-decoration: none;
      font-weight: 600;
    }
  }

  .search {
    margin-left: auto;
    position: relative;
    width: 300px;

    input {
      width: 100%;
      padding: 12px 32px 12px 20px;
      border: 1px solid #cfcfcf;
      border-radius: 8px;
    }

    .search-icon {
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
    }
  }

  .user {
    margin-left: 10px;
    font-weight: 500;
  }
`;

const Header = () => {
  const { userInfo } = useAuth();

  function getLastName(name) {
    if(!name) return "..."
    const arrName = name.split(" ")
    return arrName[arrName.length - 1];
  }

  // signOut(auth)
  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/" className="logo-link">
            <img src="/logoMonkey.svg" alt="logo-monkey-blogging" />
          </NavLink>
          <ul className="menu">
            {menu.map((item) => (
              <li key={item.title}>
                <NavLink to={item.url} className={({isActive}) => isActive? "text-green-500":""}>{item.title}</NavLink>
              </li>
            ))}
          </ul>
          {/* <div className="search">
            <input name="search" type="text" placeholder="Search post..." />
            <svg
              width="18"
              height="17"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="search-icon"
            >
              <ellipse
                cx="7.66669"
                cy="7.05161"
                rx="6.66669"
                ry="6.05161"
                stroke="#999999"
                strokeWidth="1.5"
              />
              <path
                d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                stroke="#999999"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div> */}
          <div className="ml-auto">
            {userInfo ? <Button
              type="button"
              width="150px"
              style={{ maxWidth: "150px", marginLeft: "12px", height: "50px" }}
              to="/dashboard"
            >
              Dashboard
            </Button>
                :
            <Button
              type="button"
              width="150px"
              style={{ maxWidth: "150px", marginLeft: "12px", height: "50px" }}
              to="/sign-in"
            >
              Sign Up
            </Button>
            }
          </div>
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
