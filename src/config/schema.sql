-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create loan_applications table
CREATE TABLE IF NOT EXISTS loan_applications (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES customers(id),
    amount DECIMAL(10,2) NOT NULL,
    term_months INTEGER NOT NULL,
    annual_interest_rate DECIMAL(5,2) NOT NULL,
    monthly_payment DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT valid_amount CHECK (amount > 0),
    CONSTRAINT valid_term CHECK (term_months > 0),
    CONSTRAINT valid_interest_rate CHECK (annual_interest_rate > 0)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_loan_applications_customer_id ON loan_applications(customer_id);
CREATE INDEX IF NOT EXISTS idx_loan_applications_status ON loan_applications(status); 