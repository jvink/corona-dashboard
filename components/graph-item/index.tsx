import styled, { ThemeContext } from 'styled-components';
import { CartesianGrid, ResponsiveContainer, XAxis, YAxis, Line, LineChart, Tooltip } from 'recharts';

import { DarkModeContext } from '../../pages/_app';
import { darkTheme, lightTheme, ThemeProps } from '../../theme';

import Card from '../card';
import Toggle from '../toggle';
import { useContext, useState } from 'react';

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
  const { totaalAantal, ziekenhuisopnameAantal, overledenAantal }: ThemeProps = useContext(ThemeContext);
  const { isDarkMode } = useContext(DarkModeContext);
  const [isCumulative, setCumulative] = useState(false);
  const toggle = () => setCumulative(!isCumulative);
  const dataColor = isDarkMode ? darkTheme.fontColor : lightTheme.fontColor;
  const [enableTotal, setEnableTotal] = useState<boolean>(true);
  const [enableHospitalAdmissions, setEnableHospitalAdmissions] = useState<boolean>(true);
  const [enableDeceased, setEnableDeceased] = useState<boolean>(true);

  return (
    <Wrapper>
      <Card>
        <Body>
          <HeaderDiv>
            <Label>{label}</Label>
            <OptionsDiv>
              <OptionDiv>
                <OptionCheckbox
                  type="checkbox"
                  id="total"
                  name="Totaal aantal"
                  checked={enableTotal}
                  onChange={() => setEnableTotal(!enableTotal)}
                />
                <label htmlFor="total" style={{ color: totaalAantal }}>Totaal aantal</label>
              </OptionDiv>
              <OptionDiv>
                <OptionCheckbox
                  type="checkbox"
                  id="hospitalAdmissions"
                  name="Ziekenhuisopname aantal"
                  checked={enableHospitalAdmissions}
                  onChange={() => setEnableHospitalAdmissions(!enableHospitalAdmissions)}
                />
                <label htmlFor="hospitalAdmissions" style={{ color: ziekenhuisopnameAantal }}>Ziekenhuisopname aantal</label>
              </OptionDiv>
              <OptionDiv>
                <OptionCheckbox
                  type="checkbox"
                  id="deceased"
                  name="Overleden aantal"
                  checked={enableDeceased}
                  onChange={() => setEnableDeceased(!enableDeceased)}
                />
                <label htmlFor="deceased" style={{ color: overledenAantal }}>Overleden aantal</label>
              </OptionDiv>
            </OptionsDiv>
            <SwitchDiv>
              <SwitchText>Cumulatief</SwitchText>
              <Toggle id={`cumulativeToggle${keyToggle}`} onOff toggle={toggle} value={isCumulative} />
            </SwitchDiv>
          </HeaderDiv>
          <div style={{ display: 'flex' }}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={data} margin={{ bottom: 40, top: 10 }}>
                {enableTotal && isCumulative && <Line type="basis" dataKey="totaalAantalCumulatief" stroke={totaalAantal} dot={false} />}
                {enableHospitalAdmissions && isCumulative && <Line type="basis" dataKey="ziekenhuisopnameAantalCumulatief" stroke={ziekenhuisopnameAantal} dot={false} />}
                {enableDeceased && isCumulative && <Line type="basis" dataKey="overledenAantalCumulatief" stroke={overledenAantal} dot={false} />}
                {enableTotal && !isCumulative && <Line type="basis" dataKey="totaalAantal" stroke={totaalAantal} dot={false} />}
                {enableHospitalAdmissions && !isCumulative && <Line type="basis" dataKey="ziekenhuisopnameAantal" stroke={ziekenhuisopnameAantal} dot={false} />}
                {enableDeceased && !isCumulative && <Line type="basis" dataKey="overledenAantal" stroke={overledenAantal} dot={false} />}
                <XAxis dataKey={xKey} angle={25} tickMargin={20} tick={{ fill: dataColor, stroke: dataColor, strokeWidth: 0.5 }} />
                <YAxis tick={{ fill: dataColor, stroke: dataColor, strokeWidth: 0.5 }} />
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
