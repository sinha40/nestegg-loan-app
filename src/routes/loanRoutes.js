const express = require('express');
const LoanController = require('../controllers/loanController');
const { loanApplicationSchema, loanIdSchema } = require('../validators/loanValidators');
const { validateRequest, validateParams } = require('../middleware/validationMiddleware');

const router = express.Router();

// Routes
router.post('/loan-applications', validateRequest(loanApplicationSchema), LoanController.createLoanApplication);
router.get('/loan-applications/:id', validateParams(loanIdSchema), LoanController.getLoanApplication);

module.exports = router; 