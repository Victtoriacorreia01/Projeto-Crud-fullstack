import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SideBar.css';
import logo from "../assets/Blue__white_and_green_Medical_care_logo__1_-removebg-preview.png"
function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <ul className="sidebar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/cadastro">Novo Cadastro</Link>
        </li>
      </ul>
      <div className="sidebar-footer">Versão 1.0</div>
    </aside>
  );
}

export default Sidebar;
