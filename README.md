# doorsteps-project
Doorsteps Project (Node-ExpressJs-MongoDB FullStack Application)


This project have backend and frontend both.

### Step 1 – Clone this project to www or htdocs folder


git clone https://github.com/Vandy1104/doorsteps-project.git


### Step 2 – Install packages

npm i (for both backend and frontend)


### Step 3 – Mongodb

*You should have a mongodb account. The URI connection string needs username, password and cluster name with attached id. If not, create an account and get the uri string from https://www.mongodb.com/*

Copy the config-copy.json file (for both frontend and backend folder) and rename it to config.json. add your Mongo_user, Mongo_password and clustername with its id for backend config.json and SERVER_URL and SERVER_PORT for frontend config.json.

You can use following credentials. (Can read/write test-> users collection only)

"MONGO_USER" : "doorsteps",
"MONGO_PASSWORD" : "doorsteps",
"MONGO_CLUSTER_NAME" : "cluster0.bddqi"

### Step 4 - Run the project

*You should have installed nodemon globally. if not run **npm install nodemon -g***

###### use the legacy version in vagrant set up
nodemon -L index.js


###### use this in non-vagrant set up
nodemon index.js


### Step 5 - To see the home page

http://localhost:8888/futurecomputer/frontend/index.html

or use ip in the place of localhost (Port can vary as per the OS)

You can also check endpoints using Postman.


### Step 6 - Endpoints

**Endpoints**       | **Description**             |**Acceptable values**| **Method**|
--------------------|-----------------------------|---------------------|-----------|
|/property-report | view all users' detail      |                     | GET       |
|/addUser         | add users' details in db    |                     | POST      |


On User input form radio buttons input working great with backend (Can try using postman), 
For frontend I'm still trying to store radio buttons' value in DB, will get it done very soon.

### Step 7 - Mongodb

To see data being saved,  click on cluster->collections->test->users respectively
or
click on Admin-> Report button on home page.



Good Luck!
