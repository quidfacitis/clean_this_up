const express = require('express');
const path = require('path');
const {addStaffMember, getAllStaff} = require('./database/index');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.post('/staff', (req, res) => {
  addStaffMember(req.body, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.get('/staff', (req, res) => {
  getAllStaff((err, results) => {
    if (err !== null) {
      res.sendStatus(404);
    } else {
      res.send(results);
    }
  });
});

app.listen(3000, () => {
  console.log('Server up on port 3000');
});