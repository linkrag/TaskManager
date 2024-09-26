import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav>
      <div className="navbar">
        <div className="navbar-logo">Task Manager</div>
        <ul className="navbar-links">
          <li><Link to="/">Início</Link></li>
          <li><Link to="/criar">Criar pedidos</Link></li>
          <li><Link to="/listar">Listar pedidos</Link></li>
          <li><Link to="/perfil">Perfil</Link></li>
          <li onClick={handleLogout} className="logout">Sair</li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
