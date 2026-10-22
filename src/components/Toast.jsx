import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ toasts = [], onDismiss }) => {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="toast-container" id="toast-notifications-container">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 size={16} />;
        if (toast.type === 'error') {
          icon = <AlertCircle size={16} />;
        } else if (toast.type === 'info') {
          icon = <Info size={16} />;
        }

        return (
          <div
            key={toast.id}
            className={`toast-item ${toast.type || 'success'}`}
            id={`toast-${toast.id}`}
            role="status"
          >
            <div className="toast-icon">{icon}</div>
            <div className="toast-message">{toast.message}</div>
            {onDismiss && (
              <button
                className="btn-modal-close"
                style={{ padding: '0.2rem', marginLeft: '0.4rem' }}
                onClick={() => onDismiss(toast.id)}
                aria-label="Dismiss toast"
              >
                <X size={14} />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
