import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const PageTitleStyles = styled.div`
  ${tw`my-6 text-center`}
  & > h2 {
    ${tw`text-4xl font-semibold leading-3`}
  }
  & > p {
  }
`;

const PageTitle = ({ title = 'Title', description }) => {
  return (
    <PageTitleStyles>
      <h2>{title}</h2>
      <p>{description}</p>
    </PageTitleStyles>
  );
};

export default PageTitle;
