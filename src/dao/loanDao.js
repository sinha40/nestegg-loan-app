const DatabaseService = require('../services/databaseService');
const cacheService = require('../services/cacheService');

class LoanDao {
    static async getCustomerById(customerId) {
        // Try cache first
        const cachedCustomer = cacheService.getCustomer(customerId);
        if (cachedCustomer) {
            return cachedCustomer;
        }

        const customer = await DatabaseService.executeQuery('getCustomerById', [customerId]);
        if (customer) {
            cacheService.setCustomer(customerId, customer);
        }
        return customer;
    }

    static async createCustomer(customerId) {
        const customer = await DatabaseService.executeQuery('createCustomer', [
            customerId,
            `Customer ${customerId}`,
            `customer${customerId}@example.com`
        ]);
        return customer;
    }

    static async createLoanApplication(customerId, amount, termMonths, annualInterestRate, monthlyPayment) {
        const loan = await DatabaseService.executeQuery('createLoanApplication', [
            customerId,
            amount,
            termMonths,
            annualInterestRate,
            monthlyPayment
        ]);
        return loan;
    }

    static async getLoanApplicationById(id) {
        // Try cache first
        const cachedLoan = cacheService.getLoan(id);
        if (cachedLoan) {
            return cachedLoan;
        }

        const loan = await DatabaseService.executeQuery('getLoanApplicationById', [id]);
        if (loan) {
            cacheService.setLoan(id, loan);
        }
        return loan;
    }
}

module.exports = LoanDao; 