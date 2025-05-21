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

module.exports = { addPaciente, getPacientes };
