# Deployment
Here we set up an nginx serving as an webserver for the web app an reverse proxy for relative and secure path to couchDB.
For BLE for the browser we need a secure connection.




## Get started
1. ./copy-frontend.cmd
2. docker-compose.exe down && docker-compose up --build
4. set Up couchDB: Basic Auth is missing here
    curl -X PUT http://localhost/db/_users
    curl -X PUT http://localhost/db/_replicator
    curl -X PUT http://localhost/db/honigraeume
    
## Hints
You may alter password of couchDB.
You may change certificates...