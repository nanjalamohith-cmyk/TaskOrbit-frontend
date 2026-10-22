import React from 'react';
import { Compass, PlusCircle, CheckCheck } from 'lucide-react';

export const EmptyState = ({ activeFilter = 'ALL', onResetFilter }) => {
  let title = 'No Orbit Missions Found';
  let message = 'Your flight trajectory is completely clear. Launch a new task above!';
  let showReset = false;

  if (activeFilter === 'PENDING') {
    title = 'No Pending Tasks';
    message = 'All active missions have been completed or none are scheduled.';
    showReset = true;
  } else if (activeFilter === 'COMPLETED') {
    title = 'No Completed Tasks Yet';
    message = 'Complete your pending missions to populate your mission victory log!';
    showReset = true;
  }

  return (
    <div className="glass-card empty-state-card" id="empty-state-container">
      <div className="empty-orb-icon">
        {activeFilter === 'COMPLETED' ? <CheckCheck size={38} /> : <Compass size={38} />}
      </div>
      <div>
        <h3 className="empty-title">{title}</h3>
        <p className="empty-subtitle">{message}</p>
      </div>

      {showReset && (
        <button
          id="empty-state-reset-filter-btn"
          className="btn-empty-action"
          onClick={() => onResetFilter('ALL')}
        >
          <PlusCircle size={15} />
          <span>View All Missions</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
