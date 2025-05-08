const { Pool } = require('pg');
require('dotenv').config();

// Configure pool with optimal settings for high throughput
console.log('DB_PASSWORD:', process.env.DB_PASSWORD, 'Type:', typeof process.env.DB_PASSWORD);
const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: 100, // Maximum number of clients in the pool
    min: 20,  // Minimum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
    maxUses: 7500, // Close and replace a client after it has been used 7500 times
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

// Query definitions for frequently used queries
const queries = {
    getCustomerById: {
        text: 'SELECT id FROM customers WHERE id = $1'
    },
    createCustomer: {
        text: 'INSERT INTO customers (id, name, email) VALUES ($1, $2, $3) RETURNING id'
    },
    createLoanApplication: {
        text: 'INSERT INTO loan_applications (customer_id, amount, term_months, annual_interest_rate, monthly_payment) VALUES ($1, $2, $3, $4, $5) RETURNING id'
    },
    getLoanApplicationById: {
        text: 'SELECT la.*, c.name as customer_name, c.email as customer_email FROM loan_applications la JOIN customers c ON la.customer_id = c.id WHERE la.id = $1'
    }
};

// Add error handler for the pool
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

module.exports = {
    pool,
    queries
}; 