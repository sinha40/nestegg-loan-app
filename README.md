# Loan Application API

A Node.js backend service for processing loan applications, built with Express.js and PostgreSQL.

## Features

- Create loan applications with automatic monthly payment calculation
- Retrieve loan application details with customer information
- Input validation and error handling
- Secure API design with Helmet
- PostgreSQL database integration
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd loan-application-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a PostgreSQL database and update the `.env` file with your database credentials:
```
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=loan_app_db
DB_USER=your_username
DB_PASSWORD=your_password
NODE_ENV=development
```

4. Initialize the database schema:
```bash
psql -U your_username -d loan_app_db -f src/config/schema.sql
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Create Loan Application
- **POST** `/api/loan-applications`
- Request body:
```json
{
    "customer_id": 123,
    "amount": 5000,
    "term_months": 36,
    "annual_interest_rate": 5.0
}
```

### Get Loan Application
- **GET** `/api/loan-applications/:id`

## Security Features

- Input validation using express-validator
- Security headers with Helmet
- CORS enabled
- SQL injection prevention using parameterized queries
- Error handling middleware

## Development

The project structure follows a modular architecture:
```
src/
├── config/         # Database and environment configuration
├── controllers/    # Request handlers
├── middleware/     # Custom middleware
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
└── app.js         # Application entry point
```

## Testing

Run tests:
```bash
npm test
```

## License

ISC 