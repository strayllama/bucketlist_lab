const express = require ('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/public'));

const MongoClient = require('mongodb').MongoClient;
// const ObjectID = require('mongodb').ObjectID;

MongoClient.connect('mongodb://localhost:27017', function( err, connectionToClient) {
  if (err) {
    console.error();
    return;
  };

  const db = connectionToClient.db('bucketlist_app_db')
  console.log('Connected to DB :D');
  const bucketlistCollection = db.collection('bucketlist_collection');

  server.post('/api/blist', function (req, res) {
    const newBlistItem = req.body;
    bucketlistCollection.save(newBlistItem, function (err, result) {
      if (err) {
        console.error(err);
        response.status(500);
        response.send();
        return;
      };
      console.log('Saved new object to DB!');
      res.status(201);
      res.json(result.ops[0]);
    });
  });

  server.get('/api/blist', function (req, res) {
    bucketlistCollection.find().toArray( function (err, result) {
      if (err) {
        console.error(err);
        response.status(500);
        response.send();
        return;
      };
      console.log('INDEX ALL - Returning from DB');
      res.json(result);
    });
  });

  server.listen(3000, function () {
    console.log('Listening on port 3000');
  });

}); //// end MongoClient
