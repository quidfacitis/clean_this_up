import React, {Component} from 'react';
import {InlineIcon} from '@iconify/react';
import xIcon from '@iconify/icons-bi/x';

class StaffForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      role: '',
      email: '',
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.id === 'employee-name') {
      this.setState({
        name: e.target.value
      });
    } else if (e.target.id === 'employee-role') {
      this.setState({
        role: e.target.value
      });
    } else {
      this.setState({
        email: e.target.value
      });
    }
  }

  render() {
    const {toggleStaffForm, addStaffMember} = this.props;
    let {name, role, email} = this.state;
    return (
      <div className="form-overlay">
        <div className="form-container">
          <h2 className="staff-form-title">Add New Staff Member</h2>
          <form className="staff-form" onSubmit={(e) => addStaffMember(e, name, role, email)}>
            <label className="staff-form-label" htmlFor="employee-name">Full Name</label>
            <input className="staff-form-input" type="text" id="employee-name" onChange={this.onChange} value={name} required />
            <label className="staff-form-label" htmlFor="employee-role">Role</label>
            <input  className="staff-form-input" type="text" id="employee-role" onChange={this.onChange} value={role} required />
            <label className="staff-form-label" htmlFor="employee-email">Email</label>
            <input  className="staff-form-input" type="email" id="employee-email" onChange={this.onChange} value={email} required />
            <input className="staff-form-input" type="submit" value="Add" />
          </form>
          <span onClick={toggleStaffForm} className="staff-form-close"><InlineIcon icon={xIcon} width="2em" /></span>
        </div>
      </div>
    );
  }
}

export default StaffForm;