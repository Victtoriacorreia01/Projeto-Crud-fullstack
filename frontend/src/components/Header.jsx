import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo">HospitalCare</h1>

        <nav className="header-nav">
          <ul className="header-menu">
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/pacientes">Pacientes</Link></li>
            <li><Link to="/consultas">Consultas</Link></li>
            <li><Link to="/perfil">Perfil</Link></li>
            <li><Link to="/logout" className="logout-link">Sair</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
