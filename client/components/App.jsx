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
import MessageModal from './MessageModal.jsx';
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
      messageModalOpen: false,
      staff: [],
      tasks: [],
      assignments: [],
      selectedAssignment: null
    }
    this.toggleStaffForm = this.toggleStaffForm.bind(this);
    this.toggleTaskForm = this.toggleTaskForm.bind(this);
    this.toggleAssignmentForm = this.toggleAssignmentForm.bind(this);
    this.toggleMessageModal = this.toggleMessageModal.bind(this);
    this.addStaffMember = this.addStaffMember.bind(this);
    this.addTask = this.addTask.bind(this);
    this.addAssignment = this.addAssignment.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this);
    this.deleteStaff = this.deleteStaff.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  componentDidMount() {
    let staff;
    let tasks;
    axios.get('/api/staff')
      .then((results) => {
        staff = results.data;
        axios.get('/api/tasks')
          .then((res) => {
            tasks = res.data;
            axios.get('/api/assignments')
              .then((r) => {
                this.setState({
                  staff,
                  tasks,
                  assignments: r.data
                });
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

  toggleMessageModal(assignment) {
    const {messageModalOpen} = this.state;
    if (assignment.id !== undefined) {
      this.setState({
        messageModalOpen: !messageModalOpen,
        selectedAssignment: assignment
      });
    } else {
      this.setState({
        messageModalOpen: !messageModalOpen,
      });
    }
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

  addStaffMember(e, name, role, email) {
    e.preventDefault();
    const {staffFormOpen} = this.state;
    const id = new Date().valueOf();
    axios.post('/api/staff', {id, name, role, email})
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

  addAssignment(e, name, task, urgent, employee_id) {
    e.preventDefault();
    const {assignmentFormOpen} = this.state;
    const id = new Date().valueOf();
    axios.post('/api/assignments', {id, employee_id, name, task, urgent})
    .then(() => {
      axios.get('/api/assignments')
      .then((results) => {
        this.setState({
          assignments: results.data,
          assignmentFormOpen: !assignmentFormOpen
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteAssignment(id) {
    axios.delete(`/api/assignments/${id}`)
      .then(() => {
        axios.get('/api/assignments')
          .then((results) => {
            this.setState({
              assignments: results.data,
            });
          });
      })
      .catch((err) => {
        console.log('Unable to delete assignment. Error message: ', err);
      });
  }

  deleteStaff(id) {
    axios.delete(`/api/staff/${id}`)
      .then(() => {
        axios.get('/api/staff')
          .then((results) => {
            this.setState({
              staff: results.data,
            });
          });
      })
      .catch((err) => {
        console.log('Unable to delete staff member. Error message: ', err);
      });
  }

  deleteTask(id) {
    axios.delete(`/api/tasks/${id}`)
      .then(() => {
        axios.get('/api/tasks')
          .then((results) => {
            this.setState({
              tasks: results.data,
            });
          });
      })
      .catch((err) => {
        console.log('Unable to delete task. Error message: ', err);
      });
  }

  render() {
    const {
      staffFormOpen,
      taskFormOpen,
      assignmentFormOpen,
      messageModalOpen,
      staff,
      tasks,
      assignments,
      selectedAssignment
    } = this.state;

    return (
      <Router>
        <div className="app-container">
          <Sidebar />
          {staffFormOpen && <StaffForm toggleStaffForm={this.toggleStaffForm} addStaffMember={this.addStaffMember} />}
          {taskFormOpen && <TaskForm toggleTaskForm={this.toggleTaskForm} addTask={this.addTask} />}
          {assignmentFormOpen && <AssignmentForm toggleAssignmentForm={this.toggleAssignmentForm} addAssignment={this.addAssignment} staff={staff} tasks={tasks} />}
          {messageModalOpen && <MessageModal toggleMessageModal={this.toggleMessageModal} selectedAssignment={selectedAssignment} /> }
          <Switch>
            <Route path="/tasks">
              <Tasks toggleTaskForm={this.toggleTaskForm} tasks={tasks} deleteTask={this.deleteTask} />
            </Route>
            <Route path="/staff">
              <Staff toggleStaffForm={this.toggleStaffForm} staff={staff} deleteStaff={this.deleteStaff} />
            </Route>
            <Route exact path="/">
              <Assignments assignments={assignments} toggleAssignmentForm={this.toggleAssignmentForm} toggleMessageModal={this.toggleMessageModal} deleteAssignment={this.deleteAssignment} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
};

export default App;
