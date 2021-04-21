import React from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import delete24Filled from '@iconify-icons/fluent/delete-24-filled';
import editSolid from '@iconify/icons-clarity/edit-solid';

const StaffMember = ({member}) => {
  return (
    <div className="staff-member-card">
      <div className="staff-name">{member.name}</div>
      <div className="staff-role">{member.role}</div>
      <div className="staff-card-assign-task">Assign Task</div>
      <div className="staff-edit-delete-container">
        <span className="staff-edit"><Icon icon={editSolid} /></span>
        <span className="staff-delete"><Icon icon={delete24Filled} /></span>
      </div>
      {/* <div className="staff-card-task-count">3</div> */}
    </div>
  );
};

export default StaffMember;