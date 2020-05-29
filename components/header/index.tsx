import { useContext } from 'react';
import useDarkMode from 'use-dark-mode';
import styled, { ThemeContext } from 'styled-components';
import Select from 'react-select';

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
  font-size: 1.17em;
  font-weight: bolder;
  margin-top: 4px;
  margin-bottom: 0;
  margin-left: -4px;
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

  const options = [
    { value: '', label: 'Nederland' },
    { value: 'Drenthe', label: 'Drenthe' },
    { value: 'Flevoland', label: 'Flevoland' },
    { value: 'Friesland', label: 'Friesland' },
    { value: 'Gelderland', label: 'Gelderland' },
    { value: 'Groningen', label: 'Groningen' },
    { value: 'Limburg', label: 'Limburg' },
    { value: 'Noord-Brabant', label: 'Noord-Brabant' },
    { value: 'Noord-Holland', label: 'Noord-Holland' },
    { value: 'Overijssel', label: 'Overijssel' },
    { value: 'Utrecht', label: 'Utrecht' },
    { value: 'Zeeland', label: 'Zeeland' },
    { value: 'Zuid-Holland', label: 'Zuid-Holland' },
  ];

  function handleChange({ value }) {
    setSelectedProvince(value);
  }

  return (
    <HeaderDiv>
      <TextBlock>
        <Title>COVID-19</Title>
        <Select
          value={selectedProvince}
          onChange={handleChange}
          options={options}
        />
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
