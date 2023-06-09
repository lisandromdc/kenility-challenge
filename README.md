# Kenility Node/Express/TS/Docker challenge

### Requirements

A new company needs to address these requirements:

- Create a Node API with Typescript.
- Connect the Node API to MongoDB using mongoose (desirable models in typescript).
- We need to develop three endpoints behind a basic authentication (username and password).
- Create a user with name, last name, address, and profile picture (this should be a file).
- Retrieve users.
- Update user.
- Star point: Dockerize MongoDB and the Node API
  Requirements are described on _intructions.txt_

## Run container

- Start Docker Desktop
- Open CMD
- Run the next command

```console
	cd .\api
	npm run docker
```

This will automatically create and seed the database. The seed is extrongly needed, because the user authentication is needed to access any endpoint.
On local development it'll be reactive to file updates using nodemon on Docker.

## Testing

All endpoints test are made using VsCode extension: ThunderClient.
To use them you should install this extension, and import the files located on the _thunder-tests_ folder.
All endpoints have authentication validation.

- connect to /auth/login endpoint to get the session token.
- copy the obtained token.
- connect to any other endpoint sending the token as a header using the next format: "authorization": "Bearer <your_token>"

Alternatively you can create you own connections to all the endpoints listed above:
server = localhost:4000

- POST {{server}}/auth/login - (not auth required)
- GET {{server}}/users/ - (auth required)
- POST {{server}}/users/ - (auth required)
- PUT {{server}}/users/:id - (auth required)
- GET {{server}}/users/:id - (auth required)
  auth requires the next as header: "authorization": "Bearer <your_token>"

## Deploy

- Set .env file with the right information.
- Run the next command

```console
	cd .\api
	npm run docker
```
