import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`
  body {
   font-family: 'Helvetica';
   ${tw`box-border m-0 text-white bg-gray-800`}
  }
  button{
    ${tw`p-4 text-base bg-yellow-400 border-none cursor-pointer`}
  }
  `;

export default GlobalStyles;
