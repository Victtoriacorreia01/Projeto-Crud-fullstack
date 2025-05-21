const connection = require('../db/connection');

exports.createPaciente = async (req, res) => {
  const { data, nome, idade, genero, doenca, medicamento } = req.body;

  try {
    
    const [pacienteResult] = await connection.execute(
      'INSERT INTO pacientes (nome, idade, genero, data_cadastro) VALUES (?, ?, ?, ?)',
      [nome, idade, genero, data || new Date()]
    );
    const pacienteId = pacienteResult.insertId;

    const [doencaResult] = await connection.execute(
      'INSERT INTO doencas (nome, descricao, tratamento) VALUES (?, ?, ?)',
      [doenca.nome, doenca.descricao, doenca.tratamento]
    );
    const doencaId = doencaResult.insertId;

    
    if (doenca.sintomas) {
      
      const sintomasArray = doenca.sintomas.split(',').map(s => s.trim());
      for (const sintoma of sintomasArray) {
        await connection.execute(
          'INSERT INTO sintomas (sintoma, id_doenca) VALUES (?, ?)',
          [sintoma, doencaId]
        );
      }
    }

    await connection.execute(
      'INSERT INTO medicamentos (nome, indicacao, id_doenca) VALUES (?, ?, ?)',
      [medicamento.nome, medicamento.indicacao, doencaId]
    );

    await connection.execute(
      'INSERT INTO pacientes_doencas (id_paciente, id_doenca) VALUES (?, ?)',
      [pacienteId, doencaId]
    );

    res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    res.status(500).json({ error: 'Erro ao cadastrar paciente' });
  }
};
