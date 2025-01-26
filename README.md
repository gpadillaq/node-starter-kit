# Node Starter Kit

This is a Node.js starter kit project that includes user authentication, email verification, and basic CRUD operations using Prisma and PostgreSQL.

## Features

- User registration and login
- Email verification
- JWT-based authentication
- Prisma ORM for database operations
- Docker support for PostgreSQL
- Environment variable management with dotenv
- TypeScript for type safety

## Getting Started

### Prerequisites

- Node.js
- Docker
- PostgreSQL

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/yourusername/node-starter-kit.git
    cd node-starter-kit
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Copy the `.env.template` file to `.env` and update the environment variables:

   ```sh
    cp .env.template .env
    ```

### Database Setup

1. Install the Prisma CLI:

    ```sh
    npm install -g prisma
    ```

2. Initialize Prisma and create your database schema:

    ```sh
    npx prisma init
    ```

3. Update the `DATABASE_URL` in the `.env` file with your database connection string.

4. Run the Prisma migrations to create the database tables:

    ```sh
    npx prisma migrate dev
    ```

### Docker Setup

1. Start the PostgreSQL database using Docker:

    ```sh
    docker-compose up -d
    ```

### Running the Application

1. Start the development server:

    ```sh
    npm run dev
    ```

### Running Tests

Currently, there are no tests specified. You can add your tests in the `test` directory and update the `test` script in `package.json`.

### Building the Project

To build the project, run:

```sh
npm run build
````

### Start

To build and start the project:

```sh
npm start
```

## API Endpoints

### Authentication

#### Register a new user

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully. Please check your email to verify your account."
  }
  ```

#### Login

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### User

#### Get user profile

- **URL:** `/api/user/profile`
- **Method:** `GET`
- **Headers:**
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }
  ```
- **Response:**
  ```json
  {
    "id": "user_id",
    "email": "user@example.com",
    "createdAt": "2023-01-01T00:00:00.000Z"
  }
  ```

## License

This project is licensed under the ISC License.

