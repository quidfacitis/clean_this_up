import React, {Component} from 'react';
import {InlineIcon} from '@iconify/react';
import xIcon from '@iconify/icons-bi/x';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    if (e.target.id === 'task-title') {
      this.setState({
        title: e.target.value
      });
    } else {
      this.setState({
        description: e.target.value
      });
    }
  }

  render() {
    const {toggleTaskForm, addTask} = this.props;
    let {title, description} = this.state;
    return (
      <div className="form-overlay">
        <div className="form-container">
          <h2 className="staff-form-title">Add New Task</h2>
          <form className="staff-form" onSubmit={(e) => addTask(e, title, description)}>
            <label className="staff-form-label" htmlFor="task-title">Title</label>
            <input className="staff-form-input" type="text" id="task-title" onChange={this.onChange} value={title} required />
            <label className="staff-form-label" htmlFor="task-description">Description</label>
            <textarea  className="staff-form-input" id="task-description" onChange={this.onChange} value={description} maxlength="255" required></textarea>
            <input className="staff-form-input" type="submit" value="Add" />
          </form>
          <span onClick={toggleTaskForm} className="staff-form-close"><InlineIcon icon={xIcon} width="2em" /></span>
        </div>
      </div>
    );
  }
}

export default TaskForm;