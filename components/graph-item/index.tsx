import { useState, useContext } from 'react';
import styled from 'styled-components';
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts';

import { DarkModeContext } from '../../pages/_app';
import { darkTheme, lightTheme } from '../../theme';

import Card from '../card';
import Toggle from '../toggle';

const Wrapper = styled.div`
  width: 100%;
`;
const Body = styled.div`
  padding: 1.5rem;
`;
const HeaderDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 1100px) {
    flex-direction: column;
  }
`;
const OptionsDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1100px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
const OptionDiv = styled.div`
  margin-left: 2rem;
  margin-bottom: 0;

  @media (max-width: 1100px) {
    margin-left: 0;
    margin-bottom: 1rem;
  }
`;
const OptionCheckbox = styled.input`
  margin-right: .5rem;
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
  xKey: string;
  yKey: string;
}

const GraphItem = (props: GraphItemProps) => {
  const { data, keyToggle, label, xKey, yKey } = props;
  const dataKeys = [
    { color: '#4E7DD4', key: 'totaalAantal', label: 'Totaal aantal' },
    { color: '#009432', key: 'ziekenhuisopnameAantal', label: 'Ziekenhuisopname aantal' },
    { color: '#EE5A24', key: 'overledenAantal', label: 'Overleden aantal' },
  ];
  const [selectedDataKeys, setSelectedDataKeys] = useState(dataKeys);
  const { isDarkMode } = useContext(DarkModeContext);
  const [isCumulative, setCumulative] = useState(false);
  const toggle = () => setCumulative(!isCumulative);
  const dataColor = isDarkMode ? darkTheme.fontColor : lightTheme.fontColor;

  function handleClickKey(dataKey) {
    if (selectedDataKeys.find((s) => s.key === dataKey.key) ? true : false) {
      setSelectedDataKeys(currentSelectedDataKeys => currentSelectedDataKeys.filter((o) => o.key !== dataKey.key));
    } else {
      setSelectedDataKeys(currentSelectedDataKeys => [...currentSelectedDataKeys, dataKey]);
    }
  }

  return (
    <Wrapper>
      <Card>
        <Body>
          <HeaderDiv>
            <Label>{label}</Label>
            <OptionsDiv>
              {dataKeys.map((dataKey) => (
                <OptionDiv>
                  <OptionCheckbox
                    type="checkbox" 
                    id={dataKey.key}
                    name={dataKey.label}
                    checked={selectedDataKeys.find((s) => s.key === dataKey.key) ? true : false}
                    onChange={() => handleClickKey(dataKey)}
                  />
                  <label htmlFor={dataKey.key} style={{ color: dataKey.color }}>{dataKey.label}</label>
                </OptionDiv>
              ))}
            </OptionsDiv>
            <SwitchDiv>
              <SwitchText>Cumulatief</SwitchText>
              <Toggle id={`cumulativeToggle${keyToggle}`} onOff toggle={toggle} value={isCumulative} />
            </SwitchDiv>
          </HeaderDiv>
          <div style={{ display: 'flex' }}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data} margin={{ bottom: 40, top: 10 }}>
                {selectedDataKeys.map((selectedDataKey) => (
                  <Line type="basis" dataKey={`${selectedDataKey.key}${isCumulative ? 'Cumulatief' : ''}`} stroke={selectedDataKey.color} dot={false} key={selectedDataKey.key} />
                ))}
                <XAxis dataKey={xKey} angle={25} tickMargin={20} tick={{ fill: dataColor, stroke: dataColor, strokeWidth: 0.5 }} />
                <YAxis dataKey={`${yKey}${isCumulative ? 'Cumulatief' : ''}`} tick={{ fill: dataColor, stroke: dataColor, strokeWidth: 0.5 }} />
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
