const { pool, queries } = require('../config/database');

class DatabaseService {
    static async executeQuery(queryName, values = []) {
        const result = await pool.query({
            text: queries[queryName].text,
            values
        });
        return result.rows[0];
    }
}

module.exports = DatabaseService; 