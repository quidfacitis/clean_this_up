const express = require('express');
const path = require('path');
const {
  addStaffMember,
  getAllStaff,
  addTask,
  getAllTasks,
  addAssignment,
  getAllAssignments,
  getOneAssignment
} = require('./database/index');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.post('/api/staff', (req, res) => {
  addStaffMember(req.body, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.get('/api/staff', (req, res) => {
  getAllStaff((err, results) => {
    if (err !== null) {
      res.sendStatus(404);
    } else {
      res.send(results);
    }
  });
});

app.post('/api/tasks', (req, res) => {
  addTask(req.body, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.get('/api/tasks', (req, res) => {
  getAllTasks((err, results) => {
    if (err !== null) {
      res.sendStatus(404);
    } else {
      res.send(results);
    }
  });
});

app.post('/api/assignments', (req,res) => {
  addAssignment(req.body, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.sendStatus(201);
    }
  });
});

app.get('/api/assignments', (req, res) => {
  getAllAssignments((err, results) => {
    if (err !== null) {
      res.sendStatus(404);
    } else {
      res.send(results);
    }
  });
});

app.get('/api/assignments/:id', (req, res) => {
  getOneAssignment(req.params.id, (err, results) => {
    if (err !== null) {
      res.sendStatus(404);
    } else {
      res.send(results);
    }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server up on port 3000');
});