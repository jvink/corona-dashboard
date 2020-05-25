import useDarkMode from 'use-dark-mode';
import styled from 'styled-components';
import Toggle from '../toggle';

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
const DarkModeToggle = styled.div`
  display: flex;
  & > button {
    font-size: 1.2em;
    background: none;
    border: none;
    color: #F79F1F;
    cursor: pointer;
    transition: color 0.3s ease;
    &:last-child {
      color: ${props => props.theme.hintColor};
    }

    &:focus {
      outline: none;
    }
  }
`;

const Header = () => {
  const darkMode = useDarkMode(false);

  return (
    <HeaderDiv>
      <TextBlock>
        <Title>COVID-19</Title>
        <SubTitle>Nederland</SubTitle>
      </TextBlock>
      <DarkModeToggle>
        <button type="button" onClick={darkMode.disable}>
          ☀
        </button>
        <Toggle id="darkModeToggle" toggle={darkMode.toggle} value={darkMode.value} />
        <button type="button" onClick={darkMode.enable}>
          ☾
        </button>
      </DarkModeToggle>
    </HeaderDiv>
  );
};

export default Header;
