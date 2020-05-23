import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Chart } from 'react-charts';
import styled from 'styled-components';
import Header from '../components/header';
import DataCard from '../components/data-item';
import Footer from '../components/footer';

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
          <DataCard label="Positief geteste personen" newCount={cases[0].data[cases[0].data.length - 1][1]} total={45.064} />
          <DataCard label="Ziekenhuisopnames" newCount={hospitalAdmissions[0].data[hospitalAdmissions[0].data.length - 1][1]} total={11.659} />
          <DataCard label="Overleden personen" newCount={deceasedPersons[0].data[deceasedPersons[0].data.length - 1][1]} total={5.811} />
        </DataList>
        {/* <div className="grid">
          <div className="card">
            <h3>Positief geteste personen</h3>
            <div
              style={{
                height: '300px',
              }}>
              <Chart
                data={cases}
                axes={axes}
              />
            </div>
          </div>

          <div className="card">
            <h3>Ziekenhuisopnames</h3>
            <div
              style={{
                height: '300px',
              }}>
              <Chart
                data={hospitalAdmissions}
                axes={axes}
              />
            </div>
          </div>
          <div className="card">
            <h3>Overleden personen</h3>
            <div
              style={{
                height: '300px',
              }}>
              <Chart
                data={deceasedPersons}
                axes={axes}
              />
            </div>
          </div>
        </div> */}
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
