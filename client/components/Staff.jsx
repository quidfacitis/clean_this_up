import React from 'react';
import { Icon } from '@iconify/react';
import plusSquareFill from '@iconify/icons-bi/plus-square-fill';
import StaffMember from './StaffMember.jsx';


const dummyData = [
  {name: "Ron Burgundy", role: "Bathroom crew"},
  {name: "Alice Frasier", role: "Office crew"},
  {name: "Andy Zaltzman", role: "Night shift"},
  {name: "Nish Kumar", role: "Part time"},
  {name: "Billy Bob Thornton", role: "Kitchen crew"}
]

const Staff = ({toggleStaffForm, staff}) => {

  const staffMembers = staff.map(member => <StaffMember member={member} />);

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

  )
};

export default Staff;