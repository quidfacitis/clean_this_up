import React from 'react';
import { Icon } from '@iconify/react';
import plusSquareFill from '@iconify/icons-bi/plus-square-fill';
import StaffMember from './StaffMember.jsx';

const Staff = ({toggleStaffForm, staff, deleteStaff, toggleStaffAssignmentForm}) => {

  let keyCount = 0;
  const staffMembers = staff.map(member => <StaffMember key={keyCount++} member={member} deleteStaff={deleteStaff} toggleStaffAssignmentForm={toggleStaffAssignmentForm} />);

  return (
    <div className="staff-container">
      <div className="staff-navbar">
        <h2 className="staff-title">Staff</h2>
      </div>
      <div className="staff-member-container">
        <span className="staff-new-member-btn" onClick={toggleStaffForm}><Icon icon={plusSquareFill} color="#b7410e" width="4em"/></span>
        {staffMembers}
      </div>
    </div>
  );
};

export default Staff;