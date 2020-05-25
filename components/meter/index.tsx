import styled from 'styled-components';

import Card from '../card';

const Wrapper = styled.div`
  width: 100%;
`;
const Body = styled.div`
  padding: 12px 24px 48px 24px;
`;
const Label = styled.h3`
  color: ${props => props.theme.fontColor};
`;
const Bar = styled.div`
  position: relative;
  display: flex;
  height: 20px;
  width: 100%;
  border-radius: 8px;
`;
const MinBedCap = styled.div`
  margin-top: 20px;
  position: absolute;
  color: ${props => props.theme.hintColor};
`;
const MaxBedCap = styled.div`
  color: ${props => props.theme.hintColor};
  right: 0;
  top: 20px;
  position: absolute;
`;
const Green = styled.div`
  background-color: green;
  width: 50%;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;
const Orange = styled.div`
  background-color: orange;
  width: 30%;
`;
const Red = styled.div`
  background-color: red;
  width: 20%;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
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
    top: -5px;
    width: 3px;
    height: 30px;
    background-color: ${props => props.theme.fontColor};
  `;
  const BedsUsed = styled.div`
    color: ${props => props.theme.hintColor};
    position: absolute;
    left: ${getOffset(value)};
    top: 20px;
  `;

  return (
    <Wrapper>
      <Card>
        <Body>
          <Label>IC-capaciteit</Label>
          <Bar>
            <Green />
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
