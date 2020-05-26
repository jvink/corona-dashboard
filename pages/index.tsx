import { GetStaticProps } from 'next';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import styled from 'styled-components';

import Header from '../components/header';
import DataItem from '../components/data-item';
import Footer from '../components/footer';
import Meter from '../components/meter';

const GraphItem = dynamic(() => import('../components/graph-item'));

const Container = styled.div`
  background-color: ${props => props.theme.bg};
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Main = styled.main`
  padding: 1rem;
  flex: 1;

  @media (min-width: 600px) {
    padding: 2rem;
    padding-top: 1rem;
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

export const getStaticProps: GetStaticProps = async _ => {
  const data = await import('../data.json');

  return {
    props: {
      ...data,
    }
  };
}

export default function Dashboard(props) {
  const { cases, deceasedPersons, hospitalAdmissions, totalCases, totalHospitalAdmissions, totalDeceasedPersons, totalPatientsIntensiveCare } = props;

  return (
    <Container>
      <Head>
        <title>COVID-19 Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Main>
        <DataList>
          <DataItem label="Positief geteste personen" newCount={cases[cases.length - 1].count} total={totalCases} />
          <DataItem label="Ziekenhuisopnames" newCount={hospitalAdmissions[hospitalAdmissions.length - 1].count} total={totalHospitalAdmissions} />
          <DataItem label="Overleden personen" newCount={deceasedPersons[deceasedPersons.length - 1].count} total={totalDeceasedPersons} />
        </DataList>


        <DataList>
          <Meter value={totalPatientsIntensiveCare} max={1150} />
          <GraphItem data={cases} keyToggle="Tested" label="Positief geteste personen" />
          <GraphItem data={hospitalAdmissions}  keyToggle="Admissions" label="Ziekenhuisopnames"/>
          <GraphItem data={deceasedPersons} keyToggle="Deceased" label="Overleden personen" />
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
