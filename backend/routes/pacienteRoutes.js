const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const verificarToken = require('../middlewares/authMiddleware');

router.post('/pacientes', verificarToken, pacienteController.createPaciente);
router.get('/pacientes', verificarToken, pacienteController.getPacientes);
router.delete('/pacientes/:id', verificarToken, pacienteController.deletePaciente);
router.put('/pacientes/:id', verificarToken, pacienteController.updatePaciente);

module.exports = router;
