import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';

export const FormWrapper = styled.div`
  ${tw`self-center mb-16`}
`;

export const Form = styled.form`
  ${tw`relative max-w-lg px-8 pt-6 pb-8 bg-gray-700 rounded shadow-md`}
`;

export const FormHeader = styled.div`
  & > p {
    ${tw`text-2xl font-medium`}
  }
`;
export const CloseButton = styled.button`
  ${tw`absolute top-0 right-0 px-3 py-1 m-2 text-2xl bg-white bg-opacity-30 hover:bg-white hover:bg-opacity-60`}
`;

export const FormInput = styled.div`
  ${tw`mb-4`}
  label {
    ${tw`block mb-2 text-sm font-bold`}
  }
  input,
  select,
  textarea {
    ${tw`w-full px-3 py-2 text-lg leading-tight text-white bg-gray-600 border-2 border-gray-600 border-solid rounded appearance-none focus:outline-none focus:shadow-md focus:border-green-400`}
    ::placeholder {
      ${tw`text-base text-gray-400`}
    }
  }
  textarea {
    ${tw`resize-y`}
  }
  input[type='number'] {
    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      ${tw`m-0 appearance-none`}
    }
  }
`;

export const SubmitContainter = styled.div`
  ${tw`flex items-center justify-around pt-5`}
`;

export const SubmitButton = styled.button(({ disabled }) => [
  disabled && tw`text-gray-400 bg-gray-600 pointer-events-none`,
]);

export const CancelLink = styled(Link)`
  ${tw`px-5 py-2 font-bold text-gray-400 no-underline rounded-md cursor-pointer hover:text-red-500 `}
`;

export const ForgotPassword = styled.a`
  ${tw`inline-block text-sm font-bold text-gray-400 no-underline hover:text-gray-200`}
`;

export const Modal = styled.div`
  ${tw`absolute flex flex-col items-center justify-center min-w-full min-h-full bg-black bg-opacity-40`}
`;

export const Wrapper = styled.div`
  ${tw`flex justify-center p-8 m-8 bg-gray-600 rounded-md min-w-min`}
`;
