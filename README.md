# todo_app_gist
A MERN stack todo application with feature to upload todo as a secret gist

Download the github code using the cmd "git clone https://github.com/naikvaibhav/todo_app_gist.git"\
This will get the backend folder, frontend folder and a README.md into your system

## The project is divided into two folders
1. backend          2. frontend

## 1. backend
i) The backend of the project is built using Node.js and express.\
ii) To run the backend code need to install the dependency package. To install the dependency packages go to the todo_app_gist folder which is created after cloning the github and then traverse to the backend folder. Type the cmd "npm install"\ 
Example: todo_app_gist/backend$ npm install\
iii) This will install all the packages and a node_modules folder will be created inside the backend folder.\
iv) .env file has to be created inside the backend folder. the file has to be created with the name as '.env' inside the backend folder.\
v) the .env file should have the following variables with respective values:\

## example of the values
PORT = 3001  //since the react app runs on port number 3000 by default,  a different port number has to be specified for the nodejs app
CLIENT_ID = github client id credential
CLIENT_SECRET = github client secret credential
MONGODB_ATLAS_USERNAME = mongodb atlas user name
MONGODB_ATLAS__PASSWORD = mongodb atlas password\
secretKey = abcdefghtvnfknfkn\

vi) The database used for the backend is MongoDB. I have used mongodb atlas to store the data but if you want to install mongodb on your local system, then mongodb needs to be installed and the mongodb server has to be in the running state so that the backend can store the data.\
Vii) all the configuration for the backend is present inside the appConfig.js file which is present inside the config folder. The api version, the url of the mongodb atlas being used, port number for the nodejs app is all specified within this file.\
Viii) All the other major functionalities are present inside the 'src' folder. The 'src' folder consist of the routes, controllers, models, middlewares and libraries.\
ix) The entry point for running the nodejs app is server.js. Running the cmd "node server.js" will start the nodejs app\
the output got on the terminal after executing this is\

vaibhav@pop-os:~/Reactjs_Projects/todo_app_gist/backend$ node server.js{
  port: '3001',
  allowedCorsOrigin: '*',
  environment: 'dev',
  db: {
    uri: 'mongodb atls uri'
  },
  apiVersion: '/api/v1'
}
{"level":30,"time":1613414485610,"pid":50603,"hostname":"pop-os","timestamp":"2021-02-15T18:41:25.609Z","message":"server listening on port: 3001","origin":"serverOnListeningHandler","level":10}
database connection open success
{"level":30,"time":1613414487328,"pid":50603,"hostname":"pop-os","timestamp":"2021-02-15T18:41:27.328Z","message":"database connection open","origin":"database connection open handler","level":10}
(node:50603) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.\

x) This output signifies that everything is running perfectly at the backend level


## 2. frontend
i) i) The frontend of the project is built using React.js.\
ii) To run the frontend code need to install the dependency package. To install the dependency packages go to the todo_app_gist folder which is created after cloning the github and then traverse to the frontend folder. Type the cmd "npm install"\ 
Example: todo_app_gist/frontend$ npm install\
iii) This will install all the packages and a node_modules folder will be created inside the frontend folder.\
iv) .env file has to be created inside the frontend folder. the file has to be created with the name as '.env' inside the frontend folder.\
v) the .env file should have the following variables with respective values:\


## example of the values

i) .env file has to be created inside the frontend folder. The path has to be frontend/.env\
ii) the .env file should have two variables REACT_APP_CLIENT_ID and REACT_APP_ENV\
iii) Open terminal and traverse to path where the todo_app_gist folder is present. --> Go to the frontend folder (todo_app_gist/frontend)\
iv) Run the react app using the cmd "npm start"



