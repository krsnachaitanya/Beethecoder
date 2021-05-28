import { Link } from 'react-router-dom';
import styled from 'styled-components';
import tw from 'twin.macro';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { ShoppingCartIcon } from '@heroicons/react/solid';

export const NavBarStyles = styled.nav`
  & > ul {
    ${tw`flex gap-4 px-0 pb-4 mx-8 my-4 list-none border-0 border-b border-gray-500 border-solid`}
    & > li {
      ${tw`relative`}
    }
  }
`;

export const NavLink = styled(Link)`
  ${tw`inline-block p-4 text-white no-underline capitalize rounded-md hover:text-green-500`}
  ${(props) => props.isactive && tw`text-green-500 bg-gray-900 shadow-md `}
`;

export const MenuLink = styled(NavLink)`
  ${tw`flex gap-1`}
`;
export const NavLinkIcon = styled(NavLink)`
  ${tw`flex items-center gap-1`}
`;

export const NavLinkMenu = styled.div`
  ${tw`absolute z-10 pt-2 transform translate-x-1/2 shadow-md right-1/2`}
  ul {
    ${tw`flex flex-col p-2 bg-gray-900 rounded-md `}
  }
`;

export const MenuItem = styled.li`
  ${tw`list-none `}
  & > a {
    ${tw`block p-2 text-white no-underline rounded-md cursor-pointer hover:text-black hover:bg-green-500`}
  }
`;

export const Icon = styled(ChevronDownIcon)`
  ${tw`w-5 h-5 -mr-1 text-green-200`}
  ${(props) => props.isactive && tw`text-green-500`}
`;

export const CartIcon = styled(ShoppingCartIcon)`
  ${tw`w-6 h-6`}
`;

export const CartPill = styled.span`
  ${tw`absolute my-1 mx-2 top-0 left-0 p-0.5 px-1.5 text-xs font-bold text-white bg-blue-900 rounded-full`}
`;
