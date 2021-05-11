import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const AlertStyles = styled.div(({ status }) => [
  tw`absolute px-6 py-1 text-white transform translate-x-1/2 border-0 rounded shadow-lg right-1/2`,
  status === 'success' ? tw`bg-blue-500` : tw`bg-red-500`,
]);

const Message = styled.p`
  ${tw`inline-block mr-10`}
  &>strong {
    ${tw`block pb-1 text-xl capitalize`}
  }
`;

const AlertButton = styled.button`
  ${tw`absolute top-0 right-0 px-3 py-1 m-2 text-2xl bg-white bg-opacity-30 hover:bg-white hover:bg-opacity-60`}
`;

const Alert = ({ status = 'status', message = 'message', handleAlert }) => {
  return (
    open && (
      <AlertStyles status={status} role="alert">
        <Message>
          <strong>{status}!</strong> {message}
        </Message>
        <AlertButton onClick={handleAlert}>
          <span>×</span>
        </AlertButton>
      </AlertStyles>
    )
  );
};

export default Alert;
