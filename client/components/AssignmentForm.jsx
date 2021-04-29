import React, {Component} from 'react';
import {InlineIcon} from '@iconify/react';
import xIcon from '@iconify/icons-bi/x';

class AssignmentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      employee_id: null,
      task: '',
      urgent: false,
      dueBy: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.id === 'employee-selector') {
      const employee_id = e.target.value;
      const index = e.nativeEvent.target.selectedIndex;
      const name = e.nativeEvent.target[index].text;
      this.setState({
        name,
        employee_id
      });
    } else if (e.target.id === 'task-selector') {
      this.setState({
        task: e.target.value
      });
    } else if (e.target.id === 'due-by') {
      this.setState({
        dueBy: e.target.value
      })
    } else if (e.target.id === 'urgent-radio-btn') {
      this.setState({
        urgent: true
      });
    } else {
      this.setState({
        urgent: false
      });
    }
  }

  render() {
    const {toggleAssignmentForm, addAssignment, staff, tasks} = this.props;
    let {name, employee_id, task, urgent, dueBy} = this.state;

    const employeeOptions = [];
    let keyCount = 0;
    staff.forEach((s) => {
      employeeOptions.push((
        <option key={keyCount++} value={s.id}>{s.name}</option>
      ));
    });

    keyCount = 0;
    const taskOptions = [];
    tasks.forEach((t) => {
      taskOptions.push((
        <option key={keyCount++} value={t.title}>{t.title}</option>
      ));
    });

    return (
      <div className="form-overlay">
        <div className="form-container">
          <h2 className="staff-form-title">Create New Assignment</h2>
          <form className="staff-form" onSubmit={(e) => addAssignment(e, name, task, urgent, employee_id, dueBy)}>
            <label className="staff-form-label" htmlFor="employee-selector">Employee Name</label>
            <select onChange={this.onChange} id="employee-selector" defaultValue="placeholder" required>
              <option value="placeholder" disabled>Select employee</option>
              {employeeOptions.length > 0 && employeeOptions}
            </select>
            <label className="staff-form-label" htmlFor="task-selector">Task</label>
            <select onChange={this.onChange} id="task-selector" defaultValue="placeholder" required>
              <option value="placeholder" disabled>Select task</option>
              {taskOptions.length > 0 && taskOptions}
            </select>
            <label className="staff-form-label" htmlFor="due-by">Due By</label>
            <input type="text" id="due-by" onChange={this.onChange} value={dueBy} required />
            <label className="staff-form-label" htmlFor="urgent-radio-btn">Urgent</label>
            <input type="radio" name="urgency" value="urgent" id="urgent-radio-btn" onChange={this.onChange}/>
            <label className="staff-form-label" htmlFor="not-urgent-radio-btn">Not Urgent</label>
            <input type="radio" name="urgency" value="not urgent" id="not-urgent-radio-btn" onChange={this.onChange}/>
            <input className="staff-form-input" type="submit" value="Add" />
          </form>
          <span onClick={toggleAssignmentForm} className="staff-form-close"><InlineIcon icon={xIcon} width="2em" /></span>
        </div>
      </div>
    );
  }
}

export default AssignmentForm;