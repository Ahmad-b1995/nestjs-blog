# Nest.js Blog

This is a backend API for a blogging platform built with NestJS. The project handles various functionalities such as user authentication, blog post management, categories, tags, media uploads, and more. It integrates MySQL for data storage and uses Redis for caching. This project is configured with Docker for easy deployment.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)

## Features

- **User Authentication**: Registration, login, and profile management using JWT authentication.
- **Blog Post Management**: CRUD operations for blog posts with category and tag association.
- **Categories and Tags**: Separate endpoints for creating, updating, and managing categories and tags.
- **Media Uploads**: Supports file uploads and storage.
- **Swagger Documentation**: Automatically generated API documentation via Swagger.
- **Dockerized Deployment**: Docker configuration for easy setup and deployment.
- **Caching**: Redis integration for improved performance on frequently accessed data.

## Technologies Used

- [NestJS](https://nestjs.com/)
- [MySQL](https://www.mysql.com/)
- [Redis](https://redis.io/)
- [Swagger](https://swagger.io/)
- Docker

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/yourusername/dextrading-blog.git
    cd dextrading-blog
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up MySQL and Redis**:
    - Ensure you have MySQL and Redis instances running.
    - Update the `.env` file with the appropriate database credentials and Redis configuration.

4. **Run the application**:
    ```bash
    npm run start:dev
    ```

5. **Access the API Documentation**:
    - Once the server is running, visit `http://localhost:3000/api` to view the Swagger documentation.

## Environment Variables

Create a `.env` file in the root directory with the following:

```plaintext
DATABASE_HOST=your_mysql_host
DATABASE_PORT=your_mysql_port
DATABASE_USER=your_mysql_user
DATABASE_PASSWORD=your_mysql_password
DATABASE_NAME=your_database_name

REDIS_HOST=your_redis_host
REDIS_PORT=your_redis_port

JWT_SECRET=your_jwt_secret
```

## Usage

### Authentication

- **Register**: `POST /api/auth/register`
- **Login**: `POST /api/auth/login`
- **Get Profile**: `GET /api/auth/profile` (Requires JWT)

### Users

- **Get Users**: `GET /api/users`
- **Get User by ID**: `GET /api/users/:id`
- **Create User**: `POST /api/users`
- **Update User**: `PUT /api/users/:id`
- **Delete User**: `DELETE /api/users/:id`

### Blog Posts

- **Get All Posts**: `GET /api/posts`
- **Get Post by ID**: `GET /api/posts/:id`
- **Create Post**: `POST /api/posts`
- **Update Post**: `PUT /api/posts/:id`
- **Delete Post**: `DELETE /api/posts/:id`
- **Filter Posts by Tag**: `GET /api/posts/tags/:tag`
- **Filter Posts by Category**: `GET /api/posts/categories/:category`

### Categories

- **Get All Categories**: `GET /api/category`
- **Create Category**: `POST /api/category`
- **Update Category**: `PUT /api/category/:id`
- **Delete Category**: `DELETE /api/category/:id`

### Tags

- **Get All Tags**: `GET /api/tags`
- **Create Tag**: `POST /api/tags`
- **Update Tag**: `PUT /api/tags/:id`
- **Delete Tag**: `DELETE /api/tags/:id`

### Media

- **Upload File**: `POST /api/media/upload` (multipart/form-data)
- **Get All Files**: `GET /api/media`
- **Delete File**: `DELETE /api/media/:id`
- **Bulk Delete Files**: `DELETE /api/media`

## Project Structure

- `src/auth`: Handles user authentication and JWT-based authorization.
- `src/users`: Manages user data and user-specific operations.
- `src/posts`: Manages blog posts including create, read, update, delete (CRUD) operations.
- `src/category`: Manages blog categories.
- `src/tags`: Manages tags for categorizing posts.
- `src/media`: Manages file uploads and media handling.
- `src/common`: Contains shared utilities, guards, and interceptors.
- `src/database`: Database configuration and setup.
- `src/redis`: Redis configuration for caching.
- `src/constants`: Contains application-wide constants.

## API Documentation

This project uses [Swagger](https://swagger.io/) for documenting the API. You can access the API documentation at `http://localhost:3000/api` after starting the server.

## Docker

To run the project using Docker:

1. **Build the Docker image**:
    ```bash
    docker-compose build
    ```

2. **Run the Docker containers**:
    ```bash
    docker-compose up
    ```

This will set up the necessary containers for the API, MySQL, and Redis.

## License

This project is licensed under the MIT License.