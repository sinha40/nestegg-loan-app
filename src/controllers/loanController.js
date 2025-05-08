const { validationResult } = require('express-validator');
const LoanService = require('../services/loanService');

class LoanController {
    static async createLoanApplication(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const applicationData = {
                customer_id: req.body.customer_id,
                amount: parseFloat(req.body.amount),
                term_months: parseInt(req.body.term_months),
                annual_interest_rate: parseFloat(req.body.annual_interest_rate)
            };

            const result = await LoanService.createLoanApplication(applicationData);
            res.status(201).json({
                success: true,
                data: {
                    id: result.id,
                    message: 'Loan application created successfully'
                }
            });
        } catch (error) {
            console.error('Error creating loan application:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }

    static async getLoanApplication(req, res) {
        try {
            const loanId = parseInt(req.params.id);
            const loanApplication = await LoanService.getLoanApplication(loanId);

            if (!loanApplication) {
                return res.status(404).json({
                    success: false,
                    error: 'Loan application not found'
                });
            }

            res.status(200).json({
                success: true,
                data: loanApplication
            });
        } catch (error) {
            console.error('Error retrieving loan application:', error);
            res.status(500).json({
                success: false,
                error: 'Internal server error'
            });
        }
    }
}

module.exports = LoanController; 