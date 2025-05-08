const Joi = require('joi');

const loanApplicationSchema = Joi.object({
    customer_id: Joi.number().integer().min(1).required()
        .messages({
            'number.base': 'Customer ID must be a number',
            'number.integer': 'Customer ID must be an integer',
            'number.min': 'Customer ID must be a positive integer',
            'any.required': 'Customer ID is required'
        }),
    amount: Joi.number().min(1).required()
        .messages({
            'number.base': 'Amount must be a number',
            'number.min': 'Amount must be a positive number',
            'any.required': 'Amount is required'
        }),
    term_months: Joi.number().integer().min(1).max(360).required()
        .messages({
            'number.base': 'Term must be a number',
            'number.integer': 'Term must be an integer',
            'number.min': 'Term must be at least 1 month',
            'number.max': 'Term cannot exceed 360 months',
            'any.required': 'Term is required'
        }),
    annual_interest_rate: Joi.number().min(0.1).max(100).required()
        .messages({
            'number.base': 'Annual interest rate must be a number',
            'number.min': 'Annual interest rate must be at least 0.1',
            'number.max': 'Annual interest rate cannot exceed 100',
            'any.required': 'Annual interest rate is required'
        })
});

const loanIdSchema = Joi.object({
    id: Joi.number().integer().min(1).required()
        .messages({
            'number.base': 'Loan ID must be a number',
            'number.integer': 'Loan ID must be an integer',
            'number.min': 'Loan ID must be a positive integer',
            'any.required': 'Loan ID is required'
        })
});

module.exports = {
    loanApplicationSchema,
    loanIdSchema
}; 