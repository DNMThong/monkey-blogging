import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const InputStyles = styled.div`
  width: 100%;
  position: relative;
  input {
    padding: 16px 16px 16px 20px;
    padding-right: ${({ hasIcon }) => (hasIcon ? "50px" : "16px")};
    width: 100%;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    border: 1px solid transparent;
    transition: all linear 0.2s;
    &:focus {
      border-color: ${(props) => props.theme.primary};
      background-color: white;
    }
    &::-webkit-input-placeholder {
      color: #b1b5c4;
    }
    &::-moz-placeholder {
      color: #b1b5c4;
    }
  }
  .icon {
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    cursor: pointer;
  }
`;

const Input = ({
  name = "",
  type = "input",
  control,
  defaultValue = "",
  children,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue,
  });
  return (
    <InputStyles hasIcon={!!children}>
      <input id={name} type={type} {...field} {...props} />
      {children && <div className="icon">{children}</div>}
    </InputStyles>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  control: PropTypes.object,
  defaultValue: PropTypes.string,
  children: PropTypes.any,
};

export default Input;
