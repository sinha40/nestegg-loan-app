const NodeCache = require('node-cache');

class CacheService {
    constructor() {
        this.cache = new NodeCache({ 
            stdTTL: 300, // 5 minutes TTL
            checkperiod: 320,
            useClones: false
        });
    }

    // Customer cache methods
    getCustomer(customerId) {
        const cacheKey = `customer:${customerId}`;
        return this.cache.get(cacheKey);
    }

    setCustomer(customerId, customerData) {
        const cacheKey = `customer:${customerId}`;
        this.cache.set(cacheKey, customerData);
    }

    invalidateCustomer(customerId) {
        const cacheKey = `customer:${customerId}`;
        this.cache.del(cacheKey);
    }

    // Loan cache methods
    getLoan(loanId) {
        const cacheKey = `loan:${loanId}`;
        return this.cache.get(cacheKey);
    }

    setLoan(loanId, loanData) {
        const cacheKey = `loan:${loanId}`;
        this.cache.set(cacheKey, loanData);
    }

    invalidateLoan(loanId) {
        const cacheKey = `loan:${loanId}`;
        this.cache.del(cacheKey);
    }
}

// Export a singleton instance
module.exports = new CacheService(); 