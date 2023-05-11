[Back-To-README](/README.md)

# Server
The server uses Deno instead of node.js due to Deno's native TypeScript support and simple module system. As Deno is inherently similar to Node it can be migrated with ease if needed but should serve as a long-term solution as Deno is continually improved for its goal of mostly replacing Node.


## Main
The main TypeScript file contains the API routes for the express server and uses functions in `database.ts` to communicate with the database. Currently this is all the server does but has room to expand.

## Database
This file creates a database if it does not already exist and exports some basic functions to allow for easy interaction with the database, such as updating a user with data or fetching the data of a user. Through the use of shared types in the `common/@types` it helps ensure that only correct data is given to the API.

## SQLite3
SQLite is used for the database which is a simple local DB. A future improvement would be migrating to a larger scale database but for ease of development sqlite3 was used as it can function without any additional installs (besides `npm i`) without the need for something like a docker container.

[Back-To-README](/README.md)