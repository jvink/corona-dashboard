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
const ProvinceSelect = styled.select`
  color: ${props => props.theme.primaryColor};
  background-color: transparent;
  border: none;
  padding: 12px 0px;
  outline: none;
  font-size: 1rem;
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

interface HeaderProps {
  lastUpdated: string;
  selectedProvince: string;
  setSelectedProvince: (province: string) => void;
}

const Header = (props: HeaderProps) => {
  const { lastUpdated, selectedProvince, setSelectedProvince } = props;
  const darkMode = useDarkMode(false);
  const theme: ThemeProps = useContext(ThemeContext);
  
  return (
    <HeaderDiv>
      <TextBlock>
        <Title>COVID-19</Title>
        <ProvinceSelect value={selectedProvince} onChange={(event) => setSelectedProvince(event.target.value)}>
          <option id="Nederland" value="">Nederland</option>
          <option id="Drenthe" value="Drenthe">Drenthe</option>
          <option id="Flevoland" value="Flevoland">Flevoland</option>
          <option id="Friesland" value="Friesland">Friesland</option>
          <option id="Gelderland" value="Gelderland">Gelderland</option>
          <option id="Groningen" value="Groningen">Groningen</option>
          <option id="Limburg" value="Limburg">Limburg</option>
          <option id="Noord-Brabant" value="Noord-Brabant">Noord-Brabant</option>
          <option id="Noord-Holland" value="Noord-Holland">Noord-Holland</option>
          <option id="Overijssel" value="Overijssel">Overijssel</option>
          <option id="Utrecht" value="Utrecht">Utrecht</option>
          <option id="Zeeland" value="Zeeland">Zeeland</option>
          <option id="Zuid-Holland" value="Zuid-Holland">Zuid-Holland</option>
        </ProvinceSelect>
        <LastUpdated>Laatst geüpdate: {lastUpdated}</LastUpdated>
      </TextBlock>
      <DarkModeToggle>
        <button name="toggleLightMode" type="button" onClick={darkMode.disable}>
          <SunIcon fill={theme.fontColor} />
        </button>
        <Toggle id="darkModeToggle" toggle={darkMode.toggle} value={darkMode.value} />
        <button name="toggleDarkMode" type="button" onClick={darkMode.enable}>
          <MoonIcon fill={theme.fontColor} />
        </button>
      </DarkModeToggle>
    </HeaderDiv>
  );
};

export default Header;
