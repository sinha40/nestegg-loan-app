const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const loanRoutes = require('./routes/loanRoutes');
const { initializeDatabase } = require('./db/init');

const app = express();

app.set('trust proxy', 1);
// Rate limiting configuration for GET requests
// const getLimiter = rateLimit({
//     windowMs: parseInt(process.env.GET_RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute default
//     max: parseInt(process.env.GET_RATE_LIMIT_MAX) || 10, // 10 requests default
//     message: {
//         success: false,
//         error: 'Too many GET requests from this IP, please try again after a minute'
//     },
//     standardHeaders: true,
//     legacyHeaders: false,
// });

// // Rate limiting configuration for POST requests
// const postLimiter = rateLimit({
//     windowMs: parseInt(process.env.POST_RATE_LIMIT_WINDOW_MS) || 60000, // 1 minute default
//     max: parseInt(process.env.POST_RATE_LIMIT_MAX) || 2, // 2 requests default
//     message: {
//         success: false,
//         error: 'Too many POST requests from this IP, please try again after a minute'
//     },
//     standardHeaders: true,
//     legacyHeaders: false,
// });

// // Apply rate limiting based on HTTP method
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//         getLimiter(req, res, next);
//     } else if (req.method === 'POST') {
//         postLimiter(req, res, next);
//     } else {
//         next();
//     }
// });

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

app.get('/', (req, res) => {
    res.status(200).send('OK');
  });
// Routes
app.use('/api', loanRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Ooh no! Something went wrong! Don\'t worry, Try again later!'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: 'Oops you are lost!'
    });
});

const PORT = process.env.PORT || 3000;

// Initialize database and start server
async function startServer() {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer(); 