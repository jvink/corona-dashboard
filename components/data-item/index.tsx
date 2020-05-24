import styled from 'styled-components';
import Card from '../card';

const Wrapper = styled.div`
  flex-basis: calc(33.33% - 24px);
  
  &:not(:last-child) {
    margin-right: 24px;
  }
`;
const Body = styled.div`
  padding: 24px;
`;
const Label = styled.h3`
  color: ${props => props.theme.fontColor};
`;
const NewCount = styled.h1`
  color: ${props => props.theme.primaryColor};
`;
const Total = styled.label`
  color: ${props => props.theme.hintColor};
`;

interface DataItemProps {
  label: string;
  newCount: number;
  total: number;
}

const DataItem = (props: DataItemProps) => {
  const { label, newCount, total} = props;

  return (
    <Wrapper>
      <Card>
        <Body>
          <Label>{label}</Label>
          <NewCount>+ {newCount}</NewCount>
          <Total>Totaal: {total}</Total>
        </Body>
      </Card>
    </Wrapper>
  );
};

export default DataItem;
