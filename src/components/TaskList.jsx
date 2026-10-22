import React from 'react';
import TaskCard from './TaskCard';
import EmptyState from './EmptyState';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const TaskList = ({
  tasks,
  isLoading,
  error,
  activeFilter,
  onToggleStatus,
  onOpenEdit,
  onOpenDelete,
  onRetry,
  onResetFilter
}) => {
  // If loading initially
  if (isLoading && tasks.length === 0) {
    return (
      <div className="glass-card loading-container" id="tasks-loading-state">
        <div className="cosmic-loader" />
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Establishing orbital uplink & retrieving tasks...
        </p>
      </div>
    );
  }

  // If server is unreachable
  if (error && tasks.length === 0) {
    return (
      <div className="error-banner" id="tasks-error-state">
        <div className="error-banner-content">
          <AlertCircle size={22} />
          <span>{error}</span>
        </div>
        <button id="retry-fetch-btn" className="btn-retry" onClick={onRetry}>
          <RefreshCw size={14} />
          <span>Retry Uplink</span>
        </button>
      </div>
    );
  }

  // If no tasks match current filter
  if (tasks.length === 0) {
    return (
      <EmptyState
        activeFilter={activeFilter}
        onResetFilter={onResetFilter}
      />
    );
  }

  return (
    <div className="task-list-wrapper" id="task-list-container">
      {tasks.map((task, index) => (
        <TaskCard
          key={task.id}
          task={task}
          animationDelay={Math.min(index * 50, 400)}
          onToggleStatus={onToggleStatus}
          onOpenEdit={onOpenEdit}
          onOpenDelete={onOpenDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
