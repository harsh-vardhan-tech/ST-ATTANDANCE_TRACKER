// src/pages/CourseSelectPage.js
import React, { useState } from "react";

// dummy initial data
const initialCourses = [
  { name: "B.Tech CSE", years: [1, 2, 3, 4], semesters: [1,2,3,4,5,6,7,8], subjects: [["Maths","Python"],["DBMS","OOP"],[],[],[],[],[],[]] },
  { name: "B.Tech Agriculture", years: [1, 2, 3, 4], semesters: [1,2,3,4,5,6,7,8], subjects: [[],[],[],[],[],[],[],[]] },
];

function CourseSelectPage({ onContinue }) {
  const [courses, setCourses] = useState(initialCourses);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [newCourse, setNewCourse] = useState("");
  const [newYear, setNewYear] = useState("");
  const [newSemester, setNewSemester] = useState("");
  const [newSubject, setNewSubject] = useState("");

  // Add course dynamically
  function handleAddCourse() {
    if (newCourse.trim()) {
      setCourses([...courses, { name: newCourse, years: [], semesters: [], subjects: [] }]);
      setNewCourse("");
    }
  }

  // Add year dynamically in course
  function handleAddYear() {
    if (selectedCourse && newYear) {
      const updated = courses.map(course =>
        course.name === selectedCourse
          ? { ...course, years: [...course.years, Number(newYear)] }
          : course
      );
      setCourses(updated);
      setNewYear("");
    }
  }

  // Add semester in course
  function handleAddSemester() {
    if (selectedCourse && newSemester && selectedYear) {
      const updated = courses.map(course =>
        course.name === selectedCourse
          ? { 
              ...course, 
              semesters: [...course.semesters, Number(newSemester)], 
              subjects: [...course.subjects, []] // new sem, no subjects
            }
          : course
      );
      setCourses(updated);
      setNewSemester("");
    }
  }

  // Add subject in course-year-sem
  function handleAddSubject() {
    if (selectedCourse && selectedYear && selectedSemester && newSubject) {
      const ci = courses.findIndex(c => c.name === selectedCourse);
      const si = courses[ci].semesters.findIndex(s => s === Number(selectedSemester));
      let updatedCourses = courses.slice();
      updatedCourses[ci].subjects[si].push(newSubject);
      setCourses(updatedCourses);
      setNewSubject("");
      setSubjects(updatedCourses[ci].subjects[si]);
    }
  }

  // Load years when course changes
  function handleCourseChange(e) {
    setSelectedCourse(e.target.value);
    const course = courses.find(c => c.name === e.target.value);
    setSubjectList(course?.subjects ?? []);
    setSelectedYear("");
    setSelectedSemester("");
    setSelectedSubject("");
    setSubjects([]);
  }

  // Load sems when year changes
  function handleYearChange(e) {
    setSelectedYear(e.target.value);
    setSelectedSemester("");
    setSelectedSubject("");
    setSubjects([]);
  }

  // Load subjects when sem changes
  function handleSemesterChange(e) {
    setSelectedSemester(e.target.value);
    const course = courses.find(c => c.name === selectedCourse);
    const semIdx = course?.semesters.findIndex(s => s === Number(e.target.value));
    setSubjects(course.subjects[semIdx] ?? []);
    setSelectedSubject("");
  }

  // Continue
  function handleContinue() {
    if (selectedCourse && selectedYear && selectedSemester && selectedSubject) {
      onContinue({ selectedCourse, selectedYear, selectedSemester, selectedSubject });
    } else {
      alert("Sab select karo pehle!");
    }
  }

  return (
    <div style={{width:420,padding:16,background:'#f5f6fa',borderRadius:12,margin:'40px auto'}}>
      <h2>Phase 1: Select/Add Course Details</h2>
      {/* Course Dropdown */}
      <div>
        <label>Course:</label>
        <select onChange={handleCourseChange} value={selectedCourse}>
          <option value="">Select Course</option>
          {courses.map(c => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))}
        </select>
        <input value={newCourse} onChange={e=>setNewCourse(e.target.value)} placeholder="Add new course" />
        <button onClick={handleAddCourse}>Add Course</button>
      </div>
      {/* Year Dropdown */}
      <div>
        <label>Year:</label>
        <select onChange={handleYearChange} value={selectedYear} disabled={!selectedCourse}>
          <option value="">Select Year</option>
          {selectedCourse && courses.find(x=>x.name===selectedCourse)?.years.map(y=>(
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <input value={newYear} onChange={e=>setNewYear(e.target.value)} placeholder="Add new year" type="number"/>
        <button onClick={handleAddYear} disabled={!selectedCourse}>Add Year</button>
      </div>
      {/* Semester Dropdown */}
      <div>
        <label>Semester:</label>
        <select onChange={handleSemesterChange} value={selectedSemester} disabled={!selectedYear}>
          <option value="">Select Semester</option>
          {selectedCourse && selectedYear && courses.find(x=>x.name===selectedCourse)?.semesters.map(s=>(
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <input value={newSemester} onChange={e=>setNewSemester(e.target.value)} placeholder="Add new semester" type="number"/>
        <button onClick={handleAddSemester} disabled={!selectedCourse || !selectedYear}>Add Semester</button>
      </div>
      {/* Subject Dropdown */}
      <div>
        <label>Subject:</label>
        <select onChange={e=>setSelectedSubject(e.target.value)} value={selectedSubject} disabled={!selectedSemester}>
          <option value="">Select Subject</option>
          {subjects.map(subj=>(
            <option key={subj} value={subj}>{subj}</option>
          ))}
        </select>
        <input value={newSubject} onChange={e=>setNewSubject(e.target.value)} placeholder="Add new subject"/>
        <button onClick={handleAddSubject} disabled={!selectedSemester}>Add Subject</button>
      </div>
      {/* Continue Button */}
      <button onClick={handleContinue} style={{marginTop:18}}>Continue &rarr;</button>
    </div>
  );
}

export default CourseSelectPage;
