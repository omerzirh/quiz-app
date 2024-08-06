import React from 'react';

import './ProgressBar.css';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${percentage}%` }}>
        <span className="progress-text">{`${current} / ${total}`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;