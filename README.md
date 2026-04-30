## Project Structure

jsonplaceholder-axios-tests/
├── src/
│   └── axiosClient.js    
├── tests/
│   └── api.test.js
├── package.json
└── README.md

## Covered Endpoints

| # | Method | Endpoint              | Validates
| 1 | GET    | `/posts`              | Status 200, array of 100, Post schema            |
| 2 | GET    | `/posts/1`            | Status 200, Post schema, exact field values      |
| 3 | GET    | `/posts/1/comments`   | Status 200, array of 5, Comment schema, postId   |
| 4 | POST   | `/posts`              | Status 201, echoed fields, generated id=101      |
| 5 | POST   | `/todos`              | Status 201, Todo schema, echoed fields           |

## Setup & Run

bash
# Install dependencies
npm install

# Run full test suite with verbose output
npm test