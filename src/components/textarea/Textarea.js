import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";

const TextareaStyles = styled.div`
  width: 100%;
  position: relative;
  textarea {
    padding: 16px 16px 16px 20px;
    padding-right: ${({ hasIcon }) => (hasIcon ? "50px" : "16px")};
    width: 100%;
    background-color: ${(props) => props.theme.grayLight};
    border-radius: 8px;
    border: 1px solid transparent;
    transition: all linear 0.2s;
    min-height: 200px;
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
 
`;

const Textarea = ({
  name = "",
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
    <TextareaStyles hasIcon={!!children}>
      <textarea id={name} {...field} {...props} />
    </TextareaStyles>
  );
};

Textarea.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object,
  defaultValue: PropTypes.string,
  children: PropTypes.any,
};

export default Textarea;
