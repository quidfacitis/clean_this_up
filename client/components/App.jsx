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
import Dashboard from './Dashboard.jsx';
import Tasks from './Tasks.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffFormOpen: false,
      staff: []
    }
    this.toggleStaffForm = this.toggleStaffForm.bind(this);
    this.addStaffMember = this.addStaffMember.bind(this);
  }

  componentDidMount() {
    axios.get('/staff')
      .then((results) => {
        this.setState({
          staff: results.data
        });
      });
  }

  toggleStaffForm(e) {
    const { staffFormOpen } = this.state;
    this.setState({
      staffFormOpen: !staffFormOpen
    });
  }

  addStaffMember(e, name, role) {
    e.preventDefault();
    const {staffFormOpen} = this.state;
    const id = new Date().valueOf();
    axios.post('/staff', {id, name, role})
    .then(() => {
      axios.get('/staff')
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
    const {staffFormOpen, staff} = this.state;
    return (
      <Router>
        <div className="app-container">
          <Sidebar />
          {staffFormOpen && <StaffForm toggleStaffForm={this.toggleStaffForm} addStaffMember={this.addStaffMember} />}
          <Switch>
            <Route path="/tasks">
              <Tasks />
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