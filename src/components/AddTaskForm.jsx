import React, { useState } from 'react';
import { PlusCircle, AlertCircle, Calendar, AlignLeft, Sparkles } from 'lucide-react';

export const AddTaskForm = ({ onAddTask, isSubmitting }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [titleError, setTitleError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Inline validation: title must not be empty
    if (!title.trim()) {
      setTitleError('Task title is required');
      return;
    }

    setTitleError('');

    const payload = {
      title: title.trim(),
      description: description.trim() || null,
      dueDate: dueDate || null
    };

    const success = await onAddTask(payload);
    if (success) {
      setTitle('');
      setDescription('');
      setDueDate('');
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    if (titleError && e.target.value.trim()) {
      setTitleError('');
    }
  };

  return (
    <div className="glass-card add-task-card">
      <div className="form-header">
        <div className="form-title-group">
          <div className="form-icon-glow">
            <Sparkles size={18} />
          </div>
          <div>
            <h2 className="form-title">Create Orbit Task</h2>
            <span className="form-badge">Schedule a new planetary objective</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="task-form-grid">
          {/* Title input */}
          <div className="input-group">
            <label htmlFor="task-title-input" className="input-label">
              Task Title <span className="required-star">*</span>
            </label>
            <input
              id="task-title-input"
              type="text"
              className={`custom-input ${titleError ? 'input-error' : ''}`}
              placeholder="e.g. Calibrate sensor matrix..."
              value={title}
              onChange={handleTitleChange}
              disabled={isSubmitting}
            />
            {titleError && (
              <span className="error-text" id="task-title-error">
                <AlertCircle size={13} /> {titleError}
              </span>
            )}
          </div>

          {/* Description input */}
          <div className="input-group">
            <label htmlFor="task-desc-input" className="input-label">
              <AlignLeft size={12} /> Notes / Description
            </label>
            <input
              id="task-desc-input"
              type="text"
              className="custom-input"
              placeholder="Add mission directives or details..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Due Date input */}
          <div className="input-group">
            <label htmlFor="task-due-date-input" className="input-label">
              <Calendar size={12} /> Target Date
            </label>
            <input
              id="task-due-date-input"
              type="date"
              className="custom-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              disabled={isSubmitting}
            />
          </div>

          {/* Add Task Button */}
          <button
            id="add-task-submit-btn"
            type="submit"
            className="btn-submit-task"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner" />
                <span>Launching...</span>
              </>
            ) : (
              <>
                <PlusCircle size={18} />
                <span>Add Task</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTaskForm;
