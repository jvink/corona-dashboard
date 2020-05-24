import { GetServerSideProps } from 'next';
import Head from 'next/head';
import styled from 'styled-components';

import Header from '../components/header';
import DataItem from '../components/data-item';
import Footer from '../components/footer';
import GraphItem from '../components/graph-item';

const Container = styled.div`
  background-color: ${props => props.theme.bg};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Main = styled.main`
  padding: 2rem;
  flex: 1;
`;
const DataList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const getServerSideProps: GetServerSideProps = async context => {
  const resultCases = await fetch('http://localhost:3000/api/cases');
  const cases = await resultCases.json();
  const resultDeceasedPersons = await fetch('http://localhost:3000/api/deceasedPersons');
  const deceasedPersons = await resultDeceasedPersons.json();
  const resultHospitalAdmissions = await fetch('http://localhost:3000/api/hospitalAdmissions');
  const hospitalAdmissions = await resultHospitalAdmissions.json();
  const resultPatientsIntensiveCare = await fetch('http://localhost:3000/api/patientsIntensiveCare');
  const patientsIntensiveCare = await resultPatientsIntensiveCare.json();

  return {
    props: {
      cases,
      deceasedPersons,
      hospitalAdmissions,
      patientsIntensiveCare,
    }
  };
}

export default function Dashboard(props) {
  const { cases, deceasedPersons, hospitalAdmissions, patientsIntensiveCare } = props;
  const axes = [
    { primary: true, type: 'utc', position: 'bottom' },
    { type: 'linear', position: 'left' }
  ];

  return (
    <Container>
      <Head>
        <title>COVID-19 Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Main>
        <DataList>
          <DataItem label="Positief geteste personen" newCount={cases[cases.length - 1].count} total={45.064} />
          <DataItem label="Ziekenhuisopnames" newCount={hospitalAdmissions[hospitalAdmissions.length - 1].count} total={11.659} />
          <DataItem label="Overleden personen" newCount={deceasedPersons[deceasedPersons.length - 1].count} total={5.811} />
        </DataList>


        <DataList>
          <GraphItem label="Positief geteste personen" data={cases} />
          <GraphItem label="Ziekenhuisopnames" data={hospitalAdmissions} />
          <GraphItem label="Overleden personen" data={deceasedPersons} />
        </DataList>
      </Main>

      <Footer />

      <style jsx global>{`
        html,
        body {
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
