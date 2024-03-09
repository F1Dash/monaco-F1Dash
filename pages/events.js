import React, { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "./EventsPage.module.css";
import Header from "./header";
import Footer from "../components/Footer";


const EventsPage = () => {
  const [f1Events, setF1Events] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to get the lowercase country code from the country name
  const getCountryCode = (countryName) => {
    // Add more country mappings as needed
    switch (countryName.toLowerCase()) {
      case "japan":
        return "jp";
      case "australia":
        return "au";
      case "bahrain":
        return "bh";
      case "saudi arabia":
        return "sa";
      case "china":
        return "cn";
      case "united states":
        return "us";
      case "italy":
        return "it";
      case "monaco":
        return "mc";
      case "canada":
        return "ca";
      case "spain":
        return "es";
      case "austria":
        return "at";
      case "great britain":
        return "gb";
      case "hungary":
        return "hu";
      case "belgium":
        return "be";
      case "netherlands":
        return "nl";
      case "azerbaijan":
        return "az";
      case "singapore":
        return "sg";
      case "mexico":
        return "mx";
      case "brazil":
        return "br";
      case "qatar":
        return "qa";
      case "abu dhabi":
        return "ae";
      default:
        return "";
    }
  };
  
  useEffect(() => {
    const fetchF1Events = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/f1/schedule');
        console.log('Fetched F1 events:', response.data); // Log fetched data
        setF1Events(response.data);
      } catch (error) {
        console.error('Error fetching F1 events:', error);
        setError('Error fetching F1 events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    fetchF1Events();
  }, []);

  const currentDate = new Date();

  // Find current event
  const currentEvent = f1Events.find(event => new Date(event.EventDate) <= currentDate);

  // Find next event
  const upcomingEvents = f1Events.filter(event => new Date(event.EventDate) >= currentDate);
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  // Calculate countdown for next event
  const countdown = nextEvent ? Math.floor((new Date(nextEvent.EventDate) - currentDate) / (1000 * 60 * 60 * 24)) : null;

  // Filter out current and next event to display the rest
  const otherEvents = f1Events.filter(event => event !== currentEvent && event !== nextEvent);

  return (
    <>
      <Head>
      <title>Formula 1 Events Schedule | Upcoming Races | F1Dash.net</title>
      <meta name="description" content="Explore the schedule of upcoming Formula 1 events on F1Dash.net. Stay updated with event dates, countries, and session details." />
      <meta name="keywords" content="Formula 1, F1, Events, Schedule, Upcoming Events, Racing, Next F1 Race, Grand Prix Schedule" />
      <meta property="og:title" content="Upcoming Formula 1 Events Schedule - F1Dash.net" />
      <meta property="og:description" content="Explore the schedule of upcoming Formula 1 events on F1Dash.net. Stay updated with event dates, countries, and session details." />
      <meta property="og:url" content="https://www.F1Dash.net/events" />
      <meta property="og:image" content="/iconsocial.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Upcoming Formula 1 Events Schedule - F1Dash.net" />
      <meta name="twitter:description" content="Explore the schedule of upcoming Formula 1 events on F1Dash.net. Stay updated with event dates, countries, and session details." />
      <meta name="twitter:image" content="/iconsocial.png" />
      <meta name="twitter:site" content="@OfficialF1Dash" />
      <meta name="twitter:creator" content="@OfficialF1Dash" />
      <meta name="twitter:url" content="https://www.F1Dash.net/events" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>F1 Events</h1>
        {loading ? (
          <p>Loading events...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            {currentEvent && (
              <div className={styles.eventContainer}>
                <h2 className={styles.eventTitle}>Current Event: {currentEvent.EventName}</h2>
                <img src={`https://flagcdn.com/w20/${getCountryCode(currentEvent.Country)}.png`} alt={currentEvent.Country} className={styles.flag} />
                <p className={styles.eventInfo}>Country: {currentEvent.Country}</p>
                <p className={styles.eventInfo}>Event Date: {new Date(currentEvent.EventDate).toLocaleDateString()}</p>
                <p className={styles.eventInfo}>Sessions:</p>
                <p className={styles.sessionList}>
                  Session 1: {currentEvent.Session1} - {new Date(currentEvent.Session1Date).toLocaleString()}<br />
                  Session 2: {currentEvent.Session2} - {new Date(currentEvent.Session2Date).toLocaleString()}<br />
                  {currentEvent.Session3 && currentEvent.Session3 !== "Sprint" && <span>Session 3: {currentEvent.Session3} - {new Date(currentEvent.Session3Date).toLocaleString()}<br /></span>}
                  Session 4: {currentEvent.Session4} - {new Date(currentEvent.Session4Date).toLocaleString()}<br />
                  Session 5: {currentEvent.Session5} - {new Date(currentEvent.Session5Date).toLocaleString()}<br />
                </p>
              </div>
            )}
            {nextEvent && (
              <div className={styles.eventContainer}>
                <h2 className={styles.eventTitle}>Next Event: {nextEvent.EventName}</h2>
                <img src={`https://flagcdn.com/w20/${getCountryCode(nextEvent.Country)}.png`} alt={nextEvent.Country} className={styles.flag} />
                <p className={styles.eventInfo}>Country: {nextEvent.Country}</p>
                <p className={styles.eventInfo}>Event Date: {new Date(nextEvent.EventDate).toLocaleDateString()}</p>
                <p className={styles.eventInfo}>Countdown: {countdown} days</p>
                <p className={styles.eventInfo}>Sessions:</p>
                <p className={styles.sessionList}>
                  Session 1: {nextEvent.Session1} - {new Date(nextEvent.Session1Date).toLocaleString()}<br />
                  Session 2: {nextEvent.Session2} - {new Date(nextEvent.Session2Date).toLocaleString()}<br />
                  {nextEvent.Session3 && nextEvent.Session3 !== "Sprint" && <span>Session 3: {nextEvent.Session3} - {new Date(nextEvent.Session3Date).toLocaleString()}<br /></span>}
                  Session 4: {nextEvent.Session4} - {new Date(nextEvent.Session4Date).toLocaleString()}<br />
                  Session 5: {nextEvent.Session5} - {new Date(nextEvent.Session5Date).toLocaleString()}<br />
                </p>
              </div>
            )}
            {otherEvents.length > 0 && (
              <div className={styles.otherEventsContainer}>
                <h2 className={styles.otherEventsTitle}>Other Upcoming Events</h2>
                <div className={styles.otherEvents}>
                  {otherEvents.map(event => (
                    <div key={event.EventName} className={styles.otherEvent}>
                      <h3>{event.EventName}</h3>
                      <img src={`https://flagcdn.com/w20/${getCountryCode(event.Country)}.png`} alt={event.Country} className={styles.flag} />
                      <p>Country: {event.Country}</p>
                      <p>Event Date: {new Date(event.EventDate).toLocaleDateString()}</p>
                      <p>Sessions:</p>
                      <p className={styles.sessionList}>
                        {event.Session4 && <span>Qualifying: {event.Session4} - {new Date(event.Session4Date).toLocaleString()}<br /></span>}
                        {event.Session5 && <span>Race: {event.Session5} - {new Date(event.Session5Date).toLocaleString()}<br /></span>}
                        {event.Session2 === "Sprint Shootout" && <span>Sprint Shootout: {event.Session2} - {new Date(event.Session2Date).toLocaleString()}<br /></span>}
                        {event.Session3 === "Sprint" && <span>Sprint: {event.Session3} - {new Date(event.Session3Date).toLocaleString()}<br /></span>}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
        <Footer />
      </div>
    </>
  );
};

export default EventsPage;
