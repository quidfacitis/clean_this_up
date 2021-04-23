import React, {Component} from 'react';
import {Icon, InlineIcon} from '@iconify/react';
import plusSquareFill from '@iconify/icons-bi/plus-square-fill';
import alertUrgent16Filled from '@iconify-icons/fluent/alert-urgent-16-filled';
import AssignmentItem from './AssignmentItem.jsx';
import Switch from 'react-switch';

class Assignments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
    this.toggleSwitch = this.toggleSwitch.bind(this);
  }

  toggleSwitch() {
    const {checked} = this.state;
    this.setState({
      checked: !checked
    });
  }

  render() {
    let {assignments, toggleAssignmentForm, toggleMessageModal, deleteAssignment} = this.props;
    const {checked} = this.state;

    if (checked) {
      assignments = assignments.filter((a) => a.urgent === true);
    }

    let keyCount = 0;
    const assignmentItems = assignments.map(a => <AssignmentItem key={keyCount++} assignment={a} toggleMessageModal={toggleMessageModal} deleteAssignment={deleteAssignment} />);

    return (
      <div className="staff-container">
        <div className="assignment-navbar">
          <h2 className="staff-title">Assignments</h2>
          <label className="urgent-switch-container">
            <div className="urgent-switch-msg">Only<span className="urgent-switch-icon"><InlineIcon icon={alertUrgent16Filled} width="1.5em" color="#737078" /></span></div>
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