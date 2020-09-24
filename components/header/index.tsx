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
  flex-direction: column;
  padding: 1.5rem 2rem 0 2rem;
  justify-content: space-between;

  @media (max-width: 600px) {
    align-items: flex-start;
    padding: 1rem 1rem 0 1rem;
  }
`;
const TopBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;

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
  align-items: center;
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
      <TopBlock>
        <TitleBlock>
          <Title>COVID-19</Title>
          <LastUpdated>Laatst geüpdate: {lastUpdated}</LastUpdated>
        </TitleBlock>
        <DarkModeToggle>
          <SunIcon fill={fontColor} />
          <Toggle id="darkModeToggle" toggle={toggleDarkMode} value={isDarkMode} />
          <MoonIcon fill={fontColor} />
        </DarkModeToggle>
      </TopBlock>
      <Select
        value={{ value: selectedProvince, label: selectedProvince }}
        onChange={handleChange}
        options={options}
        styles={{
          container: (provided) => ({
            ...provided,
            marginTop: '1rem',
            marginBottom: '.5rem',
            width: '370px',
            maxWidth: '100%',
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
    </HeaderDiv>
  );
};

export default Header;
