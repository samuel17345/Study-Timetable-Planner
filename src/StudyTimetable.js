import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./StudyTimetable.css";

const StudyTimetable = () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const times = [
    "6:00AM", "7:00AM", "8:00AM", "9:00AM", "10:00AM", "11:00AM",
    "12:00PM", "1:00PM", "2:00PM", "3:00PM", "4:00PM", "5:00PM",
    "6:00PM", "7:00PM", "8:00PM", "9:00PM"
  ];

  // Load saved schedule from localStorage or initialize empty
  const [schedule, setSchedule] = useState(() => {
    const savedSchedule = localStorage.getItem("studyTimetable");
    return savedSchedule ? JSON.parse(savedSchedule) : Array(times.length).fill().map(() => Array(days.length).fill(""));
  });

  useEffect(() => {
    localStorage.setItem("studyTimetable", JSON.stringify(schedule));
  }, [schedule]);

  const handleCellChange = (dayIndex, timeIndex, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[timeIndex][dayIndex] = value;
    setSchedule(updatedSchedule);
  };

  const downloadPDF = () => {
    const input = document.getElementById("timetable");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("l", "mm", "a4");
      pdf.addImage(imgData, "PNG", 10, 10, 280, 190);
      pdf.save("Study_Timetable.pdf");
    });
  };

  return (
    <div>
      <div className="study-timetable" id="timetable">
        {/* Header */}
        <div className="header-row">
          <div className="time-cell header-cell">Time</div>
          {days.map((day, index) => (
            <div key={index} className="header-cell">{day}</div>
          ))}
        </div>

        {/* Body */}
        {times.map((time, timeIndex) => (
          <div key={timeIndex} className="row">
            <div className="time-cell">{time}</div>
            {days.map((day, dayIndex) => (
              <div key={dayIndex} className="cell">
                <input
                  type="text"
                  value={schedule[timeIndex][dayIndex]}
                  onChange={(e) => handleCellChange(dayIndex, timeIndex, e.target.value)}
                  placeholder="________"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={downloadPDF} style={{
        display: "block", 
        margin: "20px auto", 
        padding: "15px 30px", 
        fontSize: "18px", 
        backgroundColor: "#D32F2F", 
        color: "white", 
        border: "none", 
        borderRadius: "5px", 
        cursor: "pointer"
      }}>
        Download as PDF
      </button>
    </div>
  );
};

export default StudyTimetable;
