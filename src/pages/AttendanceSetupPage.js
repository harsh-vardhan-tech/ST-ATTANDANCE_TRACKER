// src/pages/AttendanceSetupPage.js
import React, { useState } from "react";

const initialTeachers = ["Amit Sharma", "Pooja Verma"];
const initialSections = ["A", "B", "C"];

function AttendanceSetupPage({ onContinue }) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [sections, setSections] = useState(initialSections);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [newTeacher, setNewTeacher] = useState("");
  const [newSection, setNewSection] = useState("");

  // Add teacher dynamically
  function handleAddTeacher() {
    if (newTeacher.trim()) {
      setTeachers([...teachers, newTeacher]);
      setNewTeacher("");
    }
  }

  // Add section dynamically
  function handleAddSection() {
    if (newSection.trim()) {
      setSections([...sections, newSection]);
      setNewSection("");
    }
  }

  function handleContinue() {
    if (selectedTeacher && selectedSection && selectedDate) {
      onContinue({ selectedTeacher, selectedSection, selectedDate });
    } else {
      alert("Har field select karo!");
    }
  }

  return (
    <div style={{width:420,padding:16,background:'#f4faee',borderRadius:12,margin:'40px auto'}}>
      <h2>Phase 2: Attendance Setup</h2>
      {/* Teacher select/add */}
      <div>
        <label>Teacher:</label>
        <select value={selectedTeacher} onChange={e=>setSelectedTeacher(e.target.value)}>
          <option value="">Select Teacher</option>
          {teachers.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <input value={newTeacher} onChange={e=>setNewTeacher(e.target.value)} placeholder="Add new teacher" />
        <button onClick={handleAddTeacher}>Add Teacher</button>
      </div>
      {/* Section select/add */}
      <div>
        <label>Section:</label>
        <select value={selectedSection} onChange={e=>setSelectedSection(e.target.value)}>
          <option value="">Select Section</option>
          {sections.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input value={newSection} onChange={e=>setNewSection(e.target.value)} placeholder="Add new section" />
        <button onClick={handleAddSection}>Add Section</button>
      </div>
      {/* Date picker */}
      <div>
        <label>Date:</label>
        <input type="date" value={selectedDate} onChange={e=>setSelectedDate(e.target.value)} />
      </div>
      <button onClick={handleContinue} style={{marginTop:18}}>Continue &rarr;</button>
    </div>
  );
}

export default AttendanceSetupPage;
