import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const FooterStyles = styled.footer`
  ${tw`p-6 text-center bg-gray-900`}
`;

const Footer = () => {
  return (
    <FooterStyles>
      <div>
        <h4>If you got any questions, feel free to reach out.</h4>
        <button>Contact Us</button>
      </div>
    </FooterStyles>
  );
};

export default Footer;
