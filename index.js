const express = require("express");
const shortid = require('shortid');
const low = require('lowdb');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ users: [] }).write();

app.get('/users', async function(req, res) {
  res.send(db.get('users').value());
});

app.post('/users', async function(req, res) {
  console.log({ id: shortid, ...req.body });
  db.get('users').push({ id: shortid.generate(), ...req.body }).write();
  res.send(db.get('users').value());
});

app.put('/users/:id', async function(req, res) {
  db.get('users')
  .find({ id: req.params.id })
  .assign(req.body)
  .write()
  res.send(db.get('users').value());
});

app.delete('/users/:id', async function(req, res) {
  db.get('users')
  .remove({ id: req.params.id })
  .write()
  res.send(db.get('users').value());
});

app.listen(port, () => {
    console.log('Server is up on port ' + port);
});