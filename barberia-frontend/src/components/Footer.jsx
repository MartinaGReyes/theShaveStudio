// src/components/Footer.jsx

import React from 'react';

// Estilos en línea para el componente (opcional, pero útil para estilos específicos)
const footerStyle = {
  backgroundColor: '#6fa4da', // Un gris claro, similar al bg-light de Bootstrap
  padding: '2rem 1rem',
  borderTop: '1px solid #dee2e6' // Un borde superior sutil
};

function Footer() {
  return (
    <footer style={footerStyle} className="text-center text-lg-start mt-auto">
      <div className="container p-4">
        <div className="row">
          {/* Columna de la Barbería */}
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">The Shave Studio</h5>
            <p>
              Estilo y tradición en cada corte. Visítanos para una experiencia única
              y un servicio de primera calidad. Tu estilo es nuestra pasión.
            </p>
          </div>

          {/* Columna de Contacto */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contacto</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <p><i className="fas fa-phone me-2"></i>+54 11 2233 4455</p>
              </li>
              <li>
                <p><i className="fas fa-map-marker-alt me-2"></i>Pasteur 104, Salsipuedes, Cordoba, Argentina 5113</p>
              </li>
              <li>
                <p>
                  <a href="https://www.instagram.com/theshavestudio?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" className="text-dark">
                    <i className="fab fa-instagram me-2"></i>@theshavestudio
                  </a>
                </p>
              </li>
            </ul>
          </div>

          {/* Columna de Horarios */}
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Horarios</h5>
            <ul className="list-unstyled">
              <li>
                <p>Lunes a Viernes: 9:00 - 18:00</p>
              </li>
              <li>
                <p>Sábados: 9:00 - 14:00</p>
              </li>
              <li>
                <p>Domingos: Cerrado</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center p-3" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © {new Date().getFullYear()} Copyright:
        <a className="text-dark" href="#"> TheShaveStudio.com</a>
      </div>
    </footer>
  );
}

export default Footer;