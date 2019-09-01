# Deployment
Here we set up an nginx serving as an webserver for the web app an reverse proxy for relative and secure path to couchDB.
For BLE for the browser we need a secure connection.
For PWA a not self signed certificate is need. For the sake of simplicy the deployment of the PWA will be somewhere else and CORS is enabled.




## Get started
For Windows:
1. ./copy-frontend.cmd
2. docker-compose.exe down && docker-compose up --build
3. set Up couchDB: Basic Auth is missing here
    curl -X PUT http://localhost/db/_users
    curl -X PUT http://localhost/db/_replicator
    curl -X PUT http://localhost/db/honigraeume
4. set Up MapReduce algorithm in couchDB. See ../CouchDB

For Linux:
1. (cd ../frontend/ && npm run build:prod) && ./copy-frontend && docker-compose down && docker-compose up --build -d
2. go to 3. in Windows Set Up
    
## Hints
You may alter password of couchDB.
You may change certificates...
