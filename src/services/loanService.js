const LoanDao = require('../dao/loanDao');

class LoanService {
    static calculateMonthlyPayment(amount, termMonths, annualInterestRate) {
        const monthlyRate = (annualInterestRate / 12) / 100;
        const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / 
                             (Math.pow(1 + monthlyRate, termMonths) - 1);
        return parseFloat(monthlyPayment.toFixed(2));
    }

    static async getOrCreateCustomer(customerId) {
        // First try to get the customer
        const customer = await LoanDao.getCustomerById(customerId);
        
        if (customer) {
            return customer.id;
        }

        // If customer doesn't exist, create a new one
        const newCustomer = await LoanDao.createCustomer(customerId);
        return newCustomer.id;
    }

    static async createLoanApplication(applicationData) {
        const { customer_id, amount, term_months, annual_interest_rate } = applicationData;
        
        // Get or create customer
        const actualCustomerId = await this.getOrCreateCustomer(customer_id);
        
        // Calculate monthly payment
        const monthly_payment = this.calculateMonthlyPayment(amount, term_months, annual_interest_rate);

        return await LoanDao.createLoanApplication(
            actualCustomerId,
            amount,
            term_months,
            annual_interest_rate,
            monthly_payment
        );
    }

    static async getLoanApplication(id) {
        return await LoanDao.getLoanApplicationById(id);
    }
}

module.exports = LoanService; 