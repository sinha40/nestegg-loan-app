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

3. Create a PostgreSQL database and update the `.env` file with your database credentials

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

Production deployment on AWS EB + RDS
```
Login to AWS console
Get Aws credentials (access key, secret key) - one of the way
Create AWS EB along with RDS (postgres)
Make sure RDS should not be publicly accesible but it should be accessible via EB application. You can do it using iam role
Do aws local setup using `aws configure`
Run `eb init` in this repo
If you already have created EB app, replace .elasticbeanstalk/config.yml `environment` and `application_name` with actual EB env name and application name
Also check branch name in config.yml(in my case it is master)
Now add your changes using `git add .` and commit your changes
Run command -> eb deploy
All done:)

Extention: If you want to deploy it via github action follow below process
I already create a deploy.yml file
Add secrets aws secret, aws access key,eb env name, eb app name, region in github action secret
Whenever you commit code or merge another branch in deployment branch, it will automatically deploy code on EB

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

- Input validation using joi validator
- Security headers with Helmet
- CORS enabled
- SQL injection prevention using parameterized queries
- Error handling middleware
- Rate limiting for get and post api request to avoid attack

## AI usage
- Used AI to correct documentation
- User chatgpt to how to use Aws EB, rds with EB and github action ?
- Error resolution

## Extra
1. Added inmemory cache layer to avoid calling db everytime, this way we can get faster response and low query rate on our db