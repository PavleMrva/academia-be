# Academia API

Academia API is a back-end service used for the Academia e-Learning platform with a primary focus on arts. In this platform, there are 3 types of users: `students`, `teachers` and `administrators`.

- **Students** can enroll in specific *courses*. After they watch all course lectures, students can take a final test after which they will be granted a certificate in case of successful completion.
- **Teachers** are content creators for this platform. They can design *courses*, upload *lecture* content and create final tests for their students.
- **Administrators** can register teachers, modify users, subscriptions and courses.

## Quickstart
This project consists of 4 layers: **API Layer**, **Controller Layer**, **Service Layer** and **Data Access Layer (DAL)**.

- `src/routes` - Express endpoints for handling HTTP requests
- `src/controllers` - Managers of services that communicate with the Service Layer to perform business logic
- `src/services` - Internal "services" containing business logic that communicates with Data Access Layer (DAL)
- `src/models` - Sequelize based models (DAL)
- `src/db` - Sequelize database connection setup
- `src/middleware` - Middleware functions (API key/JWT verification, default error handling etc.)
- `src/libs` - Common libraries and utilities
- `src/schemas` - Validation schemas

## Prerequisites
Before proceeding with installation, make sure that you have created the `academia` MySQL database locally.

## Running locally
Use the Node.js package manager [npm](https://www.npmjs.com/package/npm) to install Academia API dependencies.
```sh
npm install

cp .env.example .env
# fill .env with keys etc.

npm run dev
```

## License
[MIT](https://choosealicense.com/licenses/mit/)
