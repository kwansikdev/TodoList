const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json

let todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];
todos.sort((todo1, todo2) => todo2.id - todo1.id);

//
app.get('/', (req, res) => {
  res.send("hello");
});

app.get('/todos', (req, res) => {
  res.send(todos);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});