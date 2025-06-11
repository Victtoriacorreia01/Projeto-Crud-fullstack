const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

router.post('/pacientes', pacienteController.createPaciente);
router.get('/pacientes', pacienteController.getPacientes);
router.delete('/pacientes/:id', pacienteController.deletePaciente);
router.put('/pacientes/:id', pacienteController.updatePaciente);


module.exports = router;
