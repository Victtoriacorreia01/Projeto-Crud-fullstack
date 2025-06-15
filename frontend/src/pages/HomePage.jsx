import React, { useEffect, useState } from 'react';
import Home from '../components/Home';
import { fetcher, putter, deleter } from '../utils/axiosConfig';

const HomePage = () => {
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetcher('/pacientes')
      .then(data => {
        setRegistros(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Erro ao buscar pacientes');
        setLoading(false);
      });
  }, []);

  const excluirPaciente = (id) => {
    deleter(`/pacientes/${id}`)
      .then(() => {
        alert('Paciente excluído!');
        setRegistros(prev => prev.filter(p => p.id !== id));
      })
      .catch(() => alert('Erro ao excluir paciente'));
  };

  const editarPaciente = ({ id, nome, idade, genero }) => {
    putter(`/pacientes/${id}`, { nome, idade, genero })
      .then(() => {
        alert('Paciente atualizado!');
        setRegistros(prev =>
          prev.map(p =>
            p.id === id ? { ...p, nome, idade, genero } : p
          )
        );
      })
      .catch(() => alert('Erro ao atualizar paciente'));
  };

  if (loading) return <p>Carregando pacientes...</p>;
  if (error)   return <p>{error}</p>;

  return (
    <Home
      registros={registros}
      excluirPaciente={excluirPaciente}
      editarPaciente={editarPaciente}  
    />
  );
};

export default HomePage;
