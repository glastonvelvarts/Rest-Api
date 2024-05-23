# Rest-Api
This is a simple REST API for managing users. The API allows you to list all users, get a user by ID, create a new user, update an existing user, and delete a user.

## Endpoints

### List All Users

**GET** `/users`

- Retrieves a list of all users.

### Get User by ID

**GET** `/users1`

- Retrieves the user with ID 1.

**GET** `/users2`

- Retrieves the user with ID 2.

### Create New User

**POST** `/users`

- Creates a new user.
- Request body should be in JSON format and include the user's details.

### Edit User by ID

**PATCH** `/user/1`

- Edits the user with ID 1.
- Request body should be in JSON format and include the updated user's details.

### Delete User by ID

**DELETE** `/users/1`

- Deletes the user with ID 1.

## Example Requests

### List All Users

```http
GET /users HTTP/1.1
Host: localhost:8002
```

### Get User with ID 1

```http
GET /users1 HTTP/1.1
Host: localhost:8002
```

### Get User with ID 2

```http
GET /users2 HTTP/1.1
Host: localhost:8002
```

### Create a New User

```http
POST /users HTTP/1.1
Host: localhost:8002
Content-Type: application/json

{
  "first_name": "John",
  "last_name": "Doe",
  "email": "john.doe@example.com"
}
```

### Edit User with ID 1

```http
PATCH /user/1 HTTP/1.1
Host: localhost:8002
Content-Type: application/json

{
  "first_name": "Jane"
}
```

### Delete User with ID 1

```http
DELETE /users/1 HTTP/1.1
Host: localhost:8002
```

## Running the Server

To run the server, use the following command:

```bash
node server.js
```

Ensure you have `MOCK_DATA.json` in the same directory as `server.js`. This file should contain an initial list of users in JSON format.

## Dependencies

- Express
- fs (File System)

Install the dependencies using npm:

```bash
npm install express
```

