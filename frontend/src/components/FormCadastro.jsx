import React, { useState } from 'react';
import '../styles/FormCadastro.css';
import { poster } from '../utils/axiosConfig';

const FormCadastro = () => {
  const [formData, setFormData] = useState({
    data: '',
    nome: '',
    idade: '',
    genero: '',
    nomeDoenca: '',
    sintomas: '',
    descricao: '',
    tratamento: '',
    nomeMedicamento: '',
    indicacao: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      data: formData.data,
      nome: formData.nome,
      idade: formData.idade,
      genero: formData.genero,
      doenca: {
        nome: formData.nomeDoenca,
        sintomas: formData.sintomas,
        descricao: formData.descricao,
        tratamento: formData.tratamento
      },
      medicamento: {
        nome: formData.nomeMedicamento,
        indicacao: formData.indicacao
      }
    };

    handleAddRegistro(newRegistro);

    // Limpa o formulário
    setFormData({
      data: '',
      nome: '',
      idade: '',
      genero: '',
      nomeDoenca: '',
      sintomas: '',
      descricao: '',
      tratamento: '',
      nomeMedicamento: '',
      indicacao: ''
    });
  };

  return (
    <div className="form-cadastro">
      <h2>CADASTRO DE PACIENTES</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-column">
          <h3>Informações do Paciente</h3>
          <input
            type="date"
            name="data"
            value={formData.data}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="nome"
            placeholder="Nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="idade"
            placeholder="Idade"
            value={formData.idade}
            onChange={handleChange}
            required
          />
          <select
            name="genero"
            value={formData.genero}
            onChange={handleChange}
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
            name="nomeDoenca"
            placeholder="Nome da Doença"
            value={formData.nomeDoenca}
            onChange={handleChange}
            required
          />
          <textarea
            name="sintomas"
            placeholder="Sintomas"
            value={formData.sintomas}
            onChange={handleChange}
            required
          />
          <textarea
            name="descricao"
            placeholder="Descrição"
            value={formData.descricao}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-column">
          <textarea
            name="tratamento"
            className="tratamento"
            placeholder="Tratamento"
            value={formData.tratamento}
            onChange={handleChange}
            required
          />

          <h3>Informações do Medicamento</h3>
          <input
            type="text"
            name="nomeMedicamento"
            placeholder="Nome do Medicamento"
            value={formData.nomeMedicamento}
            onChange={handleChange}
            required
          />
          <textarea
            name="indicacao"
            placeholder="Indicação"
            value={formData.indicacao}
            onChange={handleChange}
            required
          />

          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default FormCadastro;
