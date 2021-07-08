import React from 'react';
import { createGlobalStyle } from 'styled-components';
import tw, { theme, GlobalStyles as BaseStyles } from 'twin.macro';

const CustomStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    -webkit-tap-highlight-color: ${theme`colors.purple.500`};
    ${tw`antialiased`}
   font-family: 'Helvetica';
   ${tw`m-0 text-white bg-gray-800`}
  }
  
  #root {
  ${tw`flex flex-col min-h-screen `}
  & > :nth-child(2) {
    ${tw`flex-auto `}
  }
}

  button{
    ${tw`px-5 py-2 text-base font-bold text-white bg-green-700 border-none rounded-md cursor-pointer hover:bg-green-600`}
  }
  `;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
