import React, { useState } from 'react';
import '../styles/FormCadastro.css';
import { poster } from '../utils/axiosConfig';

const FormCadastro = () => {
  const [data, setData] = useState('');
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('');
  const [nomeDoenca, setNomeDoenca] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [descricao, setDescricao] = useState('');
  const [tratamento, setTratamento] = useState('');
  const [nomeMedicamento, setNomeMedicamento] = useState('');
  const [indicacao, setIndicacao] = useState('');

  const handleAddRegistro = async (registro) => {
    try {
      const response = await poster('/pacientes', registro);
      alert('Cadastro realizado com sucesso!');
      console.log('Resposta do servidor:', response);
    } catch (error) {
      alert('Erro ao cadastrar');
      console.error('Erro ao cadastrar:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRegistro = {
      data,
      nome,
      idade,
      genero,
      doenca: { nome: nomeDoenca, sintomas, descricao, tratamento },
      medicamento: { nome: nomeMedicamento, indicacao },
    };

    handleAddRegistro(newRegistro);

    // Limpa os campos
    setData('');
    setNome('');
    setIdade('');
    setGenero('');
    setNomeDoenca('');
    setSintomas('');
    setDescricao('');
    setTratamento('');
    setNomeMedicamento('');
    setIndicacao('');
  };

  return (
    <div className="form-cadastro">
      <h2>Cadastro de Pacientes</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-column">
          <h3>Informações do Paciente</h3>
          <input
            type="date"
            placeholder="Data"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
          <select
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="">Selecione o Gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>

          <h3>Informações da Doença</h3>
          <input
            type="text"
            placeholder="Nome da Doença"
            value={nomeDoenca}
            onChange={(e) => setNomeDoenca(e.target.value)}
            required
          />
          <textarea
            placeholder="Sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
            required
          />
          <textarea
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div className="form-column">
          <textarea
            className='tratamento'
            placeholder="Tratamento"
            value={tratamento}
            onChange={(e) => setTratamento(e.target.value)}
            required
          />

          <h3>Informações do Medicamento</h3>
          <input
            type="text"
            placeholder="Nome do Medicamento"
            value={nomeMedicamento}
            onChange={(e) => setNomeMedicamento(e.target.value)}
            required
          />
          <textarea
            placeholder="Indicação"
            value={indicacao}
            onChange={(e) => setIndicacao(e.target.value)}
            required
          />

          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default FormCadastro;
