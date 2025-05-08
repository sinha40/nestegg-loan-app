const { pool } = require('../config/database');
const fs = require('fs').promises;
const path = require('path');

async function initializeDatabase() {
    const client = await pool.connect();
    try {
        // Read and execute schema.sql
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schemaSQL = await fs.readFile(schemaPath, 'utf8');
        await client.query(schemaSQL);

        // Read and execute optimizations.sql
        const optimizationsPath = path.join(__dirname, 'optimizations.sql');
        const optimizationsSQL = await fs.readFile(optimizationsPath, 'utf8');
        await client.query(optimizationsSQL);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    } finally {
        client.release();
    }
}

// Run if this file is executed directly
if (require.main === module) {
    initializeDatabase()
        .then(() => process.exit(0))
        .catch(error => {
            console.error('Failed to initialize database:', error);
            process.exit(1);
        });
}

module.exports = { initializeDatabase }; 