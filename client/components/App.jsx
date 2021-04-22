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
import Dashboard from './Dashboard.jsx';
import Tasks from './Tasks.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffFormOpen: false,
      taskFormOpen: false,
      staff: [],
      tasks: []
    }
    this.toggleStaffForm = this.toggleStaffForm.bind(this);
    this.toggleTaskForm = this.toggleTaskForm.bind(this);
    this.addStaffMember = this.addStaffMember.bind(this);
    this.addTask = this.addTask.bind(this);
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

  toggleStaffForm(e) {
    const { staffFormOpen } = this.state;
    this.setState({
      staffFormOpen: !staffFormOpen
    });
  }

  toggleTaskForm(e) {
    const { taskFormOpen } = this.state;
    this.setState({
      taskFormOpen: !taskFormOpen
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

  render() {
    const {staffFormOpen, taskFormOpen, staff, tasks} = this.state;
    return (
      <Router>
        <div className="app-container">
          <Sidebar />
          {staffFormOpen && <StaffForm toggleStaffForm={this.toggleStaffForm} addStaffMember={this.addStaffMember} />}
          {taskFormOpen && <TaskForm toggleTaskForm={this.toggleTaskForm} addTask={this.addTask} />}
          <Switch>
            <Route path="/tasks">
              <Tasks toggleTaskForm={this.toggleTaskForm} tasks={tasks} />
            </Route>
            <Route path="/staff">
              <Staff toggleStaffForm={this.toggleStaffForm} staff={staff} />
            </Route>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;