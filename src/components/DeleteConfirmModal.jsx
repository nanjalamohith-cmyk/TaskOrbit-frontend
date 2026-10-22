import React, { useEffect } from 'react';
import { Trash2, AlertTriangle, X } from 'lucide-react';

export const DeleteConfirmModal = ({
  task,
  isOpen,
  onClose,
  onConfirm,
  isDeleting
}) => {
  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !task) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      id="delete-task-modal-backdrop"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        id="delete-task-modal-dialog"
      >
        <div className="modal-header">
          <div className="modal-header-title">
            <AlertTriangle size={18} color="var(--accent-coral)" />
            <span>Confirm Deletion</span>
          </div>
          <button
            id="close-delete-modal-btn"
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="delete-warning-box">
            <div className="delete-icon-wrapper">
              <Trash2 size={24} />
            </div>
            <div className="delete-content">
              <h4>De-orbit this task?</h4>
              <p>
                Are you sure you want to permanently delete this task? This action cannot be undone.
              </p>
              <div className="delete-task-preview" id="delete-task-title-preview">
                "{task.title}"
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            id="cancel-delete-task-btn"
            type="button"
            className="btn-secondary"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            id="confirm-delete-task-btn"
            type="button"
            className="btn-danger"
            onClick={() => onConfirm(task.id)}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="spinner" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 size={15} />
                <span>Delete Task</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
