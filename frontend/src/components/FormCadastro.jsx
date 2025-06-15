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

  const [erros, setErros] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErros(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const validarCampos = () => {
    const novosErros = {};
    const regexNome = /^[A-Za-zÀ-ÿ\s]+$/;

    if (!formData.data) novosErros.data = 'A data é obrigatória.';
    if (!formData.nome) {
      novosErros.nome = 'O nome é obrigatório.';
    } else if (!regexNome.test(formData.nome)) {
      novosErros.nome = 'Nome inválido.';
    }
    if (!formData.idade) {
      novosErros.idade = 'A idade é obrigatória.';
    } else if (parseInt(formData.idade) <= 0) {
      novosErros.idade = 'Idade inválida.';
    }
    if (!formData.genero) novosErros.genero = 'O gênero é obrigatório.';
    if (!formData.nomeDoenca) novosErros.nomeDoenca = 'Nome da doença obrigatório.';
    if (!formData.sintomas) novosErros.sintomas = 'Informe os sintomas.';
    if (!formData.descricao) novosErros.descricao = 'Descrição é obrigatória.';
    if (!formData.tratamento) novosErros.tratamento = 'Tratamento é obrigatório.';
    if (!formData.nomeMedicamento) novosErros.nomeMedicamento = 'Nome do medicamento obrigatório.';
    if (!formData.indicacao) novosErros.indicacao = 'Indicação é obrigatória.';

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
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

    if (!validarCampos()) return;

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

    setErros({});
  };

  return (
    <div className="form-cadastro">
      <h2>CADASTRO DE PACIENTES</h2>
      <form onSubmit={handleSubmit} className="form-content">
        <div className="form-column">
          <h3>Informações do Paciente</h3>

          <input type="date" name="data" value={formData.data} onChange={handleChange} />
          {erros.data && <p className="error-msg">{erros.data}</p>}

          <input type="text" name="nome" placeholder="Nome" value={formData.nome} onChange={handleChange} />
          {erros.nome && <p className="error-msg">{erros.nome}</p>}

          <input type="number" name="idade" placeholder="Idade" value={formData.idade} onChange={handleChange} />
          {erros.idade && <p className="error-msg">{erros.idade}</p>}

          <select name="genero" value={formData.genero} onChange={handleChange}>
            <option value="">Selecione o Gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Outro">Outro</option>
          </select>
          {erros.genero && <p className="error-msg">{erros.genero}</p>}

          <h3>Informações da Doença</h3>

          <input type="text" name="nomeDoenca" placeholder="Nome da Doença" value={formData.nomeDoenca} onChange={handleChange} />
          {erros.nomeDoenca && <p className="error-msg">{erros.nomeDoenca}</p>}

          <textarea name="sintomas" placeholder="Sintomas" value={formData.sintomas} onChange={handleChange} />
          {erros.sintomas && <p className="error-msg">{erros.sintomas}</p>}

          <textarea name="descricao" placeholder="Descrição" value={formData.descricao} onChange={handleChange} />
          {erros.descricao && <p className="error-msg">{erros.descricao}</p>}
        </div>

        <div className="form-column">
          <textarea className="tratamento" name="tratamento" placeholder="Tratamento" value={formData.tratamento} onChange={handleChange} />
          {erros.tratamento && <p className="error-msg">{erros.tratamento}</p>}

          <h3>Informações do Medicamento</h3>

          <input type="text" name="nomeMedicamento" placeholder="Nome do Medicamento" value={formData.nomeMedicamento} onChange={handleChange} />
          {erros.nomeMedicamento && <p className="error-msg">{erros.nomeMedicamento}</p>}

          <textarea name="indicacao" placeholder="Indicação" value={formData.indicacao} onChange={handleChange} />
          {erros.indicacao && <p className="error-msg">{erros.indicacao}</p>}

          <button type="submit">Cadastrar</button>
        </div>
      </form>
    </div>
  );
};

export default FormCadastro;
