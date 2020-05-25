import styled from 'styled-components';

import Card from '../card';

const Wrapper = styled.div`
  width: 100%;
`;
const Body = styled.div`
  padding: 0.75rem 1.5rem 3rem 1.5rem;
`;
const Label = styled.h3`
  color: ${props => props.theme.fontColor};
`;
const Bar = styled.div`
  position: relative;
  display: flex;
  height: 1.25rem;
  width: 100%;
  border-radius: 0.5rem;
`;
const MinBedCap = styled.div`
  margin-top: 1.25rem;
  position: absolute;
  color: ${props => props.theme.hintColor};
`;
const MaxBedCap = styled.div`
  color: ${props => props.theme.hintColor};
  right: 0;
  top: 1.25rem;
  position: absolute;
`;
const Green = styled.div`
  background-color: #009432;
  width: 60%;
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
`;
const Yellow = styled.div`
  background-color: #F79F1F;
  width: 15%;
`;
const Orange = styled.div`
  background-color: #EE5A24;
  width: 15%;
`;
const Red = styled.div`
  background-color: #EA2027;
  width: 10%;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
`;

interface MeterProps {
  max: number;
  value: number;
}

const Meter = (props: MeterProps) => {
  const { max, value } = props;
  const array = Array.from(Array(Math.round(max / 100)).keys());
  const getOffset = (value: number): string => `${Math.round(value / array.length)}%`;

  const Pointer = styled.div`
    position: absolute;
    left: ${getOffset(value)};
    top: -0.35rem;
    width: 3px;
    height: 2rem;
    background-color: ${props => props.theme.fontColor};
  `;
  const BedsUsed = styled.div`
    color: ${props => props.theme.hintColor};
    position: absolute;
    left: ${getOffset(value)};
    top: 1.25rem;
  `;

  return (
    <Wrapper>
      <Card>
        <Body>
          <Label>IC-capaciteit</Label>
          <Bar>
            <Green />
            <Yellow />
            <Orange />
            <Red />
            <Pointer />
            <MinBedCap>
              <p>0</p>
            </MinBedCap>
            <BedsUsed>
              <p>{value} bedden in gebruik</p>
            </BedsUsed>
            <MaxBedCap>
              <p>{max} bedden beschikbaar</p>
            </MaxBedCap>
          </Bar>
        </Body>
      </Card>
    </Wrapper>
  );
};

export default Meter;
