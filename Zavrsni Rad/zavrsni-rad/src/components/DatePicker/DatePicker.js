import React, { useState } from 'react';
import './DatePicker.css';

const DatePicker = ({ reservations, onDatesChange }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const isBooked = (date) => {
    return reservations.some(reservation => {
      const start = reservation.StartDate.toDate();
      const end = reservation.EndDate.toDate();
      return date >= start && date <= end;
    });
  };

  const isDateRangeBooked = (start, end) => {
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      if (isBooked(new Date(d))) {
        return true;
      }
    }
    return false;
  };

  const handleDateClick = (date) => {
    if (isBooked(date)) return; // Disable clicking on booked dates

    if (!startDate) {
      setStartDate(date);
      setEndDate(null);
      onDatesChange({ startDate: date, endDate: null });
    } else if (startDate && !endDate) {
      if (date >= startDate) {
        if (!isDateRangeBooked(startDate, date)) {
          setEndDate(date);
          onDatesChange({ startDate: startDate, endDate: date });
        }
      } else {
        if (!isDateRangeBooked(date, startDate)) {
          setStartDate(date);
          onDatesChange({ startDate: date, endDate: startDate });
        }
      }
    } else {
      setStartDate(date);
      setEndDate(null);
      onDatesChange({ startDate: date, endDate: null });
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const renderCalendar = () => {
    const startOfMonth = new Date(currentYear, currentMonth, 1);
    const endOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const days = [];

    for (let i = 1; i <= endOfMonth.getDate(); i++) {
      const date = new Date(currentYear, currentMonth, i);
      const isSelected = startDate && endDate && date >= startDate && date <= endDate;
      days.push(
        <div
          key={i}
          className={`day ${isBooked(date) ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => handleDateClick(date)}
        >
          {i}
        </div>
      );
    }

    return days;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '/');
  };

  return (
    <div className="date-picker">
      <div className="month-year-browser">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>{new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} {currentYear}</span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
      <div className="calendar">
        {renderCalendar()}
      </div>
      <div className="selected-dates">
        <p>Od: {startDate ? formatDate(startDate) : 'None'}</p>
        <p>Do: {endDate ? formatDate(endDate) : 'None'}</p>
      </div>
    </div>
  );
};

export default DatePicker;
