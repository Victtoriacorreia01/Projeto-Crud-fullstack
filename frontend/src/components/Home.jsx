import React, { useState } from 'react';
import '../styles/Home.css';

const formatarData = (dataString) => {
  if (!dataString) return '-';
  const data = new Date(dataString);
  const dia = String(data.getDate()).padStart(2, '0');
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const ano = data.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const Home = ({ registros = [], excluirPaciente, editarPaciente }) => {
  const [modalAberto, setModalAberto] = useState(false);
  const [pacienteEditando, setPacienteEditando] = useState(null);

  const abrirModalEditar = (paciente) => {
    setPacienteEditando(paciente);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setPacienteEditando(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPacienteEditando(prev => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSalvar = () => {
    if (editarPaciente && pacienteEditando) {
      editarPaciente(pacienteEditando);
      fecharModal();
    }
  };

  return (
    <div className="content">
      <h1>Visão Geral</h1>

      <div className="cards">
        <div className="card green">
          <h3>Total de Pacientes</h3>
          <p className="count">{registros.length}</p>
        </div>
      </div>

      <h2>Últimos Pacientes Cadastrados</h2>

      <div className="table-container">
        {registros.length === 0 ? (
          <p className="empty-message">Nenhum registro cadastrado.</p>
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
                  <td>{formatarData(registro.data)}</td>
                  <td>{registro.id || `ABC-${index + 123}`}</td>
                  <td>{registro.nome}</td>
                  <td>{registro.idade}</td>
                  <td>{registro.genero}</td>
                  <td>
                    <button
                      className="btn edit"
                      onClick={() => abrirModalEditar(registro)}
                      title="Editar Paciente"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn delete"
                      onClick={() => excluirPaciente(registro.id)}
                      title="Excluir Paciente"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modalAberto && pacienteEditando && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h2>Editar Paciente</h2>
            <label>
              Nome:
              <input
                type="text"
                name="nome"
                value={pacienteEditando.nome}
                onChange={handleChange}
              />
            </label>
            <label>
              Idade:
              <input
                type="number"
                name="idade"
                value={pacienteEditando.idade}
                onChange={handleChange}
              />
            </label>
            <label>
              Gênero:
              <select
                name="genero"
                value={pacienteEditando.genero}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
                <option value="Outro">Outro</option>
              </select>
            </label>

            <div className="modal-buttons">
              <button onClick={handleSalvar}>Salvar</button>
              <button onClick={fecharModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
