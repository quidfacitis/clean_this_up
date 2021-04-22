import React from 'react';
import { Icon } from '@iconify/react';
import plusSquareFill from '@iconify/icons-bi/plus-square-fill';
import TaskItem from './TaskItem.jsx';

const Tasks = ({tasks, toggleTaskForm}) => {
  const taskItems = tasks.map(t => <TaskItem task={t} />);

  return (
    <div className="staff-container">
      <div className="staff-navbar">
        <h2 className="staff-title">Tasks</h2>
      </div>
      <div className="staff-member-container">
        <span className="staff-new-member-btn" onClick={toggleTaskForm}><Icon icon={plusSquareFill} color="#445bb2" width="4em"/></span>
        {taskItems}
      </div>
    </div>
  );
};

export default Tasks;