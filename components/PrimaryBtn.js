import React from "react";
import styled, { css } from "styled-components";

export const buttonStyle = css`
  border: 0;
  padding: 5px 15px;
  border-radius: 5px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  svg {
    height: 16px;
    width: 16px;
    margin-right: 5px;
  }
  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
  ${(props) =>
    props.white &&
    !props.outline &&
    css`
      background-color: #fff;
      color: #000;
    `}
    ${(props) =>
    props.black &&
    !props.outline &&
    css`
      background-color: #000;
      color: #fff;
    `}
    ${(props) =>
    props.black &&
    props.outline &&
    css`
      background-color: transparent;
      background-color: #000;
      color: #fff;
    `}
  ${(props) =>
    props.white &&
    props.outline &&
    css`
      background-color: transparent;
      color: #fff;
      border: 1px solid #fff;
    `}
  ${(props) =>
    props.primary &&
    !props.outline &&
    css`
      background-color: #5542f6;
      boder: 1px solid #5542f6;
      color: #fff;
    `}
    ${(props) =>
    props.primary &&
    props.outline &&
    css`
      background-color: transparent;
      border: 1px solid #5542f6;
      color: #5542f6;
    `}
  ${(props) =>
    props.size === "l" &&
    css`
      text-size: 1.2rem;
      padding: 10px 20px;
    `}
    
`;

const StyledBtn = styled.button`
  ${buttonStyle}
`;

const PrimaryBtn = ({ children, ...rest }) => {
  return <StyledBtn {...rest}>{children}</StyledBtn>;
};

export default PrimaryBtn;
