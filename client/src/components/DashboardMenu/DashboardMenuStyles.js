import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ChevronDownIcon } from '@heroicons/react/solid';

export const DashboardMenuWrapper = styled.div`
  ${tw`flex items-center justify-between mx-8`}
`;

export const MenuButton = styled.div`
  ${tw`relative inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-bold text-white bg-green-500 rounded-md cursor-pointer bg-opacity-20 hover:bg-opacity-30`}
`;
export const Menu = styled.div`
  ${tw`relative`}
`;

export const Icon = styled(ChevronDownIcon)`
  ${tw`w-5 h-5 ml-2 -mr-1 text-green-200 hover:text-green-100`}
`;

export const MenuOptions = styled.ul`
  ${tw`absolute top-0 right-0 flex flex-col w-56 p-2 transform bg-black rounded-md shadow-lg cursor-default translate-y-9`}
`;
export const MenuItem = styled.li`
  ${tw`p-2 list-none rounded-md cursor-pointer hover:bg-green-400`}
  &:hover > a {
    ${tw`text-black`}
  }
`;
export const MenuLink = styled(Link)`
  ${tw`text-white no-underline`}
`;
