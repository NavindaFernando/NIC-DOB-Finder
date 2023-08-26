import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [nicNumber, setNicNumber] = useState('');
  const [gender, setGender] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [error, setError] = useState('');

  const handleNicChange = (event) => {
    const newNicNumber = event.target.value;
    setNicNumber(newNicNumber);
  };

  const handleFind = () => {
    setError('');
    setGender('');
    setYear('');
    setMonth('');
    setDay('');

    if (nicNumber.length !== 10 && nicNumber.length !== 12) {
      setError('Invalid NIC Number');
    } else {
      const NICNo = nicNumber;
      let dayText = 0;
      let year = '';
      let month = '';
      let day = '';
      let gender = '';

      if (NICNo.length == 10 || (NICNo.length == 12 && /^\d+$/.test(NICNo.substr(0, 9)))) {
        // Year
        if (NICNo.length == 10) {
          year = "19" + NICNo.substr(0, 2);
          dayText = parseInt(NICNo.substr(2, 3));
        } else {
          year = NICNo.substr(0, 4);
          dayText = parseInt(NICNo.substr(4, 3));
        }

        // Gender
        if (dayText > 500) {
          gender = "Female";
          dayText = dayText - 500;
        } else {
          gender = "Male";
        }

        // Day Digit Validation
        if (dayText >= 1 && dayText <= 366) {
          // Month
          const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];

          if (dayText > 335) {
            day = dayText - 335;
            month = "December";
          }
          else if (dayText > 305) {
            day = dayText - 305;
            month = "November";
          }
          else if (dayText > 274) {
            day = dayText - 274;
            month = "October";
        }
        else if (dayText > 244) {
            day = dayText - 244;
            month = "September";
        }
        else if (dayText > 213) {
            day = dayText - 213;
            month = "Auguest";
        }
        else if (dayText > 182) {
            day = dayText - 182;
            month = "July";
        }
        else if (dayText > 152) {
            day = dayText - 152;
            month = "June";
        }
        else if (dayText > 121) {
            day = dayText - 121;
            month = "May";
        }
        else if (dayText > 91) {
            day = dayText - 91;
            month = "April";
        }
        else if (dayText > 60) {
            day = dayText - 60;
            month = "March";
        }
        else if (dayText < 32) {
            month = "January";
            day = dayText;
        }
        else if (dayText > 31) {
            day = dayText - 31;
            month = "Febuary";
        }

          // Show Details
          setGender("Gender: " + gender);
          setYear("Year: " + year);
          setMonth("Month: " + month);
          setDay("Day: " + day);
        } else {
          setError("Invalid NIC Number");
        }
      } else {
        setError("Invalid NIC Number");
      }
    }
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
        <button onClick={handleFind}>Find</button>
      </div>
      <div className="result-container">
        <p style={{ color: 'red' }}>{error}</p>
        <p><strong>{gender}</strong></p>
        <p><strong>{year}</strong></p>
        <p><strong>{month}</strong></p>
        <p><strong>{day}</strong></p>
      </div>
    </div>
  );
};

export default Dashboard;