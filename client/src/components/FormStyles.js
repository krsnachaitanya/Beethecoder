import styled from 'styled-components';
import tw from 'twin.macro';

export const FormWrapper = styled.div`
  ${tw`self-center mb-16`}
`;

export const Form = styled.form`
  ${tw`max-w-xs px-8 pt-6 pb-8 bg-gray-700 rounded shadow-md `}
`;

export const FormInput = styled.div`
  ${tw`mb-4`}
  label {
    ${tw`block mb-2 text-sm font-bold`}
  }
  input {
    ${tw`w-full px-3 py-2 text-lg leading-tight text-white bg-gray-600 border-solid rounded focus:outline-none focus:border-green-400`}
    ::placeholder {
      ${tw`text-base text-gray-400`}
    }
  }
`;

export const SubmitContainter = styled.div`
  ${tw`flex items-center gap-8 pt-5`}
`;

export const SubmitButton = styled.button(({ disabled }) => [
  disabled && tw`text-gray-400 bg-gray-600 pointer-events-none`,
]);

export const ForgotPassword = styled.a`
  ${tw`inline-block text-sm font-bold text-gray-400 no-underline hover:text-gray-200`}
`;
