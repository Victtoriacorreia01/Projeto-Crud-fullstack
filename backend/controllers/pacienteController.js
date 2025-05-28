const connection = require('../db/connection');

exports.createPaciente = async (req, res) => {
  const { data, nome, idade, genero, doenca = {}, medicamento = {} } = req.body;

  try {
 
    const [pacienteResult] = await connection.execute(
      'INSERT INTO pacientes (nome, idade, genero, data_cadastro) VALUES (?, ?, ?, ?)',
      [nome, idade, genero, data || new Date()]
    );
    const pacienteId = pacienteResult.insertId;

    let doencaId = null;
    if (doenca.nome || doenca.descricao || doenca.tratamento) {
      const [doencaResult] = await connection.execute(
        'INSERT INTO doencas (nome, descricao, tratamento) VALUES (?, ?, ?)',
        [
          doenca.nome || null,
          doenca.descricao || null,
          doenca.tratamento || null
        ]
      );
      doencaId = doencaResult.insertId;

      if (doenca.sintomas) {
        const sintomasArray = doenca.sintomas.split(',').map(s => s.trim());
        for (const sintoma of sintomasArray) {
          await connection.execute(
            'INSERT INTO sintomas (sintoma, id_doenca) VALUES (?, ?)',
            [sintoma, doencaId]
          );
        }
      }
    }

    if (medicamento.nome || medicamento.indicacao) {
      await connection.execute(
        'INSERT INTO medicamentos (nome, indicacao, id_doenca) VALUES (?, ?, ?)',
        [
          medicamento.nome || null,
          medicamento.indicacao || null,
          doencaId
        ]
      );
    }
    if (doencaId) {
      await connection.execute(
        'INSERT INTO pacientes_doencas (id_paciente, id_doenca) VALUES (?, ?)',
        [pacienteId, doencaId]
      );
    }

    res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ error: 'Erro ao cadastrar paciente' });
  }
};

exports.getPacientes = async (req, res) => {
  try {
    const [rows] = await connection.execute(`
      SELECT p.id, p.nome, p.idade, p.genero, p.data_cadastro,
             d.nome AS doenca_nome, d.descricao AS doenca_descricao, d.tratamento AS doenca_tratamento,
             m.nome AS medicamento_nome, m.indicacao AS medicamento_indicacao
      FROM pacientes p
      LEFT JOIN pacientes_doencas pd ON p.id = pd.id_paciente
      LEFT JOIN doencas d ON pd.id_doenca = d.id
      LEFT JOIN medicamentos m ON d.id = m.id_doenca
    `);

    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    res.status(500).json({ error: 'Erro ao buscar pacientes' });
  }
};


exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nome, idade, genero } = req.body;
  
    try {
      const [result] = await connection.execute(
        'UPDATE pacientes SET nome = ?, idade = ?, genero = ? WHERE id = ?',
        [nome, idade, genero, id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
  
      res.status(200).json({ message: 'Paciente atualizado com sucesso!' });
    } catch (error) {
      console.error('Erro ao atualizar paciente:', error);
      res.status(500).json({ error: 'Erro ao atualizar paciente' });
    }
  };
  

  exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
  
    try {
      const [result] = await connection.execute(
        'DELETE FROM pacientes WHERE id = ?',
        [id]
      );
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Paciente não encontrado' });
      }
  
      res.status(200).json({ message: 'Paciente excluído com sucesso!' });
    } catch (error) {
      console.error('Erro ao excluir paciente:', error);
      res.status(500).json({ error: 'Erro ao excluir paciente' });
    }
  };
  
