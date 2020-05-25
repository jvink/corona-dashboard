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
const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
const SwitchDiv = styled.div`
  display: flex;
  align-items: center;
`;
const SwitchText = styled.span`
  margin-top: 1rem;
  margin-bottom: 1rem;
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
  const dataColor = value ? darkTheme.fontColor : lightTheme.fontColor;
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
          <HeaderDiv>
            <Label>{label}</Label>
            <SwitchDiv>
              <SwitchText>Cummulatief</SwitchText>
              <Toggle id={`cumulativeToggle${keyToggle}`} onOff toggle={toggle} value={isCumulative} />
            </SwitchDiv>
          </HeaderDiv>
          <div style={{ display: 'flex' }}>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={isCumulative ? cumulativeData : data} margin={{ bottom: 40, top: 10 }}>
                <Line type="monotone" dataKey="count" stroke="#4E7DD4" dot={{ fill: lightTheme.hintColor, stroke: darkTheme.fontColor, strokeWidth: 0.5 }} />
                <XAxis dataKey="date" angle={25} tickMargin={20} tick={{ fill: dataColor, stroke: dataColor, strokeWidth: 0.5 }} />
                <YAxis dataKey="count" tick={{ fill: dataColor, stroke: dataColor, strokeWidth: 0.5 }} />
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
