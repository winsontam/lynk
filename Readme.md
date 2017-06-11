# Setup
Make sure run:
```bash
npm install
```
##### With Docker:
Please install docker and docker compose.
https://docs.docker.com/compose/install/

And then run:
```bash
docker-compose up
```

##### Without Docker:
Or, if you want to run without docker.
Please change the mongodb settings in "./config/default.js"
Then run:
```bash
npm run seed
```
```bash
npm run start
```

# App Location
http://localhost:8000/

# API Endpoints
##### Question 1: Project Coding
POST http://localhost:3000/auth/signup

| Name | Value  |
| ------ | ------ |
| email | lynk@lynk.global |
| password | lynk1234 |


POST http://localhost:3000/auth/login

| Name | Value  |
| ------ | ------ |
| email | lynk@lynk.global |
| password | lynk1234 |

GET http://localhost:3000/project
With Authentication Header: Bearer {token}

GET http://localhost:3000/project/:id
With Authentication Header: Bearer {token}

##### Question 2: API Calling
GET http://localhost:3000/profile


## Connect to Docker Mongodb

| Name | Value |
| ------ | ------ |
| Host | localhost:27017 |
| Name | lynk |

## Test
##### With Docker:
Please start the docker for mongodb.
```bash
docker-compose up
```
And then run:
```bash
npm run test
```

##### Without Docker:
Or, if you want to run without docker.
Please change the mongodb settings in "./config/test.js"
Then run:
```bash
npm run test
```