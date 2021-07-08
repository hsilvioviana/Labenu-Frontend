import styled, { css } from "styled-components";
import colors from "../../styles/colors";

export const Container = styled.div`
  border-radius: 10px;
  border-bottom: 1px solid #d9d9d9;
  width: 100%;
  color: #f4ede8;
  background-color: #fff;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  border-radius: 2px;
  height: 45px;
  & + div {
    margin-top: 8px;
  }
  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
      border-bottom-width: 1.8px;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-color: #0c359c;
    `}
  ${(props) =>
    props.isFielled &&
    css`
      border-color: #ff7d00;
    `}
    ${(props) =>
    props.isSize &&
    css`
      height: ${props.isSize};
    `}
  input {
    background: transparent;
    border: 0;
    flex: 1;
    color: ${colors.blue};
    outline: none;
    height: 45px;
    font-size: 17px;
    ${(props) =>
      props.isSize &&
      css`
        height: 35px;
      `}
    &::placeholder {
      color: #0c359c;
    }
  }
  svg {
    margin-right: 18px;
  }
`;