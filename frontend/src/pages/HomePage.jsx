import React, { useEffect, useState } from 'react';
import Home from '../components/Home'; 
import { fetcher } from '../utils/axiosConfig'; 

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
      .catch(err => {
        setError('Erro ao buscar pacientes');
        setLoading(false);
      });
  }, []);

  function excluirPaciente(id) {
    fetch(`/api/pacientes/${id}`, { method: 'DELETE' })
      .then(res => {
        if (res.ok) {
          alert('Paciente excluído!');
          setRegistros(prev => prev.filter(p => p.id !== id));
        } else {
          alert('Erro ao excluir paciente');
        }
      });
  }

  function editarPaciente(id, nome, idade, genero) {
    const novoNome = prompt("Novo nome:", nome);
    const novaIdade = prompt("Nova idade:", idade);
    const novoGenero = prompt("Novo gênero:", genero);
    
    if (!novoNome || !novaIdade || !novoGenero) {
      alert('Todos os campos devem ser preenchidos.');
      return;
    }

    fetch(`/api/pacientes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: novoNome, idade: novaIdade, genero: novoGenero })
    }).then(res => {
      if (res.ok) {
        alert('Paciente atualizado!');
        setRegistros(prev =>
          prev.map(p =>
            p.id === id ? { ...p, nome: novoNome, idade: novaIdade, genero: novoGenero } : p
          )
        );
      } else {
        alert('Erro ao atualizar paciente');
      }
    });
  }

  if (loading) return <p>Carregando pacientes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Home 
      registros={registros} 
      excluirPaciente={excluirPaciente} 
      editarPaciente={editarPaciente} 
    />
  );
};

export default HomePage;
