const express = require('express');
const cors = require('cors');
const pacienteRoutes = require('./routes/pacienteRoutes');

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api/teste', (req, res) => {
  res.send('Rota GET /api/teste funcionando!');
});


app.use('/api', pacienteRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
