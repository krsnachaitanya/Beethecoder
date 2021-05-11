import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const PageTitleStyles = styled.div`
  ${tw`mt-16 mb-20 text-center`}
  & > h2 {
    ${tw`text-4xl leading-3 font-extralight`}
  }
  & > p {
  }
`;

const PageTitle = ({ title = 'Title', description = 'Description' }) => {
  return (
    <PageTitleStyles>
      <h2>{title}</h2>
      <p>{description}</p>
    </PageTitleStyles>
  );
};

export default PageTitle;
