import React from 'react';

const StaffMember = ({member}) => {
  return (
    <div className="staff-member-card">
      <div>{member.name}</div>
      <div>{member.role}</div>
    </div>
  );
};

export default StaffMember;