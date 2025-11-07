// src/pages/ManageStudentsPage.js
import React, { useState } from "react";

const initialStudents = [
  { sid: "101", name: "Rahul Kumar", course: "B.Tech CSE", year: 2, section: "A", email: "rahul@example.com", contact: "9999999999" },
  { sid: "102", name: "Priya Singh", course: "B.Tech Agriculture", year: 3, section: "B", email: "priya@example.com", contact: "8888888888" },
  { sid: "103", name: "Amit Sharma", course: "B.Sc Maths", year: 1, section: "A", email: "amit@example.com", contact: "7777777777" },
];

function ManageStudentsPage() {
  const [students, setStudents] = useState(initialStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [editStudent, setEditStudent] = useState(null);

  // Filter students by name or sid
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.sid.includes(searchTerm)
  );

  // Toggle single student selection
  function toggleSelect(sid) {
    const updated = new Set(selectedStudents);
    if (updated.has(sid)) {
      updated.delete(sid);
    } else {
      updated.add(sid);
    }
    setSelectedStudents(updated);
  }

  // Select/Deselect All
  function toggleSelectAll() {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s.sid)));
    }
  }

  // Delete selected students
  function deleteSelected() {
    if(window.confirm(`Are you sure to delete ${selectedStudents.size} students?`)) {
      setStudents(students.filter(s => !selectedStudents.has(s.sid)));
      setSelectedStudents(new Set());
    }
  }

  // Open edit form
  function openEdit(student) {
    setEditStudent({ ...student });
  }

  // Save edited student
  function saveEdit() {
    setStudents(students.map(s => 
      s.sid === editStudent.sid ? editStudent : s
    ));
    setEditStudent(null);
  }

  // Transfer selected students (simplified: move section)
  function transferSelected(newSection) {
    if (!newSection.trim()) return;
    setStudents(students.map(s =>
      selectedStudents.has(s.sid) ? { ...s, section: newSection } : s
    ));
    setSelectedStudents(new Set());
  }

  return (
    <div style={{ maxWidth: 720, margin: "40px auto", padding: 16, background: "#fffaf0", borderRadius: 12 }}>
      <h2>Manage Students</h2>
      <input
        placeholder="Search by Name or SID"
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
        style={{width:"100%", padding:8, marginBottom:12}}
      />
      <button onClick={toggleSelectAll} style={{ marginRight: 12 }}>
        {selectedStudents.size === filteredStudents.length ? "Deselect All" : "Select All"}
      </button>
      <button onClick={deleteSelected} disabled={selectedStudents.size === 0} style={{ marginRight: 12 }}>
        Delete Selected
      </button>
      <button onClick={() => {
        const newSection = prompt("New Section for selected students:");
        if(newSection) transferSelected(newSection);
      }} disabled={selectedStudents.size === 0}>
        Transfer Section
      </button>

      <table border="1" width="100%" style={{ marginTop: 12, borderCollapse: "collapse"}}>
        <thead>
          <tr>
            <th></th>
            <th>SID</th>
            <th>Name</th>
            <th>Course</th>
            <th>Year</th>
            <th>Section</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(s => (
            <tr key={s.sid}>
              <td>
                <input type="checkbox" checked={selectedStudents.has(s.sid)} onChange={() => toggleSelect(s.sid)} />
              </td>
              <td>{s.sid}</td>
              <td>{s.name}</td>
              <td>{s.course}</td>
              <td>{s.year}</td>
              <td>{s.section}</td>
              <td>
                <button onClick={() => openEdit(s)}>Edit</button>
                <button onClick={() => {
                  if(window.confirm(`Delete student ${s.name}?`)) {
                    setStudents(students.filter(st => st.sid !== s.sid));
                    setSelectedStudents(prev => {
                      const copy = new Set(prev);
                      copy.delete(s.sid);
                      return copy;
                    });
                  }
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editStudent && (
        <div style={{marginTop: 20, padding: 10, background: "#e5f3ff", borderRadius: 8}}>
          <h3>Edit Student</h3>
          <label>SID: {editStudent.sid}</label>
          <br />
          <label>Name:</label>
          <input value={editStudent.name} onChange={e => setEditStudent({...editStudent, name: e.target.value})} />
          <br />
          <label>Course:</label>
          <input value={editStudent.course} onChange={e => setEditStudent({...editStudent, course: e.target.value})} />
          <br />
          <label>Year:</label>
          <input type="number" value={editStudent.year} onChange={e => setEditStudent({...editStudent, year: Number(e.target.value)})} />
          <br />
          <label>Section:</label>
          <input value={editStudent.section} onChange={e => setEditStudent({...editStudent, section: e.target.value})} />
          <br />
          <button onClick={saveEdit}>Save</button>
          <button onClick={() => setEditStudent(null)} style={{marginLeft: 12}}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default ManageStudentsPage;
