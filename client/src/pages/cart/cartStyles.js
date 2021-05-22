import { Link } from 'react-router-dom';
import {
  ShoppingCartIcon,
  ArrowNarrowRightIcon,
} from '@heroicons/react/outline';
import styled from 'styled-components';
import tw from 'twin.macro';

// ** Empty Cart Styles

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

// ** Cart Styles

export const CartStyles = styled.div`
  ${tw`flex flex-wrap gap-6 m-4 sm:m-8 `}
`;
export const CartList = styled.div`
  ${tw`flex-1 p-8 bg-gray-700 rounded-md`}
`;

export const OrderSummary = styled.div`
  ${tw`p-8 bg-gray-700 rounded-md`}
  h3 {
    ${tw`mt-0 text-2xl`}
  }
  & > button {
    ${tw`w-full text-lg`}
  }
`;

export const CouponCode = styled.form`
  & > div {
    ${tw`flex gap-4`}
  }
  label {
    ${tw`block mb-2 text-sm font-bold`}
  }
  input {
    ${tw`px-3 py-2 text-lg leading-tight text-white bg-gray-600 border-2 border-gray-600 border-solid rounded-md appearance-none focus:outline-none focus:shadow-md focus:border-green-400`}
    ::placeholder {
      ${tw`text-base text-gray-400`}
    }
  }
`;

export const BillDetails = styled.div`
  ${tw`my-8`}
  p {
    ${tw`flex justify-between `}
    &:last-child {
      ${tw`pt-5 text-2xl border-0 border-t border-gray-500 border-solid `}
    }
  }
`;
