// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CourseSelectPage from "./pages/CourseSelectPage";
import AttendanceSetupPage from "./pages/AttendanceSetupPage";
import MarkAttendancePage from "./pages/MarkAttendancePage";
import DashboardPage from "./pages/DashboardPage";
import ManageStudentsPage from "./pages/ManageStudentsPage";

function App() {
  const [setupData, setSetupData] = useState({});
  const [attendance, setAttendance] = useState({});
  const [students, setStudents] = useState([
    { sid: "101", name: "Rahul Kumar", email: "rahul@example.com", contact: "9999999999" },
    { sid: "102", name: "Priya Singh", email: "priya@example.com", contact: "8888888888" },
    { sid: "103", name: "Amit Sharma", email: "amit@example.com", contact: "7777777777" },
  ]);

  function handleSendEmail(absentStudents) {
    alert("Emails sent to: " + absentStudents.map(s => s.email).join(", "));
  }

  function handleDownloadReport(type) {
    alert(`Download ${type} report`);
    // Optionally: implement CSV export code
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={
          <CourseSelectPage onContinue={data => {
            setSetupData(data);
            window.location = "/setup";
          }} />
        }/>
        <Route path="/setup" element={
          <AttendanceSetupPage onContinue={data => {
            setSetupData(prev => ({ ...prev, ...data }));
            window.location = "/mark";
          }} />
        }/>
        <Route path="/mark" element={
          <MarkAttendancePage onSave={att => {
            setAttendance(att);
            window.location = "/dashboard";
          }} />
        }/>
        <Route path="/dashboard" element={
          <DashboardPage
            attendance={attendance}
            students={students}
            onSendEmail={handleSendEmail}
            onDownloadReport={handleDownloadReport}
          />
        }/>
        <Route path="/manage" element={
          <ManageStudentsPage />
        }/>
      </Routes>
    </Router>
  );
}

export default App;
