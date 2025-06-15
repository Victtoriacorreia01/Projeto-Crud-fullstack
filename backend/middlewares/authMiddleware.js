
const jwt = require('jsonwebtoken');
const SECRET = 'chave_secreta_simples';

const verificarToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).json({ mensagem: 'Token não fornecido.' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ mensagem: 'Token inválido.' });
  }
};

module.exports = verificarToken;
