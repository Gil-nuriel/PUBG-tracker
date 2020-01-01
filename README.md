# PUBG-tracker
Player unknown's battle ground tracker - track every active player's stats

## get the api key
to use this app you have to get an api key. this will let you authenticate to pubg server.
to get the key go to `https://developer.pubg.com` , register, get an api key and copy it to `config.env`. now you should be all set.

## dependencies
`axios`
`concurrently`
`node-fetch`
`cors`
`nodemon`
`express`
`react-router-dom`
`dotenv`

## Available Scripts (from root directory)
**use npm i in both the client and root directory to intall all the dependecies**

### `npm install`
install all the dependencies to run this project

### `npm start` 
defualt run of the server without save changing 

### `npm server`
run the api server and can modify and save it 
The page will reload if you make edits
You will also see any lint errors in the console.

### `npm run dev`
launch both the react and express using concurrently
this will let you explore the full app and make changes online
