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

let assignmentSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true,
    index: true
  },
  employee_id: {
    type: Number,
    index: true
  },
  name: String,
  task: String,
  urgent: Boolean,
  messages: {
    type: Array,
    default: []
  }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

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

const addAssignment = (assignmentData, callback) => {
  // check if POST is for new message
  if (assignmentData.message_id !== undefined) {
    const {id, message_id, admin, content} = assignmentData;
    Assignment.find({id})
    .then((results) => {
      const messages = results[0].messages;
      messages.push({message_id, admin, content});
      Assignment.findOneAndUpdate({id}, {messages})
        .then(() => {
          callback(null);
        });
    })
    .catch((err) => {
      callback(err);
    });
  // if not for new message, create new Assignment
  } else {
    const {id, employee_id, name, task, urgent} = assignmentData;
    Assignment.create({id, employee_id, name, task, urgent})
      .then(() => {
        callback(null);
      })
      .catch((err) => {
        callback(err);
      });
  }
};

const getAllAssignments = (callback) => {
  Assignment.find({})
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
  getAllTasks,
  addAssignment,
  getAllAssignments
};
