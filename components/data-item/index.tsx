import styled from 'styled-components';
import Card from '../card';

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 24px;
  margin-right: 0px;

  @media (min-width: 1100px) {
    width: calc(33.33% - (1 - 1 / 3) * 24px);
  }
  
  @media (min-width: 1100px) {
    &:not(:last-child) {
      margin-botom: 0px;
      margin-right: 24px;
    }
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
