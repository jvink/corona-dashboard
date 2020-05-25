import styled from 'styled-components';

const ToggleSpan = styled.span`
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

interface ToggleProps {
  id: string;
  onOff?: boolean;
  toggle: () => void;
  value: boolean;
}

const Toggle = (props: ToggleProps) => {
  const { id, onOff, toggle, value } = props;

  return (
    <ToggleSpan>
      <ToggleCheckBox
        checked={value}
        id={id}
        onChange={toggle}
        type="checkbox"
      />
      <label htmlFor={id} style={onOff ? { backgroundColor: value ? '#4E7DD4' : 'grey' } : null} />
    </ToggleSpan>
  );
};

export default Toggle;
