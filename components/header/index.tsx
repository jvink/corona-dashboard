import { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Select from 'react-select';

import { DarkModeContext } from '../../pages/_app';
import Toggle from '../toggle';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import { ThemeProps } from '../../theme';

const HeaderDiv = styled.div`
  display: flex;
  padding: 1.5rem 2rem 0 2rem;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1100px) {
    align-items: flex-start;
  }
`;
const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleBlock = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;
const Title = styled.h1`
  color: ${props => props.theme.fontColor};
  margin: 0;
  margin-right: 1rem;
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
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);
  const { fontColor }: ThemeProps = useContext(ThemeContext);

  const options = [
    { value: 'Landelijk', label: 'Landelijk' },
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
        <TitleBlock>
          <Title>COVID-19</Title>
          <LastUpdated>Laatst geüpdate: {lastUpdated}</LastUpdated>
        </TitleBlock>
        <Select
          value={{ value: selectedProvince, label: selectedProvince }}
          onChange={handleChange}
          options={options}
          styles={{
            container: (provided) => ({
              ...provided,
              marginTop: '1rem',
              marginBottom: '.5rem',
            }),
            control: (provided) => ({
              ...provided,
              backgroundColor: 'transparent',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: '#4E7DD4',
              fontSize: '1.17em',
              fontWeight: 'bolder',
            })
          }}
        />
      </TextBlock>
      <DarkModeToggle>
        <SunIcon fill={fontColor} />
        <Toggle id="darkModeToggle" toggle={toggleDarkMode} value={isDarkMode} />
        <MoonIcon fill={fontColor} />
      </DarkModeToggle>
    </HeaderDiv>
  );
};

export default Header;
