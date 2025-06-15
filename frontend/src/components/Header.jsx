import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login'); 
  };

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
            <li>
            <button onClick={handleLogout} className="logout-link">
              Sair
            </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
