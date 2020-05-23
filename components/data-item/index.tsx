import styled from 'styled-components';
import Card from '../card';

const Wrapper = styled.div`
  flex-basis: 33.33%;
  
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
  color: grey;
`;

interface DataCardProps {
  label: string;
  newCount: number;
  total: number;
}

const DataCard = (props: DataCardProps) => {
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

export default DataCard;
