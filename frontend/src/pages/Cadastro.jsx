import React from 'react';
import FormCadastro from '../components/FormCadastro';

const Cadastro = ({ onAddRegistro }) => {
  return (
    <div>
      <FormCadastro onAddRegistro={onAddRegistro} />
    </div>
  );
};

export default Cadastro;
