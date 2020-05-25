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
const Toggle = styled.span`
  position: relative;
  padding: 0 4px;
  display: flex;
  align-items: center;
`;
const ToggleCheckBox = styled.input`
  width: 40px;
  height: 10px;
  background: #D9D9D9;
  position: relative;
  border-radius: 5px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;
  vertical-align: 2px;
  outline: none;

  &:checked + label {
    left: 30px;
  }

  &:focus-visible {
    outline: solid 2px white;
  }

  & + label {
    display: inline-block;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transition: all 0.3s ease;
    cursor: pointer;
    position: absolute;
    left: 2px;
    background-color: #4E7DD4;
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
      <DarkModeToggle onClick={darkMode.toggle}>
        <button type="button" onClick={darkMode.disable}>
          ☀
        </button>
        <Toggle>
          <ToggleCheckBox
            type="checkbox"
            checked={darkMode.value}
            onChange={darkMode.toggle}
            onClick={darkMode.toggle}
            id="dmcheck"
            aria-labelledby="dmchecklabel"
          />
          <label id="dmchecklabel" htmlFor="dmcheck" onClick={darkMode.toggle} />
        </Toggle>
        <button type="button" onClick={darkMode.enable}>
          ☾
        </button>
      </DarkModeToggle>
    </HeaderDiv>
  );
};

export default Header;
