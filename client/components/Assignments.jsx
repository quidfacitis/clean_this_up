import React from 'react';
import { Icon } from '@iconify/react';
import plusSquareFill from '@iconify/icons-bi/plus-square-fill';
import AssignmentItem from './AssignmentItem.jsx';

const Assignments = ({assignments, toggleAssignmentForm}) => {
  const assignmentItems = assignments.map(a => <AssignmentItem assignment={a} />);

  return (
    <div className="staff-container">
      <div className="staff-navbar">
        <h2 className="staff-title">Assignments</h2>
      </div>
      <div className="staff-member-container">
        <span className="staff-new-member-btn" onClick={toggleAssignmentForm}><Icon icon={plusSquareFill} color="#4cac84" width="4em"/></span>
        {assignmentItems}
      </div>
    </div>
  );
};

export default Assignments;