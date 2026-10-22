import React, { useState, useEffect } from 'react';
import { X, Edit3, Save, AlertCircle, Calendar, AlignLeft } from 'lucide-react';

export const EditTaskModal = ({
  task,
  isOpen,
  onClose,
  onSave,
  isSaving
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [titleError, setTitleError] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title || '');
      setDescription(task.description || '');
      setDueDate(task.dueDate || '');
      setTitleError('');
    }
  }, [task, isOpen]);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setTitleError('Task title cannot be empty');
      return;
    }

    onSave({
      id: task.id,
      title: title.trim(),
      description: description.trim() || null,
      dueDate: dueDate || null
    });
  };

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      id="edit-task-modal-backdrop"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-dialog"
        onClick={(e) => e.stopPropagation()}
        id="edit-task-modal-dialog"
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-header-title">
            <Edit3 size={18} color="var(--accent-cyan)" />
            <span>Edit Orbit Mission</span>
          </div>
          <button
            id="close-edit-modal-btn"
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} noValidate>
          <div className="modal-body">
            {/* Title */}
            <div className="input-group">
              <label htmlFor="edit-task-title" className="input-label">
                Task Title <span className="required-star">*</span>
              </label>
              <input
                id="edit-task-title"
                type="text"
                className={`custom-input ${titleError ? 'input-error' : ''}`}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (titleError && e.target.value.trim()) setTitleError('');
                }}
                disabled={isSaving}
                autoFocus
              />
              {titleError && (
                <span className="error-text" id="edit-task-title-error">
                  <AlertCircle size={13} /> {titleError}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="input-group">
              <label htmlFor="edit-task-desc" className="input-label">
                <AlignLeft size={12} /> Notes / Directives
              </label>
              <textarea
                id="edit-task-desc"
                rows={3}
                className="custom-textarea"
                style={{ height: 'auto', minHeight: '80px' }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSaving}
              />
            </div>

            {/* Due Date */}
            <div className="input-group">
              <label htmlFor="edit-task-date" className="input-label">
                <Calendar size={12} /> Target Due Date
              </label>
              <input
                id="edit-task-date"
                type="date"
                className="custom-input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                disabled={isSaving}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer">
            <button
              id="cancel-edit-task-btn"
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              id="save-edit-task-btn"
              type="submit"
              className="btn-primary"
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <span className="spinner" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save size={15} />
                  <span>Save Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
