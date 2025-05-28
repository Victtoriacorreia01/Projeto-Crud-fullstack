import React from 'react';
import '../styles/Home.css';

const Home = ({ registros = [], excluirPaciente, editarPaciente }) => {
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
                <tr key={registro.id || index}>
                  <td>{index + 1}</td>
                  <td>{registro.data || '-'}</td>
                  <td>{registro.id || `ABC-${index + 123}`}</td>
                  <td>{registro.nome}</td>
                  <td>{registro.idade}</td>
                  <td>{registro.genero}</td>
                  <td>
                    <button
                      onClick={() =>
                        editarPaciente(
                          registro.id,
                          registro.nome,
                          registro.idade,
                          registro.genero
                        )
                      }
                      style={{ marginRight: '8px' }}
                    >
                      Editar
                    </button>
                    <button onClick={() => excluirPaciente(registro.id)}>
                      Excluir
                    </button>
                  </td>
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
