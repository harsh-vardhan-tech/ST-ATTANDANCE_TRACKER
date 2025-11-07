// src/pages/DashboardPage.js
import React from "react";

function DashboardPage({ attendance, students, onSendEmail, onDownloadReport }) {
  const totalStudents = students.length;
  const presentCount = Object.values(attendance).filter(a => a === "present").length;
  const absentCount = Object.values(attendance).filter(a => a === "absent").length;

  const absentStudents = students.filter(s => attendance[s.sid] === "absent");

  return (
    <div style={{ maxWidth: 600, margin: "40px auto", padding: 16, background: "#fff4e6", borderRadius: 12 }}>
      <h2>Attendance Dashboard</h2>
      <div style={{ marginBottom: 16 }}>
        <strong>Total Students:</strong> {totalStudents} &nbsp; | &nbsp;
        <strong>Present:</strong> {presentCount} &nbsp; | &nbsp;
        <strong>Absent:</strong> {absentCount}
      </div>
      <button onClick={() => onSendEmail(absentStudents)} disabled={absentStudents.length === 0} style={{ marginBottom: 12 }}>
        Send Email to Absent Students
      </button>
      <div>
        <button onClick={() => onDownloadReport("absent")} style={{ marginRight: 8 }}>
          Download Absent Report
        </button>
        <button onClick={() => onDownloadReport("present")} style={{ marginRight: 8 }}>
          Download Present Report
        </button>
        <button onClick={() => onDownloadReport("all")}>
          Download All Students Report
        </button>
      </div>
      <h3 style={{ marginTop: 25 }}>Absent Students List:</h3>
      <ul>
        {absentStudents.length > 0 ? (
          absentStudents.map(s => (
            <li key={s.sid}>{s.name} (SID: {s.sid}) - {s.email}</li>
          ))
        ) : (
          <li>No absent students</li>
        )}
      </ul>
    </div>
  );
}

export default DashboardPage;
