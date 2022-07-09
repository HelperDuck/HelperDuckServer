# HelperDuck Server

The backend server for helperDuck.com, the place to find your talking helper duck.

### Functions:

- Connection to the SQL database (connected through Prisma as ORM)
- Connect the helpRequester and the helpGiver through socket.io

### Created by:

- Fernanda Rodrigues - github.com/fegananca
- Siebe Kylstra - github.com/siebe88
- Mauricio Scain - github.com/scainMauricio
- Noel Vieira - github.com/noelcv

Codeworks seniors Barcelona - thesis project July 2022

### Setup

1. Make sure you have a Postgres server available (either local or in the cloud)
2. Setup your Stripe account
3. Copy the example.env file and rename it to .env and replace it with your keys.
4. Install the necessary packages - npm i
5. Make a build (also seeds the db) - npm run build

## Other NPM command

In the project directory you can run:

### test

Runs the tests once, mainly to test everything for pull-requests

### test-dev

Runs the tests continuously to make sure that nothing breaks during development

### build

Builds both the TypeScript project and rebuilds the SQL database (and reseeds)

### start

Starts up the server from the build server (created by running the build command)
And runs the server on localhost:3002

### start-dev

Starts the server without the build, running it through ts-nodemon

### build-server

Builds the TypeScript project in JavaScript files.

### build-db

Rebuilds the SQL database with all the changes that are made in the prisma folder.

### build-db-dev

Creates migration scripts to transform the SQL database into its latest version
(as defined in the Prisma folder).

### edit-db

Opens up Prisma Studio through which you can see and manipulate the data.

##

## API Endpoints

You can import the JSON file: ./Documentation/HelperDuck.postman_collection.json into postman for all the API endpoints.
