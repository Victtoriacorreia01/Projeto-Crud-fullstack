import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Cadastro from './pages/Cadastro';
import Header from './components/Header';
import SideBar from './components/SideBar';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';

function LayoutAutenticado({ children }) {
  const location = useLocation();
  const mostrarLayout = location.pathname !== '/login'; // esconde header/sidebar na tela de login

  return (
    <div>
      {mostrarLayout && <Header />}
      {mostrarLayout && <SideBar />}
      {children}
    </div>
  );
}

function App() {
  const [registros, setRegistros] = useState([]);

  const addRegistro = (novoRegistro) => {
    setRegistros(prev => [...prev, novoRegistro]);
  };

  return (
    <Router>
      <LayoutAutenticado>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <HomePage registros={registros} />
              </PrivateRoute>
            }
          />
          <Route
            path="/cadastro"
            element={
              <PrivateRoute>
                <Cadastro onAddRegistro={addRegistro} />
              </PrivateRoute>
            }
          />
        </Routes>
      </LayoutAutenticado>
    </Router>
  );
}

export default App;
