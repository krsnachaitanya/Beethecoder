import styled from 'styled-components';
import tw from 'twin.macro';
import { PlusIcon, MinusSmIcon, TrashIcon } from '@heroicons/react/solid';

export const CardContainer = styled.div`
  ${tw`grid grid-cols-1 gap-6 m-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6`}
  & > * {
    ${tw`w-full `}
  }
`;

export const CardStyles = styled.div`
  ${tw`flex flex-col justify-between p-4 bg-gray-700 rounded-3xl min-w-min`}
`;

export const ImageWrapper = styled.div`
  ${({ cartItem }) => [cartItem && tw`row-span-2 min-w-min`]}

  & > img {
    ${({ cartItem }) => [
      cartItem
        ? tw`object-cover w-24 h-24 rounded-sm sm:w-28 sm:h-28`
        : tw`w-full rounded-2xl`,
    ]}
  }
`;

export const CardContent = styled.div`
  ${tw`flex items-center justify-between gap-6`}
`;

export const Name = styled.p`
  ${tw`col-span-2 my-0 font-bold sm:col-span-1 sm:row-span-2`}

  & > span {
    ${tw`block text-sm font-normal text-gray-300`}
  }
`;

export const Price = styled.p`
  ${({ cartItem }) => [
    cartItem
      ? tw`col-span-1 text-xl font-bold sm:row-span-2 justify-self-end`
      : tw`text-xl font-bold`,
  ]}
`;

export const AddToCart = styled.button`
  ${tw`bottom-0 w-full `}
`;

export const Quantity = styled.button`
  ${({ cartItem }) => [
    tw`flex items-center p-0 bg-transparent select-auto hover:bg-transparent`,
    !cartItem && tw`justify-between w-full`,
    cartItem ? tw`col-span-1 gap-5 sm:row-span-2 min-w-min` : tw`gap-1`,
  ]}

  p {
    ${tw`m-0 font-bold`}
  }
`;

export const IconWrapper = styled.div`
  ${tw`flex items-center justify-between`}
`;

export const Plus = styled(PlusIcon)`
  ${tw`w-10 h-10 bg-green-500 rounded-md shadow-sm `}
`;

export const Minus = styled(MinusSmIcon)`
  ${tw`w-10 h-10 bg-green-500 rounded-md shadow-sm `}
`;

export const Delete = styled(TrashIcon)`
  ${tw`w-10 h-10 p-1.5 bg-green-500 rounded-md shadow-sm `}
`;

export const CartItemStyles = styled.div`
  ${tw`grid items-center my-8 sm:my-4 min-w-min`}
  grid-template-columns: 6rem 1fr 1fr;
  column-gap: 1rem;
  @media (min-width: 640px) {
    grid-template-columns: 7rem 1fr 1fr 1fr;
  }
`;
