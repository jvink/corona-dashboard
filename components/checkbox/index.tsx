import styled from 'styled-components';

const OptionDiv = styled.div`
  position: relative;
  margin-left: 2rem;
  margin-bottom: 0;
  border: 2px solid ${props => props.color};
  border-radius: 24px;
  color: ${props => props.color};
  font-weight: bold;

  @media (max-width: 1100px) {
    margin-left: 0;
    margin-bottom: 1rem;
  }
`;
const OptionCheckbox = styled.input`
  margin: .5rem 1rem;
  user-select: none;
  cursor: pointer;
`;
const OptionLabel = styled.label`
  padding: 1rem 1rem 1rem 0;
  user-select: none;
  cursor: pointer;
`;

interface Props {
  checked: boolean;
  color: string;
  id: string;
  label: string;
  onChange: () => void;
}

const CheckBox = (props: Props) => {
  const { checked, color, id, label, onChange } = props;

  return (
    <OptionDiv color={color}>
      <OptionCheckbox
        type="checkbox"
        id={id}
        name={label}
        checked={checked}
        onChange={onChange}
      />
      <OptionLabel htmlFor={id}>{label}</OptionLabel>
    </OptionDiv>
  );
};

export default CheckBox;
