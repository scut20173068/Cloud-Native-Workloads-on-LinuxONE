# Node Todo App

A Node app built with MongoDB and Angular.

Node (expess.js) provides the RESTful API.
Angular.js provides the frontend and accesses the API
MongoDB stores the data

## Requirements
* Docker
* A running MongoDB instance

## To build and run
```
docker build . -t express-server
docker run --net=host express-server:latest
```

Note : --net=host makes all host ports to the containers ports. This is very insecure. Don't do this in production :)


## Debugging

You will see this message if you start this container without docker-compose. docker-compose links the containers networks so they're accessible to each other. It fills in the variables with the right connection info. To resolve, start this with docker-compose up in the mean-docker folder.

```
MongoError: failed to connect to server [database:27017] on first connect [MongoError: getaddrinfo ENOTFOUND database database:27017]
    at Pool.<anonymous> (/usr/src/node_modules/mongodb-core/lib/topologies/server.js:328:35)
    at emitOne (events.js:96:13)
    at Pool.emit (events.js:188:7)
    at Connection.<anonymous> (/usr/src/node_modules/mongodb-core/lib/connection/pool.js:280:12)
    at Connection.g (events.js:292:16)
    at emitTwo (events.js:106:13)
    at Connection.emit (events.js:191:7)
    at Socket.<anonymous> (/usr/src/node_modules/mongodb-core/lib/connection/connection.js:177:49)
    at Socket.g (events.js:292:16)
    at emitOne (events.js:96:13)
    at Socket.emit (events.js:188:7)
    at connectErrorNT (net.js:1021:8)
    at _combinedTickCallback (internal/process/next_tick.js:80:11)
    at process._tickCallback (internal/process/next_tick.js:104:9)
```

This error means you have a mongo instance from a previous run taking up the port. You may do a ```docker-compose down``` and then ```docker-compose up``` or ```docker kill [mongo container id from docker ps]```

```
Starting meandocker_database_1 ...
Starting meandocker_database_1 ... error

ERROR: for meandocker_database_1  Cannot start service database: driver failed programming external connectivity on endpoint meandocker_database_1 (93572e7c501c4acddc95740d079c60b199f2a554f
1fa56565e7a8e28fca686fe): Bind for 0.0.0.0:27017 failed: port is already allocated

ERROR: for database  Cannot start service database: driver failed programming external connectivity on endpoint meandocker_database_1 (93572e7c501c4acddc95740d079c60b199f2a554f1fa56565e7a8e
28fca686fe): Bind for 0.0.0.0:27017 failed: port is already allocated
ERROR: Encountered errors while bringing up the project.
```
