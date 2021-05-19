import styled from 'styled-components';
import tw from 'twin.macro';
import { PlusIcon, MinusSmIcon } from '@heroicons/react/solid';

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
  & > img {
    ${tw`w-full rounded-2xl`}
  }
`;

export const CardContent = styled.div`
  ${tw`flex items-center justify-between gap-6`}
`;

export const Name = styled.p``;

export const Price = styled.p`
  ${tw`text-xl font-bold`}
`;

export const AddToCart = styled.button`
  ${tw`bottom-0 w-full `}
`;

export const Quantity = styled.button`
  ${tw`flex items-center justify-between w-full gap-1 p-0 bg-transparent select-auto hover:bg-transparent`}
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
