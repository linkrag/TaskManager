import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav>
      <div className="navbar">
        <div className="navbar-logo">Task Manager</div>
        <ul className="navbar-links">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/criar">Criar pedidos</Link></li>
          <li><Link to="/listar">Listar pedidos</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
