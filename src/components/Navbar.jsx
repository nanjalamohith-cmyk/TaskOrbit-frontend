import React, { useState, useEffect } from 'react';
import { Orbit, Calendar, Sun, Moon, Sparkles, CheckCircle2 } from 'lucide-react';

export const Navbar = ({ theme, onToggleTheme, isConnected }) => {
  const [currentDateStr, setCurrentDateStr] = useState('');

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    setCurrentDateStr(formatted);
  }, []);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <div className="brand-section">
          <div className="logo-badge">
            <Orbit size={26} />
          </div>
          <div className="brand-info">
            <div className="brand-title-wrap">
              <h1 className="brand-title">TaskOrbit</h1>
              <span className="brand-badge">3D Daily Planner</span>
            </div>
            <span className="brand-tagline">Navigate Your Daily Missions with Precision</span>
          </div>
        </div>

        {/* Right side controls */}
        <div className="navbar-actions">
          {/* Live Date display */}
          <div className="date-chip" title="Today's Date">
            <Calendar size={15} />
            <span>{currentDateStr || 'Today'}</span>
          </div>

          {/* Connection status */}
          <div className="connection-status" title={isConnected ? 'Backend connected' : 'Backend unreachable'}>
            <span className={`status-dot ${isConnected ? 'online' : 'offline'}`} />
            <span>{isConnected ? 'Connected' : 'Offline'}</span>
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            id="theme-toggle-button"
            className="theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle dark/light mode"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
