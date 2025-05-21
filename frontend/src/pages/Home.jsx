import React from 'react';
import '../styles/Home.css';

const Home = ({ registros = [] }) => {
  return (
    <div className="content">
      <h1>Visão Geral</h1>
      <div className="cards">
        <div className="card blue">
          <h3>Total de Médicos</h3>
          <p>95</p>
        </div>
        <div className="card green">
          <h3>Total de Pacientes</h3>
          <p>150</p>
        </div>
      </div>

      <h2>Últimos Pacientes Cadastrados</h2>
      <div className="table-container">
        {registros.length === 0 ? (
          <p>Nenhum registro cadastrado.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>N°</th>
                <th>Data</th>
                <th>ID</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Gênero</th>
                <th>Opções</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{registro.data}</td>
                  <td>ABC-{index + 123}</td> {/* Ajuste conforme necessário */}
                  <td>{registro.nome}</td>
                  <td>{registro.idade}</td>
                  <td>{registro.genero}</td>
                  <td>Editar | Excluir</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Home;
