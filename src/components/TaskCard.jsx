import React, { useRef } from 'react';
import { Check, Edit3, Trash2, Calendar, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const TaskCard = ({
  task,
  onToggleStatus,
  onOpenEdit,
  onOpenDelete,
  animationDelay = 0
}) => {
  const cardRef = useRef(null);
  const isCompleted = task.status === 'COMPLETED';

  // Check if task is overdue
  const todayStr = new Date().toISOString().split('T')[0];
  const isOverdue = !isCompleted && task.dueDate && task.dueDate < todayStr;
  const isToday = task.dueDate && task.dueDate === todayStr;

  // Format date nicely
  const formatDisplayDate = (dateString) => {
    if (!dateString) return null;
    try {
      const [year, month, day] = dateString.split('-');
      const d = new Date(year, month - 1, day);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // 3D Tilt calculation on hover
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;

    // Update specular glare position
    const glareX = ((x / rect.width) * 100).toFixed(1);
    const glareY = ((y / rect.height) * 100).toFixed(1);
    card.style.setProperty('--mouse-x', `${glareX}%`);
    card.style.setProperty('--mouse-y', `${glareY}%`);
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  return (
    <div
      className="task-card-3d-wrap card-animate-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div
        ref={cardRef}
        id={`task-card-${task.id}`}
        className={`glass-card task-card ${isCompleted ? 'completed-task' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Left Section: Checkbox & Content */}
        <div className="task-left-section">
          {/* Status Checkbox / Toggle */}
          <button
            id={`toggle-task-${task.id}`}
            className={`task-toggle-btn ${isCompleted ? 'checked' : ''}`}
            onClick={() => onToggleStatus(task)}
            title={isCompleted ? 'Mark as Pending' : 'Mark as Completed'}
            aria-label={`Toggle task status for ${task.title}`}
          >
            <Check size={16} strokeWidth={3} />
          </button>

          {/* Title, Description & Badges */}
          <div className="task-details">
            <h3 className="task-title" id={`task-title-${task.id}`}>
              {task.title}
            </h3>

            {task.description && (
              <p className="task-desc" id={`task-desc-${task.id}`}>
                {task.description}
              </p>
            )}

            <div className="task-badges-row">
              {/* Status Badge: Cyan pulse for Pending, Green for Completed */}
              {isCompleted ? (
                <span className="badge badge-completed" id={`status-badge-${task.id}`}>
                  <CheckCircle2 size={13} />
                  <span>Completed</span>
                </span>
              ) : (
                <span className="badge badge-pending" id={`status-badge-${task.id}`}>
                  <span className="badge-pending-dot" />
                  <span>Pending</span>
                </span>
              )}

              {/* Overdue coral tag if due date has passed and task is pending */}
              {isOverdue && (
                <span className="badge badge-overdue" id={`overdue-badge-${task.id}`}>
                  <AlertTriangle size={12} />
                  <span>Overdue</span>
                </span>
              )}

              {/* Due Date badge */}
              {task.dueDate && (
                <span
                  className={`badge badge-date ${isToday ? 'is-today' : ''}`}
                  id={`due-date-badge-${task.id}`}
                >
                  <Calendar size={12} />
                  <span>{isToday ? 'Today' : formatDisplayDate(task.dueDate)}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Edit & Delete Action Buttons */}
        <div className="task-actions">
          <button
            id={`edit-task-btn-${task.id}`}
            className="btn-icon-action edit"
            onClick={() => onOpenEdit(task)}
            title="Edit Mission"
            aria-label={`Edit task ${task.title}`}
          >
            <Edit3 size={15} />
          </button>

          <button
            id={`delete-task-btn-${task.id}`}
            className="btn-icon-action delete"
            onClick={() => onOpenDelete(task)}
            title="Delete Mission"
            aria-label={`Delete task ${task.title}`}
          >
            <Trash2 size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
