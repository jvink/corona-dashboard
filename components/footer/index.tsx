import styled from 'styled-components';

const FooterDiv = styled.footer`
  width: 100%;
  height: 50px;
  border-top: 1px solid ${props => props.theme.fontColor};
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Copyright = styled.span`
  color: ${props => props.theme.fontColor};
  margin-right: .5rem;
`;
const Link = styled.a`
  color: ${props => props.theme.fontColor};
`;

const Footer = () => {
  return (
    <FooterDiv>
      <Copyright>Copyright ©</Copyright>
      <Link
        href="https://www.linkedin.com/in/jurian-vink-282465141/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Jurian Vink
      </Link>
    </FooterDiv>
  );
};

export default Footer;
