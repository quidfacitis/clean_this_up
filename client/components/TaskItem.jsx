import React from 'react';
import {Icon} from '@iconify/react';
import delete24Filled from '@iconify-icons/fluent/delete-24-filled';
import editSolid from '@iconify/icons-clarity/edit-solid';

const TaskItem = ({task, deleteTask}) => {
  return (
    <div className="staff-member-card">
      <div className="staff-name">{task.title}</div>
      <div className="staff-role">{task.description}</div>
      <div className="staff-card-assign-task" style={{backgroundColor: '#445bb2', width: '8em'}}>Assign to Staff</div>
      <div className="staff-edit-delete-container">
        <span className="task-edit"><Icon icon={editSolid} /></span>
        <span className="task-delete" onClick={() => deleteTask(task.id)}><Icon icon={delete24Filled} /></span>
      </div>
    </div>
  );
};

export default TaskItem;