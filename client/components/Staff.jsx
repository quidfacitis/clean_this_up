import React from 'react';
import { Icon } from '@iconify/react';
import plusSquareFill from '@iconify/icons-bi/plus-square-fill';

const Staff = () => {

  return (
    <div className="staff-container">
      <div className="staff-navbar">
        <h2 className="staff-title">Staff</h2>
        <span className="staff-new-member-btn"><Icon icon={plusSquareFill} color="#b7410e"/></span>
      </div>
      {/* <div className="staff-new-member-btn-container">
        <h2>New staff member</h2>

      </div> */}
      <div>Staff member cards</div>
    </div>

  )
};

export default Staff;