import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ChevronDownIcon } from '@heroicons/react/solid';

export const DashboardMenuWrapper = styled.div`
  ${tw`flex items-center justify-between mx-8`}
`;

export const MenuButton = styled.div`
  ${tw`inline-flex items-center justify-center h-10 px-4 py-2 text-sm font-bold text-white bg-green-500 rounded-md cursor-pointer bg-opacity-20 hover:bg-opacity-30`}
`;
export const MenuStyles = styled.div`
  ${tw`relative`}
`;

export const Icon = styled(ChevronDownIcon)`
  ${tw`w-5 h-5 ml-2 -mr-1 text-green-200 hover:text-green-100`}
`;

export const MenuOptions = styled.div`
  ${tw`absolute top-0 right-0 z-10 w-56 pt-8`}
  ul {
    ${tw`flex flex-col p-2 bg-black rounded-md shadow-lg cursor-default `}
  }
`;
export const MenuItem = styled.li`
  ${tw`list-none`}
`;
export const MenuLink = styled(Link)`
  ${tw`block p-2 text-white no-underline rounded-md cursor-pointer hover:text-black hover:bg-green-400`}
`;
