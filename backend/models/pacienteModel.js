const connection = require('../db/connection');

const addPaciente = (paciente, callback) => {
  const { nome, idade, genero, doenca, medicamento } = paciente;
  const query = 'INSERT INTO pacientes (nome, idade, genero, doenca, medicamento) VALUES (?, ?, ?, ?, ?)';

  connection.query(query, [nome, idade, genero, JSON.stringify(doenca), JSON.stringify(medicamento)], (err, results) => {
    if (err) return callback(err);
    callback(null, results.insertId);
  });
};

const getPacientes = (callback) => {
  const query = 'SELECT * FROM pacientes';
  connection.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

const deletePaciente = async (req, res) => {
  const { id } = req.params;

  try {
    await connection.execute('DELETE FROM pacientes WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Paciente não encontrado' });
    }

    res.status(200).json({ message: 'Paciente excluído com sucesso!' });
  } catch (error) {
    console.error('Erro ao excluir paciente:', error);
    res.status(500).json({ error: 'Erro ao excluir paciente' });
  }
};




const updatePaciente = (id, paciente, callback) => {
  const { nome, idade, genero, doenca, medicamento } = paciente;
  const query = 'UPDATE pacientes SET nome = ?, idade = ?, genero = ?, doenca = ?, medicamento = ? WHERE id = ?';

  connection.query(
    query,
    [nome, idade, genero, JSON.stringify(doenca), JSON.stringify(medicamento), id],
    (err, results) => {
      if (err) return callback(err);
      callback(null, results.affectedRows);
    }
  );
};

module.exports = { 
  addPaciente, 
  getPacientes, 
  deletePaciente, 
  updatePaciente 
};
