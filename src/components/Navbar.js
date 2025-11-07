import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{background:"#1d3557",color:"#fff", padding:"12px 32px", marginBottom:20, display: "flex", gap: 24}}>
      <Link to="/" style={{color:"#fff", textDecoration:"none", fontWeight:800}}>Attendance</Link>
      <Link to="/dashboard" style={{color:"#fff", textDecoration:"none"}}>Dashboard</Link>
      <Link to="/manage" style={{color:"#fff", textDecoration:"none"}}>Manage Students</Link>
    </nav>
  );
}
export default Navbar;
