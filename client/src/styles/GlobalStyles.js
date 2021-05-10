import { createGlobalStyle } from 'styled-components';
import tw from 'twin.macro';

const GlobalStyles = createGlobalStyle`
  body {
   font-family: 'Helvetica';
   ${tw`m-0 text-white bg-gray-800`}
  }`;

export default GlobalStyles;
