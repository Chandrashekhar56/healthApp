import React from 'react';
import classNames from 'classnames';

import './appointmentStatusLegends.scss';

const legendsData = [
  { label: 'Pending', className: 'color-item-10min' },
  { label: 'Confirmed', className: 'color-item-Cancel' },
  { label: 'Waiting Room', className: 'color-item-waiting' },
  { label: 'Check In', className: 'color-item-CheckIn' },
  { label: 'Ready For Practitioner', className: 'color-item-ReadyForPractitioner'},
  { label: 'Completed', className: 'color-item-30min' },
  { label: 'Cancelled', className: 'color-item-20min' },
  { label: 'Missed', className: 'color-item-New' },
];

const AppointmentStatusLegends = () => (
  <div className="dashboard-legends-container">
    {legendsData.map(({ label, className }) => (
      <div key={label} className="legends-item">
        <div className={classNames('color-item', className)} />
        <div className="color-label">{label}</div>
      </div>
    ))}
  </div>
);

export default AppointmentStatusLegends;
