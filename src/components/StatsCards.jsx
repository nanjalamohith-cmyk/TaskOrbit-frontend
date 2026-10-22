import React, { useEffect, useState } from 'react';
import { Layers, Clock, CheckCircle, TrendingUp } from 'lucide-react';

// Hook to animate numbers smoothly
function useAnimatedCount(targetValue, duration = 600) {
  const [count, setCount] = useState(targetValue);

  useEffect(() => {
    let startTimestamp = null;
    const initial = count;
    const diff = targetValue - initial;

    if (diff === 0) return;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(initial + diff * eased));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [targetValue, duration]);

  return count;
}

export const StatsCards = ({ stats = { total: 0, pending: 0, completed: 0 } }) => {
  const animatedTotal = useAnimatedCount(stats.total);
  const animatedPending = useAnimatedCount(stats.pending);
  const animatedCompleted = useAnimatedCount(stats.completed);

  // Calculate percentage
  const percentage = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const animatedPercentage = useAnimatedCount(percentage);

  // SVG Progress Ring calculations (Radius 30, Circumference = 2 * PI * 30 = 188.5)
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="stats-grid">
      {/* Total Tasks Card */}
      <div className="glass-card stat-card total" id="stat-card-total">
        <div className="stat-info">
          <span className="stat-label">Total Missions</span>
          <span className="stat-number">{animatedTotal}</span>
          <span className="stat-subtext">All planned tasks</span>
        </div>
        <div className="stat-icon-wrapper">
          <Layers size={24} />
        </div>
      </div>

      {/* Pending Tasks Card */}
      <div className="glass-card stat-card pending" id="stat-card-pending">
        <div className="stat-info">
          <span className="stat-label">In Orbit</span>
          <span className="stat-number">{animatedPending}</span>
          <span className="stat-subtext">Awaiting completion</span>
        </div>
        <div className="stat-icon-wrapper">
          <Clock size={24} />
        </div>
      </div>

      {/* Completed Tasks Card */}
      <div className="glass-card stat-card completed" id="stat-card-completed">
        <div className="stat-info">
          <span className="stat-label">Completed</span>
          <span className="stat-number">{animatedCompleted}</span>
          <span className="stat-subtext">Mission accomplished</span>
        </div>
        <div className="stat-icon-wrapper">
          <CheckCircle size={24} />
        </div>
      </div>

      {/* Progress Ring Card */}
      <div className="glass-card stat-card progress-card" id="stat-card-progress">
        <div className="progress-info">
          <span className="stat-label">Completion Velocity</span>
          <span className="progress-title">{animatedPercentage}% Finished</span>
          <span className="progress-desc">
            {stats.completed} of {stats.total} missions complete
          </span>
        </div>

        <div className="progress-ring-container">
          <svg className="progress-ring-svg" width="76" height="76" viewBox="0 0 76 76">
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#34d399" />
              </linearGradient>
            </defs>
            <circle
              className="progress-ring-bg"
              cx="38"
              cy="38"
              r={radius}
              strokeWidth="6"
            />
            <circle
              className="progress-ring-fill"
              cx="38"
              cy="38"
              r={radius}
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
            />
          </svg>
          <span className="progress-percent-label">{animatedPercentage}%</span>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
