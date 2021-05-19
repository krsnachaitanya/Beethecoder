import { Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/outline';
import styled from 'styled-components';
import tw from 'twin.macro';

export const EmptyCartIcon = styled(ShoppingCartIcon)`
  ${tw`w-40 h-40 text-gray-500 `}
`;

export const ArrowRight = styled(ArrowNarrowRightIcon)`
  ${tw`w-6 h-6`}
`;

export const ContinueShopping = styled(Link)`
  ${tw`inline-flex items-center gap-1 px-5 py-3 font-bold text-white no-underline bg-blue-500 rounded-md shadow-md whitespace-nowrap`}
`;

export const EmptyCart = styled.div`
  ${tw`my-20 text-center`}

  & > h3 {
    ${tw`m-0 text-2xl`}
  }

  & > p {
    ${tw`mb-12`}
  }
`;
