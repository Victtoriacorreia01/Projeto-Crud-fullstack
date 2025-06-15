const express = require('express');
const cors = require('cors');

const pacienteRoutes = require('./routes/pacienteRoutes');
const authRoutes = require('./routes/authRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', pacienteRoutes);
app.use('/api', authRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
