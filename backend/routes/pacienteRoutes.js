
const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.post('/pacientes', pacienteController.createPaciente);

module.exports = router;
