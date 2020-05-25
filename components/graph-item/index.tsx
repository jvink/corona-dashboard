import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts';

import { darkTheme, lightTheme } from '../../theme';

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
  const { value } = useDarkMode(false);

  return (
    <Wrapper>
      <Card>
        <Body>
          <Label>{label}</Label>
          <div style={{ display: 'flex' }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                <Line type="monotone" dataKey="count" stroke="#4E7DD4" dot={{ stroke: lightTheme.hintColor, strokeWidth: 3 }} />
                <XAxis dataKey="date" angle={25} tickMargin={20} tick={{ stroke: value ? darkTheme.hintColor : lightTheme.hintColor, strokeWidth: 1 }} />
                <YAxis dataKey="count" tick={{ stroke: value ? darkTheme.hintColor : lightTheme.hintColor, strokeWidth: 1 }} />
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
