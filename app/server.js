let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

const DB_USER = admin
const DB_PASS = senha

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

let mongoUrlDockerCompose = `mongodb://${DB_USER}:${DB_PASS}@mongodb`;


let mongoClient = { useNewUrlParser: true, useUnifiedTopology: true };


let database = "my-db";
let collection = "my-collection";

app.get('/fetch-data', function (req, res) {
  let resposta = {};
  MongoClient.connect(mongoUrlDockerCompose, mongoClient, function (erro, client) {
    if (erro) throw erro;

    let db = client.db(database);

    let queryComplexa = { myid: 1 };

    db.collection(collection).findOne(queryComplexa, function (err, result) {
      if (err) throw err;
      resposta = result;
      client.close();

      
      res.send(resposta ? resposta : {});
    });
  });
});

app.listen(3000, function () {
  console.log("listen port: 3000");
});

