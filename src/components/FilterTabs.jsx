import React, { useRef, useEffect, useState } from 'react';
import { RotateCw, CheckCircle2, Clock, ListFilter } from 'lucide-react';

export const FilterTabs = ({
  activeFilter = 'ALL',
  onSelectFilter,
  counts = { all: 0, pending: 0, completed: 0 },
  onRefresh,
  isRefreshing
}) => {
  const tabs = [
    { id: 'ALL', label: 'All Missions', count: counts.all, icon: ListFilter },
    { id: 'PENDING', label: 'In Orbit', count: counts.pending, icon: Clock },
    { id: 'COMPLETED', label: 'Completed', count: counts.completed, icon: CheckCircle2 },
  ];

  const tabRefs = useRef({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const currentTab = tabRefs.current[activeFilter];
    if (currentTab) {
      setIndicatorStyle({
        left: currentTab.offsetLeft,
        width: currentTab.offsetWidth,
      });
    }
  }, [activeFilter, counts]);

  return (
    <div className="controls-bar">
      <div className="filter-tabs-container">
        {/* Sliding Indicator Pill */}
        <div
          className="filter-active-pill"
          style={{
            transform: `translateX(${indicatorStyle.left}px)`,
            width: `${indicatorStyle.width}px`,
          }}
        />

        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFilter === tab.id;

          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[tab.id] = el)}
              id={`filter-tab-${tab.id.toLowerCase()}`}
              className={`filter-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectFilter(tab.id)}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
              <span className="tab-badge">{tab.count}</span>
            </button>
          );
        })}
      </div>

      {/* Manual refresh button */}
      <button
        id="refresh-tasks-btn"
        className={`refresh-btn ${isRefreshing ? 'spinning' : ''}`}
        onClick={onRefresh}
        title="Sync tasks from server"
      >
        <RotateCw size={14} />
        <span>Sync</span>
      </button>
    </div>
  );
};

export default FilterTabs;
