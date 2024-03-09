import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "./ResultsPage.module.css";
import Header from "./header";
import Footer from "../components/Footer";

const ResultsPage = () => {
  const [raceResults, setRaceResults] = useState([]);
  const [qualiResults, setQualiResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [raceName, setRaceName] = useState("");

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const raceResponse = await axios.get('https://ergast.com/api/f1/current/last/results.json');
        const qualiResponse = await axios.get('https://ergast.com/api/f1/current/last/qualifying.json');

        const raceData = raceResponse.data.MRData.RaceTable.Races[0];
        const qualiData = qualiResponse.data.MRData.RaceTable.Races[0];

        setRaceResults(raceData.Results);
        setQualiResults(qualiData.QualifyingResults);
        setRaceName(raceData.raceName);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <>
      <Head>
      <title>Latest Formula 1 Race Results | F1Dash.net</title>
        <meta name="description" content="Explore the most recent Formula 1 race results and analysis on F1Dash.net. Stay informed with comprehensive coverage of motorsport events." />
        <meta name="keywords" content="Formula 1, F1, race results, motorsport, Formula 1 analysis, Grand Prix results" />
        <meta property="og:title" content="Latest Formula 1 Race Results - F1Dash.net" />
        <meta property="og:description" content="Explore the most recent Formula 1 race results and analysis on F1Dash.net. Stay informed with comprehensive coverage of motorsport events." />
        <meta property="og:url" content="https://www.F1Dash.net/results" />
        <meta property="og:image" content="/iconsocial.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Latest Formula 1 Race Results - F1Dash.net" />
        <meta name="twitter:description" content="Explore the most recent Formula 1 race results and analysis on F1Dash.net. Stay informed with comprehensive coverage of motorsport events." />
        <meta name="twitter:image" content="/iconsocial.png" />
        <meta name="twitter:site" content="@OfficialF1Dash" />
        <meta name="twitter:creator" content="@OfficialF1Dash" />
      </Head>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>Results</h1>
        {loading ? (
          <p>Loading Results...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div className={styles.section}>
              <h2 className={styles.subtitle}>Race Results - {raceName}</h2>
              <table className={styles.resultsTable}>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Driver</th>
                    <th>Constructor</th>
                    <th>Points</th>
                    <th>Grid</th>
                    <th>Laps</th>
                    <th>Number</th>
                    <th>Status</th>
                    <th>Session</th>
                  </tr>
                </thead>
                <tbody>
                  {raceResults.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                      <td>{entry.position}</td>
                      <td>{entry.Driver.givenName} {entry.Driver.familyName}</td>
                      <td>{entry.Constructor.name}</td>
                      <td>{entry.points}</td>
                      <td>{entry.grid}</td>
                      <td>{entry.laps}</td>
                      <td>{entry.number}</td>
                      <td>{entry.status}</td>
                      <td>Race</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <hr className={styles.divider} />

            <div className={styles.section}>
              <h2 className={styles.subtitle}>Qualifying Results</h2>
              <table className={styles.resultsTable}>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Driver</th>
                    <th>Constructor</th>
                    <th>Q1</th>
                    <th>Q2</th>
                    <th>Q3</th>
                    <th>Session</th>
                  </tr>
                </thead>
                <tbody>
                  {qualiResults.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? styles.evenRow : styles.oddRow}>
                      <td>{entry.position}</td>
                      <td>{entry.Driver.givenName} {entry.Driver.familyName}</td>
                      <td>{entry.Constructor.name}</td>
                      <td>{entry.Q1}</td>
                      <td>{entry.Q2}</td>
                      <td>{entry.Q3}</td>
                      <td>Qualifying</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <footer className={styles.footer}>
          <p>This data does not update live. It only shows the race and qualifying results from the last race.</p>
        </footer>
        <Footer />
      </div>
    </>
  );
};

export default ResultsPage;
