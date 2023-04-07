import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LoadingSpinnerStyles = styled.div`
  border-radius: 50%;
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border: ${({ borderSize }) => borderSize} solid ${({ color }) => color};
  border-left-color: transparent;
  border-right-color: transparent;
  background-color: transparent;
  animation: spinner linear 1s infinite;

  @keyframes spinner {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = ({
  size = "40px",
  borderSize = "4px",
  color = "#fff",
  className
}) => {
  return (
    <LoadingSpinnerStyles
      className={className}
      size={size}
      borderSize={borderSize}
      color={color}
    ></LoadingSpinnerStyles>
  );
};

LoadingSpinner.propTypes = {
  size: PropTypes.string,
  borderSize: PropTypes.string,
  color: PropTypes.string,
};

export default LoadingSpinner;
