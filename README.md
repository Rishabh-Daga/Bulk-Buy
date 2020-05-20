# Bulk Purchase WebApp using MERN stack

## About the App
The app simulates an e-commmerce platform where the vendors only ship their products in bulk. So, the customers have to wait until a bulk order for an item is places but they get the item at cheaper prices.

## Setup

#### Node

For Linux:

```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

For Mac:

```
brew install node
```

#### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).

#### React

```
npm install -g create-react-app
```

To create a new React app:

```
create-react-app name_of_app
```

To run the app, cd into the directory and do:

```
npm start
```

## Running the Assignment

Run Mongo daemon:

```
sudo mongod
```

Mongo will be running on port 27017.  
<br />

To create a database:

```
mongo
```
This will open the mongo shell. Type in ```use users``` to create a new database called users.  
<br />

Run Express:

```
cd backend/
npm install
npm start
```
<br />

Run React:

```
cd frontend
npm install/
npm start
```

Navigate to localhost:3000/ in your browser.
