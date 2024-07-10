import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer>
      <div className="Footer">
        <div className="footer-logo">Task Manager</div>
        <ul className="footer-links">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/criar">Criar pedidos</Link></li>
          <li><Link to="/listar">Listar pedidos</Link></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;