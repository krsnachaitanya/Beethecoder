import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`
  body {
   font-family: 'Helvetica';
   ${tw`box-border m-0 text-white bg-gray-800`}
  }
  
  #root {
  ${tw`flex flex-col min-h-screen `}
  & > :nth-child(2) {
    ${tw`flex-auto `}
  }
}

  button{
    ${tw`px-5 py-2 text-base bg-green-500 border-none rounded-md cursor-pointer hover:bg-green-600`}
  }
  `;

export default GlobalStyles;
