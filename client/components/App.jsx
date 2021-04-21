import React, { Component } from 'react';
import Staff from './Staff.jsx';
import Sidebar from './Sidebar.jsx';
import StaffForm from './StaffForm.jsx';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffFormOpen: false
    }
    this.toggleStaffForm = this.toggleStaffForm.bind(this);
    this.addStaffMember = this.addStaffMember.bind(this);
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
      this.setState({
        staffFormOpen: !staffFormOpen
      });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  render() {
    const {staffFormOpen} = this.state;
    return (
      <div className="app-container">
        <Sidebar />
        <Staff toggleStaffForm={this.toggleStaffForm} />
        {staffFormOpen && <StaffForm toggleStaffForm={this.toggleStaffForm} addStaffMember={this.addStaffMember} />}
      </div>
    );
  }

};

export default App;