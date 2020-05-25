import styled from 'styled-components';
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts';

import Card from '../card';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;
const Body = styled.div`
  padding: 1.5rem;
`;
const Label = styled.h3`
  color: ${props => props.theme.fontColor};
`;

interface GraphItemProps {
  label: string;
  data: any;
}

const GraphItem = (props: GraphItemProps) => {
  const { label, data} = props;

  return (
    <Wrapper>
      <Card>
        <Body>
          <Label>{label}</Label>
          <div style={{ display: 'flex' }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                <Line type="monotone" dataKey="count" stroke="#4E7DD4" />
                <XAxis dataKey="date" angle={25} tickMargin={20} />
                <YAxis dataKey="count" />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Body>
      </Card>
    </Wrapper>
  );
};

export default GraphItem;