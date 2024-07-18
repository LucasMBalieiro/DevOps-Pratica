let express = require('express');
let path = require('path');
let fs = require('fs');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let app = express();

const DB_USER = process.env.MONGO_USERNAME
const DB_SENHA = process.env.MONGO_SENHA


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

let mongoUrlDockerCompose = `mongodb://${DB_USER}:${DB_SENHA}@mongodb`;


let mongoClient = { useNewUrlParser: true, useUnifiedTopology: true };


let database = "devopsDB";
let collection = "devopsCol";

app.get('/fetch-data', function (req, res) {
  let resposta = {};
  MongoClient.connect(mongoUrlDockerCompose, mongoClient, function (erro, client) {
    if (erro) throw erro;

    let db = client.db(database);

    let queryComplexa = { id: 1 };

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

