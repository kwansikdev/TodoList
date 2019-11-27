const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});