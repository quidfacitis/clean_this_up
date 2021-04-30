import React from 'react';
import {Icon, InlineIcon} from '@iconify/react';
import delete24Filled from '@iconify-icons/fluent/delete-24-filled';
import editSolid from '@iconify/icons-clarity/edit-solid';
// import alertUrgent16Filled from '@iconify-icons/fluent/alert-urgent-16-filled';
import exclamationIcon from '@iconify/icons-fa-solid/exclamation';

const AssignmentItem = ({assignment, toggleMessageModal, deleteAssignment}) => {
  return (
    <div className="staff-member-card">
      <div className="staff-name">{assignment.task} {assignment.done && <span className="done-badge">Done</span>}</div>
      <div className="staff-role">{assignment.name}</div>
      <div className="staff-card-assign-task" style={{backgroundColor: '#4cac84', width: '8em'}} onClick={() => toggleMessageModal(assignment)}>Send Message</div>
      <div className="staff-edit-delete-container">
        <span className="staff-edit"><Icon icon={editSolid} /></span>
        <span className="staff-delete" onClick={() => deleteAssignment(assignment.id)}><Icon icon={delete24Filled} /></span>
      </div>
      {assignment.urgent && <div className="staff-card-task-count"><InlineIcon icon={exclamationIcon} width="0.45em" color="#4cac84" /></div>}
    </div>
  );
};

export default AssignmentItem;