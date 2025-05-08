-- Create indexes for frequently queried columns
CREATE INDEX IF NOT EXISTS idx_customers_id ON customers(id);
CREATE INDEX IF NOT EXISTS idx_loan_applications_id ON loan_applications(id);
CREATE INDEX IF NOT EXISTS idx_loan_applications_customer_id ON loan_applications(customer_id);

-- Create partial indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_loan_applications_active ON loan_applications(id) 
WHERE status = 'active';

-- Optimize table storage
ALTER TABLE customers SET (fillfactor = 90);
ALTER TABLE loan_applications SET (fillfactor = 90);

-- Drop existing materialized view if it exists
DROP MATERIALIZED VIEW IF EXISTS loan_statistics;

-- Create materialized view for frequently accessed loan statistics
CREATE MATERIALIZED VIEW loan_statistics AS
SELECT 
    customer_id,
    COUNT(*) as total_loans,
    SUM(amount) as total_amount,
    AVG(amount) as avg_amount
FROM loan_applications
GROUP BY customer_id;

-- Create index on materialized view
CREATE UNIQUE INDEX IF NOT EXISTS idx_loan_statistics_customer_id 
ON loan_statistics(customer_id);

-- Create function to refresh materialized view
CREATE OR REPLACE FUNCTION refresh_loan_statistics()
RETURNS trigger AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY loan_statistics;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to refresh materialized view
CREATE TRIGGER refresh_loan_statistics_trigger
AFTER INSERT OR UPDATE OR DELETE ON loan_applications
FOR EACH STATEMENT
EXECUTE FUNCTION refresh_loan_statistics();

-- Set work_mem for better performance of complex queries
SET work_mem = '256MB';

-- Enable parallel query execution
SET max_parallel_workers_per_gather = 4;
SET max_parallel_workers = 8;
SET max_parallel_maintenance_workers = 4; 