const jwt = require('jsonwebtoken');

const medicoFake = {
  email: 'medico@example.com',
  senha: '123456'
};

const SECRET = 'chave_secreta_simples'; 

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (email === medicoFake.email && senha === medicoFake.senha) {
    const token = jwt.sign({ email }, SECRET, { expiresIn: '2h' });
    return res.json({ sucesso: true, token }); 
  }

  return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
};
