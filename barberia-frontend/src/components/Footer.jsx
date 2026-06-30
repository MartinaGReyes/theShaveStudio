// src/components/Footer.jsx

import React from 'react';

const footerStyle = {
  backgroundColor: '#050505',
  color: '#f5f5f5',
  padding: '1rem 1rem 1.5rem',
  borderTop: '1px solid #d4af37'
};

function Footer() {
  return (
    <footer style={footerStyle} className="mt-auto">
      <div className="container text-center">
        <span>© {new Date().getFullYear()} The Shave Studio. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}

export default Footer;