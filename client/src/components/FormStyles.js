import styled from 'styled-components';
import tw from 'twin.macro';

export const FormWrapper = styled.div`
  ${tw`self-center`}
  div {
    ${tw``}
  }
`;

export const Form = styled.form`
  ${tw``}
  & > div {
    ${tw` flex flex-col gap-4`}
  }
`;

export const FormInput = styled.div`
  ${tw``}
  label {
    ${tw`block text-sm font-medium`}
  }
  input {
    ${tw`py-2 px-3 focus:ring-2  focus:outline-none bg-transparent  border-solid rounded-md `}
  }
`;
