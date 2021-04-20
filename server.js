const express = require('express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.listen(3000, () => {
  console.log('Server up on port 3000');
});