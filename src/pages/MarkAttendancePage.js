// src/pages/MarkAttendancePage.js
import React, { useState } from "react";

const sampleStudents = [
  { sid: "101", name: "Rahul Kumar", email: "rahul@example.com", contact: "9999999999", imgUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
  { sid: "102", name: "Priya Singh", email: "priya@example.com", contact: "8888888888", imgUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
  { sid: "103", name: "Amit Sharma", email: "amit@example.com", contact: "7777777777", imgUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
];

function MarkAttendancePage({ onSave }) {
  const [students, setStudents] = useState(sampleStudents);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [attendance, setAttendance] = useState({}); // sid -> 'present'/'absent'
  const [history, setHistory] = useState([]); // for undo

  function markPresent() {
    const sid = students[currentIndex].sid;
    setAttendance({ ...attendance, [sid]: "present" });
    setHistory([...history, currentIndex]);
    nextCard();
  }

  function markAbsent() {
    const sid = students[currentIndex].sid;
    setAttendance({ ...attendance, [sid]: "absent" });
    setHistory([...history, currentIndex]);
    nextCard();
  }

  function nextCard() {
    setCurrentIndex((prev) => (prev + 1 < students.length ? prev + 1 : prev));
  }

  function prevCard() {
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  }

  function undoLast() {
    if (history.length === 0) return;
    const lastIndex = history[history.length - 1];
    const sid = students[lastIndex].sid;
    const newAttendance = { ...attendance };
    delete newAttendance[sid];
    setAttendance(newAttendance);
    setCurrentIndex(lastIndex);
    setHistory(history.slice(0, -1));
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16, background: "#e8f0fe", borderRadius: 12 }}>
      <h2>Phase 3: Mark Attendance</h2>
      <div style={{ marginBottom: 10 }}>
        <strong>
          Student {currentIndex + 1} of {students.length} | Present: {Object.values(attendance).filter(a => a === "present").length} | Absent: {Object.values(attendance).filter(a => a === "absent").length}
        </strong>
      </div>
      {students[currentIndex] ? (
        <div style={{ padding: 20, background: "white", borderRadius: 10, boxShadow: "0 0 8px rgba(0,0,0,0.1)" }}>
          <img src={students[currentIndex].imgUrl} alt={students[currentIndex].name} style={{ width: 120, borderRadius: 60, marginBottom: 12 }} />
          <h3>{students[currentIndex].name}</h3>
          <p>SID: {students[currentIndex].sid}</p>
          <p>Contact: {students[currentIndex].contact}</p>
          <p>Email: {students[currentIndex].email}</p>
          <div>
            <button onClick={markPresent} style={{ marginRight: 10, padding: "8px 20px", background: "green", color: "white", borderRadius: 6 }}>
              Present
            </button>
            <button onClick={markAbsent} style={{ padding: "8px 20px", background: "red", color: "white", borderRadius: 6 }}>
              Absent
            </button>
          </div>
          <div style={{ marginTop: 14 }}>
            <button onClick={undoLast} disabled={history.length === 0}>
              Undo
            </button>
          </div>
        </div>
      ) : (
        <p>No students to show.</p>
      )}
      <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between" }}>
        <button onClick={prevCard} disabled={currentIndex === 0}>
          &larr; Previous
        </button>
        <button onClick={() => onSave(attendance)}>Save Attendance</button>
        <button onClick={nextCard} disabled={currentIndex === students.length - 1}>
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

export default MarkAttendancePage;
