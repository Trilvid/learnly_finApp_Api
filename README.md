<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

# Project Setup Guide

This guide provides instructions for setting up a NestJS application with MongoDB as the database and Docker for containerization.

## Prerequisites

- [Node.js](https://nodejs.org) (v18.x or later)
- [MongoDB](https://www.mongodb.com/) (installed locally or through a cloud service like MongoDB Atlas)
- [Docker](https://www.docker.com/get-started)

## Step 1: Clone the Repository

```bash
git clone https://github.com/Trilvid/learnly_finApp_Api
cd <project-folder-of-choice >
```

## Step 2: Install Dependencies

```bash
npm install
```

## Step 3: Create a `.env` File

Create a `.env` file in the root directory of the project. Add the following environment variables:

```env
# MongoDB Connection
DB_URI=mongodb://localhost:27017/mydb

# JWT Secret
JWT_SECRET=myjwtsecret

# JWT EXPIRES IN
JWT_EXPIRES=3d

# MAILTRAP DETAILS
MAILTRAP_USER=username
MAILTRAP_PASS=password
```

Replace `mongodb://localhost:27017/mydb` with your actual MongoDB connection string.

## Step 4: Run the Application Locally

```bash
npm run start:dev
```

This will start the application in development mode with hot-reload enabled.

## Step 5: Build and Run the Application with Docker

If you have Docker installed, you can also build and run the application in a container.

### Build the Docker Image

```bash
docker build -t my-nest-app .
```

### Run the Docker Container

```bash
docker run -p 3000:3000 my-nest-app
```

The application will be available at `http://localhost:3000`.

## Step 6: Usage

- Open `http://localhost:3000` in your browser to access the API.
- Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to interact with the API endpoints.

## Step 7: Documentation

Here is a link to the application Documentation
https://api.postman.com/collections/30229598-3eb61793-388b-41f8-81de-7090f7f071e0?access_key=PMAT-01HQEF7060D6F9ANNRMMNYPR26

## step 8: HOw To Use Docker 

- `FROM node:16`: This line specifies that we want to base our image on the official Node.js 16 image from Docker Hub.

- `WORKDIR /usr/src/app`: This line sets the working directory inside the container to `/usr/src/app`. This is where we'll be copying our application files.

- `COPY package*.json ./`: This line copies our package.json and package-lock.json files into the container's working directory.

- `RUN npm install`: This line installs the dependencies listed in our package.json file.

- `COPY . .`: This line copies the rest of our application files into the container's working directory.

- `EXPOSE 3000`: This line tells Docker to expose port 3000 for our application to listen on.

- `CMD ["npm", "run", "start:prod"]`: This line specifies the command to run when the container starts. In this case, it runs our application in production mode.

This Dockerfile sets up our container to run our NestJS application by installing dependencies, copying files, and specifying the startup command.

## Conclusion

Congratulations! You have successfully set up and run a NestJS application with MongoDB using Docker for containerization. Feel free to explore and modify the project as needed for your requirements.






## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
