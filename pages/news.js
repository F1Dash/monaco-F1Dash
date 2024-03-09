import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
import Header from './header';
import styles from './NewsPage.module.css';
import Footer from "../components/Footer";
import Head from 'next/head';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/f1/news');
        const jsonData = await response.json();


        const processedData = jsonData.map(item => {
          if (item.description) {
            item.description = item.description.replace(/...<a class='more'.*?\/a>/g, '');
          }
          return item;
        });

        setNews(processedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Failed to fetch news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <Head>
      <title>Latest Formula 1 News & Updates | F1Dash.net</title>
      <meta name="description" content="Stay informed with the latest Formula 1 news and updates from F1Dash.net, your ultimate source for everything F1." />
      <meta name="keywords" content="Formula 1, F1, news, updates, motorsport, F1Dash.net" />
      <meta property="og:title" content="Latest Formula 1 News & Updates - F1Dash.net" />
      <meta property="og:description" content="Stay informed with the latest Formula 1 news and updates from F1Dash.net, your ultimate source for everything F1." />
      <meta property="og:url" content="https://www.F1Dash.net/news" />
      <meta property="og:image" content="/iconsocial.png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Latest Formula 1 News & Updates - F1Dash.net" />
      <meta name="twitter:description" content="Stay informed with the latest Formula 1 news and updates from F1Dash.net, your ultimate source for everything F1." />
      <meta name="twitter:image" content="/iconsocial.png" />
      <meta name="twitter:site" content="@OfficialF1Dash" />
      <meta name="twitter:creator" content="@OfficialF1Dash" />
      <meta name="twitter:url" content="https://www.F1Dash.net/news" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <div className={styles.newsFeed}>
        <h1 className={styles.newsTitle}>Formula 1 Latest News</h1>
        <ul className={styles.newsList}>
          {news.map((item, index) => (
            <li key={index} className={styles.newsItem}>
              {item.image_url && <img src={item.image_url} alt="News" className={styles.newsImage} />}
              <div className={styles.newsContent}>
                <a href={item.link} className={styles.newsTitle}>{item.title}</a>
                <p className={styles.newsDescription}>{item.description}</p>
                <p className={styles.newsPubDate}>{item.pubDate}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
}
