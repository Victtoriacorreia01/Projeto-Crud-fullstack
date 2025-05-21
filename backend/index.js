const express = require('express');
const cors = require('cors');
const pacienteRoutes = require('./routes/pacienteRoutes'); // Suas rotas

const app = express();

// Configuração de CORS
app.use(cors({
  origin: 'http://localhost:3000', // Permitir o frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type'], // Cabeçalhos permitidos
  credentials: true, // Necessário se usar cookies ou autenticação
}));

app.use(express.json()); // Middleware para interpretar JSON

// Rota principal
app.use('/api', pacienteRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
