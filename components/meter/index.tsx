import styled from 'styled-components';

import Card from '../card';

const Wrapper = styled.div`
  width: 100%;
`;
const Body = styled.div`
  padding: 12px 24px 84px 24px;

  @media (min-width: 1100px) {
    padding-bottom: 64px;
  }

  @media (min-width: 1300px) {
    padding-bottom: 48px;
  }
`;
const Label = styled.h3`
  color: ${props => props.theme.fontColor};
`;

interface MeterProps {
  max: number;
  value: number;
}

const Meter = (props: MeterProps) => {
  const { max, value } = props;
  const array = Array.from(Array(Math.round(max / 100)).keys());
  const getOffset = (value: number): string => `${Math.round(value / array.length)}%`;

  return (
    <Wrapper>
      <Card>
        <Body>
          <Label>IC-capaciteit</Label>
          <div style={{ position: 'relative', display: 'flex', height: '20px', width: '100%', backgroundColor: 'blue', borderRadius: '8px' }}>
            <div style={{ marginTop: '20px', position: 'absolute' }}><p>0</p></div>
            <div style={{ backgroundColor: 'green', width: '50%', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }} />
            <div style={{ backgroundColor: '#000', marginLeft: getOffset(value), width: '3px', height: '40px', marginTop: '-10px', position: 'absolute' }} />
            <div style={{ marginLeft: getOffset(value), marginTop: '20px', position: 'absolute' }}><p>{value} bedden in gebruik</p></div>
            <div style={{ backgroundColor: 'orange', width: '30%' }} />
            <div style={{ backgroundColor: 'red', width: '20%', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }} />
            <div style={{ marginLeft: '80%', marginTop: '20px', position: 'absolute' }}><p>{max} bedden beschikbaar</p></div>
          </div>
        </Body>
      </Card>
    </Wrapper>
  );
};

export default Meter;
