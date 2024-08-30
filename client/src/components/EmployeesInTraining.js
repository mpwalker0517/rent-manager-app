import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EmployeesInTraining = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the backend
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees-in-training'); // Ensure the port matches your backend
        setEmployees(response.data);
      } catch (error) {
        setError('Failed to fetch employees in training');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="employees-in-training">
      <h2>Employees in Training</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Template</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index) => (
              <tr key={index}>
                <td>{employee.Name}</td>
                <td>General</td> {/* Assuming "General" is the template name for all */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeesInTraining;
