const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.post('/pacientes', pacienteController.createPaciente);
router.get('/pacientes', pacienteController.getPacientes);

module.exports = router;
