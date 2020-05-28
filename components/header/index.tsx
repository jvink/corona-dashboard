import { useContext } from 'react';
import useDarkMode from 'use-dark-mode';
import styled, { ThemeContext } from 'styled-components';

import Toggle from '../toggle';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import { ThemeProps } from '../../theme';

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
const LastUpdated = styled.span`
  color: ${props => props.theme.hintColor};
  margin-top: 12px;
  font-size: 14px;
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
  const theme: ThemeProps = useContext(ThemeContext);
  
  return (
    <HeaderDiv>
      <TextBlock>
        <Title>COVID-19</Title>
        <SubTitle>Nederland</SubTitle>
        <LastUpdated>Laatst geüpdate: 28 mei 2020</LastUpdated>
      </TextBlock>
      <DarkModeToggle>
        <button type="button" onClick={darkMode.disable}>
          <SunIcon fill={theme.fontColor} />
        </button>
        <Toggle id="darkModeToggle" toggle={darkMode.toggle} value={darkMode.value} />
        <button type="button" onClick={darkMode.enable}>
          <MoonIcon fill={theme.fontColor} />
        </button>
      </DarkModeToggle>
    </HeaderDiv>
  );
};

export default Header;
