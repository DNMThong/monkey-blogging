import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const AuthenticationPageStyles = styled.div`
  .logo {
    margin: 20px auto;
    width: 100px;
  }
  .heading {
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    text-align: center;
    font-size: 36px;
    margin-bottom: 40px;
  }
  .form {
    max-width: 600px;
    margin: auto;
  }
  .suggestions {
    margin-bottom: 40px;
    a {
      color: ${(props) => props.theme.primary};
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyles>
      <div className="container">
      <NavLink to='/'>
        <img src="logoMonkey.svg" alt="logo monkey blogging" className="logo" />
      </NavLink>
        <h3 className="heading">Monkey Blogging</h3>
        {children}
      </div>
    </AuthenticationPageStyles>
  );
};

export default AuthenticationPage;
