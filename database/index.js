const mongoose = require('mongoose');

const url = 'mongodb://localhost/cleanthisup';
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const db = mongoose.connection;

db.once('open', _ => {
  console.log('Database connected! ', url);
});

let staffSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true
  },
  name: String,
  role: String
});

const Staff = mongoose.model('Staff', staffSchema);

let taskSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true
  },
  title: String,
  description: String
});

const Task = mongoose.model('Task', taskSchema);

const addStaffMember = (staffMemberData, callback) => {
  const {id, name, role} = staffMemberData;
  Staff.create({id, name, role})
    .then(() => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
};

const getAllStaff = (callback) => {
  Staff.find({})
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err);
    });
};

const addTask = (taskData, callback) => {
  const {id, title, description} = taskData;
  Task.create({id, title, description})
    .then(() => {
      callback(null);
    })
    .catch((err) => {
      callback(err);
    });
};

const getAllTasks = (callback) => {
  Task.find({})
    .then((results) => {
      callback(null, results);
    })
    .catch((err) => {
      callback(err);
    });
};

module.exports = {
  addStaffMember,
  getAllStaff,
  addTask,
  getAllTasks
};
