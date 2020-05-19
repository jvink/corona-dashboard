import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Chart } from 'react-charts';
import { useMemo } from 'react';

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
  const casesData = useMemo(() => cases, []);
  const axes = useMemo(
    () => [
    { primary: true, type: 'utc', position: 'bottom' },
    { type: 'linear', position: 'left' }
  ], []);

  return (
    <div className="container">
      <Head>
        <title>COVID-19 Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h3>
          COVID-19 Dashboard
        </h3>

        <h5>
          Gebruikt de laatste data van het <a href="https://www.rivm.nl/coronavirus-covid-19/actueel">RIVM</a>
        </h5>

        <div className="grid">
          <div className="card">
            <h3>Positief geteste personen</h3>
            <div className="data-block">
              <p>{cases[0].data[cases[0].data.length - 1][1]}</p>
              <span className="data-block__label">(+{cases[0].data[cases[0].data.length - 1][2]})</span>
            </div>
            <div
              style={{
                height: '300px',
              }}>
              <Chart
                data={casesData}
                axes={axes}
              />
            </div>
          </div>

          <div className="card">
            <h3>Ziekenhuisopnames</h3>
            <div className="data-block">
              <p>{deceasedPersons.count}</p>
              <span className="data-block__label">(+{deceasedPersons.new})</span>
            </div>
          </div>

          <div className="card">
            <h3>Overleden personen</h3>
            <div className="data-block">
              <p>{hospitalAdmissions.count}</p>
              <span className="data-block__label">(+{hospitalAdmissions.new})</span>
            </div>
          </div>

          <div className="card">
            <h3>Overleden personen</h3>
            <div className="data-block">
              <p>{patientsIntensiveCare.count}</p>
              <span className="data-block__label">(+{patientsIntensiveCare.new})</span>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <a
          href="https://www.linkedin.com/in/jurian-vink-282465141/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by Jurian Vink
        </a>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        main {
          padding: 1rem;
          flex: 1;
        }

        footer {
          width: 100%;
          height: 50px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .data-block {
          display: flex;
          flex-direction: row;
          align-items: center;
        }

        .data-block__label {
          margin-left: 8px;
          font-size: 14px;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 3rem;
        }

        .card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-basis: 50%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

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
    </div>
  )
}
