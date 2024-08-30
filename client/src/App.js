import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import EmployeesInTraining from './components/EmployeesInTraining';
import EmployeeTrainingStatus from './components/EmployeeTrainingStatus';
import CertificationResults from './components/CertificationResults';
import EmployeeListing from './components/EmployeeListing';
import UpcomingReviews from './components/UpcomingReviews';
import LCSClassroom from './components/LCSClassroom';
import logo from './LCS_Logo_FullColor_Web.png'; // Import the logo image
import './App.css'; // Ensure the CSS file is correctly imported

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="nav-bar">
          <div className="logo-container">
            <img src={logo} alt="LCS Logo" className="logo" /> {/* Logo added here */}
          </div>
          <ul className="nav-links">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/employees-in-training">Employees In Training</Link>
            </li>
            <li>
              <Link to="/training-status">Employee Training Status</Link>
            </li>
            <li>
              <Link to="/certification-results">Certification Results</Link>
            </li>
            <li>
              <Link to="/employee-listing">Employee Listing</Link>
            </li>
            <li>
              <Link to="/upcoming-reviews">Upcoming Reviews</Link>
            </li>
            <li>
              <Link to="/lcs-classroom">LCS Classroom</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees-in-training" element={<EmployeesInTraining />} />
          <Route path="/training-status" element={<EmployeeTrainingStatus />} />
          <Route path="/certification-results" element={<CertificationResults />} />
          <Route path="/employee-listing" element={<EmployeeListing />} />
          <Route path="/upcoming-reviews" element={<UpcomingReviews />} />
          <Route path="/lcs-classroom" element={<LCSClassroom />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
