import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import Staff from './Staff.jsx';
import Sidebar from './Sidebar.jsx';
import StaffForm from './StaffForm.jsx';
import TaskForm from './TaskForm.jsx';
import AssignmentForm from './AssignmentForm.jsx';
import Assignments from './Assignments.jsx';
import Tasks from './Tasks.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffFormOpen: false,
      taskFormOpen: false,
      assignmentFormOpen: false,
      staff: [],
      tasks: [],
      assignments: []
    }
    this.toggleStaffForm = this.toggleStaffForm.bind(this);
    this.toggleTaskForm = this.toggleTaskForm.bind(this);
    this.toggleAssignmentForm = this.toggleAssignmentForm.bind(this);
    this.addStaffMember = this.addStaffMember.bind(this);
    this.addTask = this.addTask.bind(this);
    this.addAssignment = this.addAssignment.bind(this);
  }

  componentDidMount() {
    let staff;
    axios.get('/api/staff')
      .then((results) => {
        staff = results.data;
        axios.get('/api/tasks')
          .then((res) => {
            this.setState({
              staff,
              tasks: res.data,
            });
          });
      })
      .catch((err) => {
        console.log('Unable to load staff and task data. Error message: ', err);
      });
  }

  toggleStaffForm() {
    const {staffFormOpen} = this.state;
    this.setState({
      staffFormOpen: !staffFormOpen
    });
  }

  toggleTaskForm() {
    const {taskFormOpen} = this.state;
    this.setState({
      taskFormOpen: !taskFormOpen
    });
  }

  toggleAssignmentForm() {
    const {assignmentFormOpen} = this.state;
    this.setState({
      assignmentFormOpen: !assignmentFormOpen
    });
  }

  addTask(e, title, description) {
    e.preventDefault();
    const {taskFormOpen} = this.state;
    const id = new Date().valueOf();
    axios.post('/api/tasks', {id, title, description})
    .then(() => {
      axios.get('/api/tasks')
      .then((results) => {
        this.setState({
          tasks: results.data,
          taskFormOpen: !taskFormOpen
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addStaffMember(e, name, role) {
    e.preventDefault();
    const {staffFormOpen} = this.state;
    const id = new Date().valueOf();
    axios.post('/api/staff', {id, name, role})
    .then(() => {
      axios.get('/api/staff')
      .then((results) => {
        this.setState({
          staff: results.data,
          staffFormOpen: !staffFormOpen
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  addAssignment(e, name, task, urgent) {
    console.log('ADD ASSIGNMENT!');
  }

  render() {
    const {staffFormOpen, taskFormOpen, assignmentFormOpen, staff, tasks, assignments} = this.state;
    return (
      <Router>
        <div className="app-container">
          <Sidebar />
          {staffFormOpen && <StaffForm toggleStaffForm={this.toggleStaffForm} addStaffMember={this.addStaffMember} />}
          {taskFormOpen && <TaskForm toggleTaskForm={this.toggleTaskForm} addTask={this.addTask} />}
          {assignmentFormOpen && <AssignmentForm toggleAssignmentForm={this.toggleAssignmentForm} addAssignment={this.addAssignment} staff={staff} tasks={tasks} />}
          <Switch>
            <Route path="/tasks">
              <Tasks toggleTaskForm={this.toggleTaskForm} tasks={tasks} />
            </Route>
            <Route path="/staff">
              <Staff toggleStaffForm={this.toggleStaffForm} staff={staff} />
            </Route>
            <Route exact path="/">
              <Assignments assignments={assignments} toggleAssignmentForm={this.toggleAssignmentForm} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;