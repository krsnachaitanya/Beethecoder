import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';
import { api } from '../backend';
import Base from './Base';

const Heading = styled.h1`
  ${tw`text-8xl font-extralight`}
`;

const Home = () => {
  return (
    <Base>
      <Heading>Home {api}</Heading>
    </Base>
  );
};

export default Home;
