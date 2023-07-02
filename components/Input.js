import { styled } from "styled-components";

const StyledInput = styled.input`
  width: 100%;
  height: 34px;
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border: 1px solid #000;
  }
`;

export default function Input(props) {
  return <StyledInput {...props} />;
}
