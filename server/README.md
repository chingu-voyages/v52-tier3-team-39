# Rayvolution

Server application built with Node.js

## Major Dependencies

- Express
- Mongoose
- Joi

## Getting Started

#### Get set up with Mongo

- Create user/password in RayVolution cluster
- Whitelist your IP address
- Copy connection string
  - Recommended: install MongoDB Compass, connect to cluster using connection string
- Create your test database

#### Add .env file in root folder:

```
PORT=4000
DATABASE_CONNECTION_STRING=<your-mongodb-connection-string-here>
MY_TEST_DB=<your-test-db-name>
```

#### Run the development server:

```bash
npm run start:dev
# or
yarn start:dev
# or
pnpm start:dev
# or
bun start:dev
```

Note: Auto-reloads the server after each saved change using the experimental Node `--watch` flag, instead of `nodemon`

#### Test server in browser

Navigate to `http://localhost:4000`. The following should be displayed in your browser:

```
{"message":"Hello team Radiant Minds"}
```

## Routes

### General

#### Test server

```
GET base_url
```

Response object

```
{ message }
```

#### Test database

```
GET base_url + '/database-health'
```

Response object

```
{ status }
```

### Form

#### Create new appointment request

```
POST base_url + '/form'

Request object:

{ name, email, phone, address, earlyTimeHour, lateTimeHour }
```

Validation

- `name`: Required. String.
- `email`: Required. Must be a valid email.
- `phone`: Required. Must be a 10-character string consisting of valid digits 0-9.
- `address`: Required. Must be a valid Los Angeles address.
- `earlyTimeHour`: Required. Integer. Min: 9, max: 16.
- `lateTimeHour`: Required. Integer: Min: 10, max: 17.

Behavior: A new row is added to the `forms` collection with default "Pending" status.

Response object

```
{ message }
```
