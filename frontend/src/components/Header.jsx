import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-title">Cadastro de Pacientes</h1>
        <nav className="header-nav">
          <ul className="header-menu">
            
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
