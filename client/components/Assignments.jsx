import React, {Component} from 'react';
import {Icon, InlineIcon} from '@iconify/react';
import plusSquareFill from '@iconify/icons-bi/plus-square-fill';
// import alertUrgent16Filled from '@iconify-icons/fluent/alert-urgent-16-filled';
import exclamationIcon from '@iconify/icons-fa-solid/exclamation';
import AssignmentItem from './AssignmentItem.jsx';
import Switch from 'react-switch';
import axios from 'axios';

class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      assignments: [],
    }
    this.toggleSwitch = this.toggleSwitch.bind(this);
    this.fetchAssignments = this.fetchAssignments.bind(this);
    this.deleteAssignment = this.deleteAssignment.bind(this);
  }

  componentDidMount() {
    this.fetchAssignments();
    this.interval = setInterval(this.fetchAssignments, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchAssignments() {
    axios.get('/api/assignments')
      .then((results) => {
        this.setState({
          assignments: results.data
        });
      })
      .catch((err) => {
        console.log('Unable to fetch assignments. Error: ', err);
      });
  }

  toggleSwitch() {
    const {checked} = this.state;
    this.setState({
      checked: !checked
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

  render() {
    let {toggleAssignmentForm, toggleMessageModal} = this.props;
    let {checked, assignments} = this.state;

    if (checked) {
      assignments = assignments.filter((a) => a.urgent === true);
    }

    let keyCount = 0;
    const assignmentItems = assignments.map(a => <AssignmentItem key={keyCount++} assignment={a} toggleMessageModal={toggleMessageModal} deleteAssignment={this.deleteAssignment} />);

    return (
      <div className="staff-container">
        <div className="assignment-navbar">
          <h2 className="staff-title">Assignments</h2>
          <label className="urgent-switch-container">
            <div className="urgent-switch-msg">Only "<span className="urgent-switch-icon"><InlineIcon icon={exclamationIcon} width="0.5em" color="#737078" /></span>"</div>
            <Switch onChange={this.toggleSwitch} checked={checked} onColor="#4cac84" offColor="#737078"/>
          </label>
        </div>
        <div className="staff-member-container">
          <span className="staff-new-member-btn" onClick={toggleAssignmentForm}><Icon icon={plusSquareFill} color="#4cac84" width="4em"/></span>
          {assignmentItems}
        </div>
      </div>
    );
  }
}

export default Assignments;