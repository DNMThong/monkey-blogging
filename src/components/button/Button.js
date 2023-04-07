import { LoadingSpinner } from "components/loading";
import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const ButtonStyles = styled.button`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "58px"};
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  ${props => props.kind === "primary" && css`
    color: #fff;
    background-image: linear-gradient(
      to right bottom,
      ${(props) => props.theme.primary},
      ${(props) => props.theme.secondary}
    );
  `}
  ${props => props.kind === "secondary" && css`
    color: ${props => props.theme.primary};
    background: #fff;
  `}
  ${(props) =>
    props.kind === "ghost" &&
    css`
      color: ${(props) => props.theme.primary};
      background-color: rgba(29, 192, 113, 0.1);
    `};
  &:disabled {
    opacity: 0.7;
    pointer-events: none;
  }
`;

const Button = ({
  type = "button",
  onClick = () => {},
  children,
  isLoading,
  to,
  kind = "primary",
  ...props
}) => {
  const navigate = useNavigate()
  if(to) {
    return (
       <ButtonStyles type={type} kind={kind} {...props} onClick={(e) => navigate(to)}>
        {isLoading ? <LoadingSpinner></LoadingSpinner> : children}
        </ButtonStyles>
  )
  }
  return (
    <ButtonStyles type={type} kind={kind} onClick={onClick} {...props}>
      {isLoading ? <LoadingSpinner></LoadingSpinner> : children}
    </ButtonStyles>
  );
};

Button.propTypes = {
  type: PropTypes.oneOf(["submit", "button"]),
  onClick: PropTypes.func,
  isLoading: PropTypes.bool,
  children: PropTypes.any,
};

export default Button;
