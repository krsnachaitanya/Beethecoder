import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
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

export default GlobalStyles;
