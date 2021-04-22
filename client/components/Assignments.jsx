import React from 'react';
import { Icon } from '@iconify/react';
import plusSquareFill from '@iconify/icons-bi/plus-square-fill';
// import TaskItem from './TaskItem.jsx';

const Assignments = ({assignments, toggleAssignmentForm}) => {
  // const taskItems = tasks.map(t => <TaskItem task={t} />);

  return (
    <div className="staff-container">
      <div className="staff-navbar">
        <h2 className="staff-title">Assignments</h2>
      </div>
      <div className="staff-member-container">
        <span className="staff-new-member-btn" onClick={toggleAssignmentForm}><Icon icon={plusSquareFill} color="#4cac84" width="4em"/></span>
        {/* {taskItems} */}
      </div>
    </div>
  );
};

export default Assignments;