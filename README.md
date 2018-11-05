# ChatChallenge

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.5.

## How to use

### Development enviroment

#### Installation

Download and install [Node.js](https://nodejs.org/en/download/)

Run `npm install -g @angular/cli` to install Angular CLI globally if you don't have it installed yet.

Navigate to the project folder and run `npm install` to install all dependencies.

#### Configuration

At `/src/server/`, create a .env file for your enviroment variables. Look at .env.example

#### Execution

In the project root directory run `npm start` to start the server.

Then run `ng serve` for run the angular dev server. Use the `--port <PORT>` flag to select the port. Default port is 4200.

Open your browser and navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Production enviroment

#### Installation and build

Download and install [Node.js](https://nodejs.org/en/download/)

Run `npm install -g @angular/cli` to install Angular CLI globally if you don't have it installed yet.

Navigate to the project folder and run `npm install` to install all dependencies.

#### Configuration

At `/src/server/`, create a .env file for your enviroment variables. Look at .env.example

#### Build

In the project root directory run `ng build --configuration=local` to set the local production environment.

#### Execution

In the project root directory run `npm start` to start the server.

Open your browser and navigate to `http://localhost:3000/`.