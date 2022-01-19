const express = require("express");
const shortid = require('shortid');
const lowdb = require('lowdb');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const FileSync = require('lowdb/adapters/FileSync');

//env TEST면 테스트 DB 파일로 연결
const adapter = new FileSync('db.json');
const db = lowdb(adapter);

app.db = db;

db.defaults({ users: [] }).write();

app.get('/users', async function(req, res) {
  res.send(db.get('users').value());
});

app.get('/users/:id', async function(req, res) {
  const user = db.get('users').find({ id: req.params.id }).value();
  if (!user) res.status(404).send("Not found");
  else res.send(user);
});

app.post('/users', async function(req, res) {
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

module.exports = app;