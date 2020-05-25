import useDarkMode from 'use-dark-mode';
import styled from 'styled-components';

const HeaderDiv = styled.div`
  display: flex;
  padding: 1.5rem 2rem;
  justify-content: space-between;
  align-items: center;
`;
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const Title = styled.h1`
  color: ${props => props.theme.fontColor};
  margin: 0;
`;
const SubTitle = styled.h3`
  color: ${props => props.theme.primaryColor};
  margin-top: 4px;
  margin-bottom: 0;
`;
const Icon = styled.svg`
  fill: ${props => props.theme.primaryColor};
  height: 1.5rem;
  width: 1.5rem;
`;

const Header = () => {
  const darkMode = useDarkMode(false);

  return (
    <HeaderDiv>
      <TextBlock>
        <Title>COVID-19</Title>
        <SubTitle>Nederland</SubTitle>
      </TextBlock>
      <div onClick={darkMode.toggle}>
        <Icon>
          {darkMode.value ? <><path d="M9 2c-1.05 0-2.05.16-3 .46 4.06 1.27 7 5.06 7 9.54 0 4.48-2.94 8.27-7 9.54.95.3 1.95.46 3 .46 5.52 0 10-4.48 10-10S14.52 2 9 2z"/><path d="M0 0h24v24H0z" fill="none"/></> : <><path d="M0 0h24v24H0z" fill="none"/><path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm-1 16.95h2V19.5h-2v2.95zm-7.45-3.91l1.41 1.41 1.79-1.8-1.41-1.41-1.79 1.8z"/></> }
        </Icon>
      </div>
    </HeaderDiv>
  );
};

export default Header;
