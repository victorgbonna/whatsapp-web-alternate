# Alternate Whatsapp API services
## About The Project
#### This is a NodeJS Whatsapp API developed from the [https://github.com/pedroslopez/whatsapp-web.js/](whatsapp-web js library). Users can login to their whatsapp and create a broadcast of contacts to send messages to. More features will be added still.

#### How It Works
You basically have access to basic whatsapp services. Outside of that, you can create a broadcast by uploading a csv file containing their contacts then send messages to the broadcast, specifying the broadcast name.
There are several events listeners provided by whatsapp web js library. I used a few for this project, which are:-

- Client.on qr - On logging in, gets the qr code. Event will not emit if you have been authenticated.
- Client.on authenticated - On logged in  
- Client.on ready - On already logged in
- Client.on auth_failure - On login failure
- Client.on disconnected - On logging out
- Client.on messages - On incoming message.

Still checkout the [https://github.com/pedroslopez/whatsapp-web.js/](library github repo) for more. 

#### Frameworks, tools and libraries used 

- Node Js - runtime environment
- Express - backend library
- Mongodb- DBMS
- Mongoose- ORM library for mongodb 
- Whatsapp-web-js- Whatsapp library 
- Multer- For uploading files from the request 
- Dotenv- putting all your environmental variables in a .env file

### Getting started 
#### To get a local copy up and running follow these simple example steps
#### Installation

- Clone the repo
- npm install
- Your config file are alright, given that they have default values. The only setback is that you have to create a mongo db collection
- There will not be a problem If you have mongo db atlas installed. A collection would be created automatically by default. You can create a collection online via the mongodb -  atlas [Web site](https://cloud.mongodb.com/) if you don't have it installed.

### Map 
###### This would entail every file adn folder and it's uses 
- Index.js - the main js page. It imports everything's then runs the app. 
- Config- The config, whatsapp, multer and db js inside the config are for configurations and secret variables like the port, mongoose connection, token functionalities.
- apiTest/routes.http - for testing the apis
- Middleware - containing the token passing, verifies if the user is an admin so as to give him the authorization to make api calls
- Modules folder- contain the model and service file for the user and class module each
- Modules folder/../service.js- holds all the functionalities that will be called from the api
- Modules folder/../model.js- handling the mongoose schema for the broadcast model
- Api routes /routes/api- this is where all the api endpoints are 
- tempStorage- stores automatically created files (.csv and .qr files specifically)

### API routes for authentication services.

#### http://localhost:40006/api/auth/getqr - get call to qr code  

#### http://localhost:40006/api/auth/status - get call to your whatsapp info, returns null if you are not authenticated.

### API routes for broadcast services.
#### http://localhost:40006/api/broadcast/create - post call to create a broadcast  
##### req should be like 
```javascript
{
  broadcastName (string),
  csvFile (this would be a req file, This holds the csv file. Make sure the columns are/contains "Name", "Contact")
}
```
#### http://localhost:40006/api/broadcast/create - post call to create a broadcast. Broadcast name is unique for a client 
##### req should be like 
```javascript
{
  broadcastName (string),
  csvFile (this would be a req file, This holds the csv file. Make sure the columns are/contains "Name", "Contact")
}
```
#### http://localhost:40006/api/broadcast/send/message - post call to send a message to all contacts in a broadcast. Must be authenticated
##### req should be like 
```javascript
{
  broadCastName(name of the broadcast when creating it),
  message,
  clientPhone (+234...)
}
```
#### http://localhost:40006/api/broadcast/getAll - get all broadcast
#### http://localhost:40006/api/broadcast/currentClient/get - get all broadcast by a client (must be authenticated).  
### Contact 
- Email- victorgbonna@gmail.com
- Whatsapp - +234 8102603301
- Linkedln - [https://www.linkedin.com/in/victor-ogbonna-5a3113230](https://www.linkedin.com/in/victor-ogbonna-5a3113230)
-  Project Link: [https://github.com/victorgbonna/whatsappauto](https://github.com/victorgbonna/whatsappauto)


