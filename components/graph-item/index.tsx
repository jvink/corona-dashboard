import styled from 'styled-components';
import useDarkMode from 'use-dark-mode';
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts';

import { darkTheme, lightTheme } from '../../theme';

import Card from '../card';
import { useState } from 'react';
import Toggle from '../toggle';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 1.5rem;
`;
const Body = styled.div`
  padding: 1.5rem;
`;
const SwitchDiv = styled.div`
  display: flex;
  align-items: center;
`;
const SwitchText = styled.h4`
  color: ${props => props.theme.fontColor};
  margin-right: 1rem;
`;
const Label = styled.h3`
  color: ${props => props.theme.fontColor};
`;

interface GraphItemProps {
  data: any;
  keyToggle: string;
  label: string;
}

const GraphItem = (props: GraphItemProps) => {
  const { data, keyToggle, label } = props;
  const { value } = useDarkMode(false);
  const [isCumulative, setCumulative] = useState(false);
  const toggle = () => setCumulative(!isCumulative);
  const cumulativeSum = (sum => value => sum += value)(0);
  const cumulativeData = data.map(raw => {
    return {
      date: raw.date,
      count: cumulativeSum(raw.count),
    };
  });

  return (
    <Wrapper>
      <Card>
        <Body>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Label>{label}</Label>
            <SwitchDiv>
              <SwitchText>Cummulatief</SwitchText>
              <Toggle id={`cumulativeToggle${keyToggle}`} onOff toggle={toggle} value={isCumulative} />
            </SwitchDiv>
          </div>
          <div style={{ display: 'flex' }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={isCumulative ? cumulativeData : data} margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                <Line type="monotone" dataKey="count" stroke="#4E7DD4" dot={{ stroke: lightTheme.hintColor, strokeWidth: 3 }} />
                <XAxis dataKey="date" angle={25} tickMargin={20} tick={{ stroke: value ? darkTheme.fontColor : lightTheme.fontColor, strokeWidth: 1 }} />
                <YAxis dataKey="count" tick={{ stroke: value ? darkTheme.fontColor : lightTheme.fontColor, strokeWidth: 1 }} />
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
