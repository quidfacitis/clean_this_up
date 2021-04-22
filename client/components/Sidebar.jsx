import React from 'react';
import {Link} from 'react-router-dom';
import { Icon, InlineIcon } from '@iconify/react';
import broomIcon from '@iconify-icons/whh/broom';
import bxsDashboard from '@iconify/icons-bx/bxs-dashboard';
import employeeGroupSolid from '@iconify/icons-clarity/employee-group-solid';
import tasksSolid from '@iconify/icons-clarity/tasks-solid';

const Sidebar = () => {
  return (
    <div className="sidebar-container">
      <div className="app-title-container">
        <Link to="/">
          <h2 className="app-title">Clean This Up</h2>
          <span className="app-icon"><Icon icon={broomIcon} color="#edeeef" width="1.5em"/></span>
        </Link>
      </div>
      <div className="menu-item-container">
        <Link to="/">
          <div className="menu-item">
            <span className="item-icon"><InlineIcon icon={bxsDashboard} color="#edeeef" width="1.1em"/></span>
            <div className="item-name">Dashboard</div>
          </div>
        </Link>
        <Link to="/staff">
          <div className="menu-item">
            <span className="item-icon"><InlineIcon icon={employeeGroupSolid} color="#edeeef" width="1.1em"/></span>
            <div className="item-name">Staff</div>
          </div>
        </Link>
        <Link to="/tasks">
          <div className="menu-item">
            <span className="item-icon"><InlineIcon icon={tasksSolid} color="#edeeef" width="1.1em"/></span>
            <div className="item-name">Tasks</div>
          </div>
        </Link>
      </div>

    </div>
  );
};

export default Sidebar;