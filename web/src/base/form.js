import styled from "styled-components";
import {
  dangerColor,
  primaryColor
} from "../common/css/theme";

export const FormSuccessMessage = styled.p`
  border: 1px solid ${primaryColor};
  padding: 8px;
`;

export const FormErrorMessage = styled.p`
  border: 1px solid ${dangerColor};
  padding: 8px;    
`;

export const Form = styled.form `
  padding: 20px 0;
  max-width: 300px;
  margin: 0 auto;
`
export const FormItem = styled.div `
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`
export const FormCheckboxItem = styled.div `
  margin-bottom: 15px;
  display: flex;
  flex-direction: row;
`
export const FormLabel = styled.label `
  font-weight: 600;
`
export const FormInput = styled.input `
  border: 1px solid rgba(0,0,0.06);
  padding: 5px 15px;
`;

export const FormAction = styled.div `
  width: 100%;
  text-align: center;
`;

export const FormSubmit = styled.button `
  border: 1px solid rgba(0, 0, 0.06);
  padding: 5px 15px;
  background: #FFF;
  font-weight: 600;
  width: 80%;
  margin: 0 auto;
  &:hover {
    cursor: pointer;
  }
`;

export const FormButton = styled.button`
  margin-top: 20px;
  border: 1px solid rgba(0, 0, 0.06);
  padding: 5px 15px;
  background: #FFF;
  font-weight: 600;
  width: 80%;
  &:hover {
    cursor: pointer;
  }
`;