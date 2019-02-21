# Get started
1. ./copy-frontend.cmd
2. docker-compose.exe down && docker-compose up --build
4. set Up couchDB: Basic Auth is missing here
    curl -X PUT http://localhost/db/_users
    curl -X PUT http://localhost/db/_replicator
    curl -X PUT http://localhost/db/honigraeume
    
# Hints
You may alter password of couchDB