import styled from 'styled-components';
import tw from 'twin.macro';

export const Table = styled.div`
  ${tw`mx-2 mb-8 overflow-auto md:mx-6 sm:mx-4 lg:mx-8`}
  & > div {
    ${tw`min-w-full `}/* height: 600px; */
  }
`;

export const TableComponent = styled.table`
  ${tw`min-w-full `}/* thead th {
    position: sticky;
    top: 0;
    background-color: black;
  } */
`;

export const THead = styled.thead`
  ${tw`bg-gray-600 `}
  & > tr {
    & > th {
      ${tw`px-6 py-3 text-xs font-medium tracking-wider text-left text-white uppercase`}
    }
  }
`;

export const NoHead = styled.th`
  ${tw`relative px-6 py-3`}
  & > span {
    ${tw`sr-only`}
  }
`;

export const TBody = styled.tbody`
  ${tw`bg-gray-700 `}
  & > tr {
    & > td {
      ${tw`px-6 py-4 whitespace-nowrap`}
    }
  }
`;

export const Person = styled.div`
  ${tw`flex items-center`}

  & > div:first-child {
    ${tw`flex-shrink-0 w-10 h-10`}

    & > img {
      ${tw`w-10 h-10 rounded-full`}
    }
  }

  & > div:last-child {
    ${tw`ml-4`}

    & > div:first-child {
      ${tw`text-sm font-medium text-gray-100`}
    }

    & > div:last-child {
      ${tw`text-sm text-gray-400`}
    }
  }
`;

export const Title = styled.div`
  ${tw`text-sm text-gray-100`}
`;

export const Department = styled.div`
  ${tw`text-sm text-gray-400`}
`;

export const Status = styled.span`
  ${tw`inline-flex px-2 text-xs font-semibold leading-5 text-green-100 bg-gray-500 rounded-full`}
`;

export const Role = styled.td`
  ${tw`px-6 py-4 text-sm text-gray-200 whitespace-nowrap`}
`;

export const Edit = styled.td`
  ${tw`px-6 py-4 text-sm font-semibold text-center whitespace-nowrap`}
  & > a {
    ${tw`text-gray-400 no-underline hover:text-white`}
  }
`;
export const Price = styled.td`
  ${tw`text-right `}
`;
