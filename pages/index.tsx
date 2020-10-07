import { useState } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Header from '../components/header';
import DataItem from '../components/data-item';
import Footer from '../components/footer';

const GraphItem = dynamic(() => import('../components/graph-item'));

const Container = styled.div`
  background-color: ${props => props.theme.bg};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: background-color 0.3s ease-in-out;
`;
const Main = styled.main`
  padding: 1rem;
  flex: 1;

  @media (min-width: 600px) {
    padding: 1rem 2rem 0 2rem;
  }
`;
const DataList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export async function getStaticProps() {
  const resultNational = await fetch('https://raw.githubusercontent.com/J535D165/CoronaWatchNL/master/data-json/data-national/RIVM_NL_national.json');
  const resultProvincial = await fetch('https://raw.githubusercontent.com/J535D165/CoronaWatchNL/master/data-json/data-provincial/RIVM_NL_provincial.json');
  const resultProvincialLatest = await fetch('https://raw.githubusercontent.com/J535D165/CoronaWatchNL/master/data-json/data-provincial/RIVM_NL_provincial_latest.json');
  const national = await resultNational.json();
  const provincial = await resultProvincial.json();
  const provincialLatest = await resultProvincialLatest.json();

  return {
    revalidate: 60 * 60,
    props: {
      national,
      provincial,
      provincialLatest,
    },
  };
}

export default function Dashboard(props) {
  const [selectedProvince, setSelectedProvince] = useState('Landelijk');
  const { national, provincial, provincialLatest } = props;
  const selectedProviceObject = provincialLatest.data.find(province => province.Provincienaam === selectedProvince);
  const latestData = selectedProvince !== 'Landelijk' ? selectedProviceObject : national.data[national.data.length - 1];
  const graphData = selectedProvince !== 'Landelijk' ? provincial.data.filter((province) => province.Provincienaam === selectedProvince) : national.data;
  
  return (
    <Container>
      <Head>
        <title>COVID-19 Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header lastUpdated={latestData.Datum} selectedProvince={selectedProvince} setSelectedProvince={setSelectedProvince} />

      <Main>
        <DataList>
          <DataItem label="Positief geteste personen" newCount={latestData.totaalAantal} total={latestData.totaalAantalCumulatief} />
          <DataItem label="Ziekenhuisopnames" newCount={latestData.ziekenhuisopnameAantal} total={latestData.ziekenhuisopnameAantalCumulatief} />
          <DataItem label="Overleden personen" newCount={latestData.overledenAantal} total={latestData.overledenAantalCumulatief} />
        </DataList>


        <DataList>
          <GraphItem data={graphData} keyToggle="Tested" label="Data in grafiek" xKey="Datum" yKey="totaalAantal" />
        </DataList>
      </Main>

      <Footer />

      <style jsx global>{`
        html,
        body {
          overflow-x: hidden;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Container>
  )
}
