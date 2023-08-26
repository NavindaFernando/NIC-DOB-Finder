import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [nicNumber, setNicNumber] = useState('');
  const [gender, setGender] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const handleNicChange = (event) => {
    const newNicNumber = event.target.value;
    setNicNumber(newNicNumber);
  };

  const extractNicInfo = () => {
    if (nicNumber.length !== 9 && nicNumber.length !== 12) {
      // Handle invalid NIC length
      return;
    }

    const birthYearPrefix = (nicNumber.length === 9) ? '19' : '';
    const yearOfBirth = birthYearPrefix + nicNumber.substring(0, 2);
    const daysSinceBirth = parseInt(nicNumber.substring(2, 5));
    const genderCode = parseInt(nicNumber.charAt(2));

    let genderValue, monthValue;

    if (genderCode === 1 || genderCode === 3 || genderCode === 5) {
      genderValue = 'Male';
    } else if (genderCode === 2 || genderCode === 4 || genderCode === 6) {
      genderValue = 'Female';
    } else {
      genderValue = 'Other';
    }

    // Adjusting for leap years
    const isLeapYear = (yearOfBirth % 4 === 0 && (yearOfBirth % 100 !== 0 || yearOfBirth % 400 === 0));

    let daysLeft = daysSinceBirth;
    let monthIndex = 0;
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const monthsDays = [
      31, (isLeapYear ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

    while (daysLeft > monthsDays[monthIndex]) {
      daysLeft -= monthsDays[monthIndex];
      monthIndex++;
    }

    monthValue = months[monthIndex];
    const dayValue = daysLeft;

    setGender(genderValue);
    setYear(yearOfBirth);
    setMonth(monthValue);
    setDay(dayValue.toString());
  };

  const handleSearch = () => {
    extractNicInfo();
  };

  return (
    <div className="dashboard-container">
      <h1>NIC to DOB</h1>
      <div className="input-container">
        <input
          type="text"
          id="nicNumber"
          value={nicNumber}
          onChange={handleNicChange}
          placeholder="Enter NIC number"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="result-container">
        <p><strong>Gender:</strong> {gender}</p>
        <p><strong>Year of Birth:</strong> {year}</p>
        <p><strong>Month of Birth:</strong> {month}</p>
        <p><strong>Day of Birth:</strong> {day}</p>
      </div>
    </div>
  );
};

export default Dashboard;