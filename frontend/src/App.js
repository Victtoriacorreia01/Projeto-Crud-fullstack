import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Cadastro from './pages/Cadastro';
import Header from './components/Header';
import SideBar from './components/SideBar';

function App() {
  const [registros, setRegistros] = useState([]);

  const addRegistro = (novoRegistro) => {
    setRegistros(prev => [...prev, novoRegistro]);
  };

  return (
    <Router>
      <div>
        <Header />
        <SideBar />
        <Routes>
          <Route path="/" element={<HomePage registros={registros} />} />
          <Route path="/cadastro" element={<Cadastro onAddRegistro={addRegistro} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
