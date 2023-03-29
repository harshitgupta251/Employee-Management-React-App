import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import LoginForm from './login';
import AddEmployeeForm from './addEmployee';
import EmployeeList from './employeeList';

function App() {
  const [employeeData, setEmployeeData] = useState({});
  const [employeeDetailsList, setEmployeeDetailsList] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [domain, setDomain] = useState("");
  const [idx, setIdx] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginForm />} />
        <Route exact path="/addEmployee"
          element={ <AddEmployeeForm
            setEmployeeData={setEmployeeData}
            employeeDetailsList={employeeDetailsList} setEmployeeDetailsList={setEmployeeDetailsList}
            firstName={firstName} setFirstName={setFirstName}
            lastName={lastName} setLastName={setLastName}
            emailId={emailId} setEmailId={setEmailId}
            phoneNo={phoneNo} setPhoneNo={setPhoneNo}
            domain={domain} setDomain={setDomain}
            isEditMode={isEditMode}
            idx={idx} setIdx={setIdx}
          />} />
        <Route exact path="/employeeList"
          element={ <EmployeeList
            setEmployeeDetailsList={setEmployeeDetailsList}
            setFirstName={setFirstName}
            setLastName={setLastName}
            setEmailId={setEmailId}
            setPhoneNo={setPhoneNo}
            setDomain={setDomain}
            isEditMode={isEditMode}
            setIsEditMode={setIsEditMode}
            idx={idx} setIdx={setIdx}
          />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
