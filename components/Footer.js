import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer style={{ padding: 'var(--space-3)', textAlign: 'center' }}>
      <Link href="https://www.facebook.com/f1dash">
        <span style={{ color: 'blue', textDecoration: 'underline', marginRight: '20px' }}>Facebook</span>
      </Link>
        <Link href="https://twitter.com/OfficialF1Dash">
        <span style={{ color: 'blue', textDecoration: 'underline', marginRight: '20px' }}>Twitter</span>
      </Link>
      <Link href="https://github.com/F1Dash">
        <span style={{ color: 'blue', textDecoration: 'underline', marginRight: '20px' }}>Github</span>
      </Link>
      <Link href="/privacy-policy">
        <span style={{ color: 'blue', textDecoration: 'underline', marginRight: '20px' }}>Privacy Policy</span>
      </Link>
    </footer>
  );
};

export default Footer;
