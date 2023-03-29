import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './employeeList.css';
import vector from './Vector.png';
import Modal from "react-modal";

const EmployeeList = ({ setEmployeeDetailsList, setFirstName, setLastName, setEmailId, setPhoneNo,
  setDomain, setIsEditMode, idx, setIdx }) => {

  const navigate = useNavigate();

  const loggedInUserEmail = localStorage.getItem('email');
  const storedEmployeeList = JSON.parse(localStorage.getItem('employeeList'));

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleMenu = () => {
    const userInfo = document.getElementById('user_info');
    if (isMenuOpen) {
      userInfo.classList.add('hide')
      setIsMenuOpen(false);
    } else {
      userInfo.classList.remove('hide');
      setIsMenuOpen(true);
    }
  }

  const handleLogout = () => {
    navigate("/");
    localStorage.removeItem("email");
  };

  const handleAdd = () => {
    setFirstName("");
    setLastName("");
    setEmailId("");
    setPhoneNo("");
    setDomain("");

    setIsEditMode(false);

    navigate('/addEmployee');
  }

  const handleEdit = async (employeeData) => {

    const updatedStoredList = storedEmployeeList.filter((data) => data.email !== employeeData.email)
    localStorage.setItem('employeeList', JSON.stringify(updatedStoredList));
    setEmployeeDetailsList(updatedStoredList);

    setIsEditMode(true);

    setFirstName(employeeData.firstName);
    setLastName(employeeData.lastName);
    setEmailId(employeeData.email);
    setPhoneNo(employeeData.phone);
    setDomain(employeeData.domain);

    navigate("/addEmployee");

  }

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  }

  const handleDelete = () => {
    toggleModal();
  }

  const handleConfirm = () => {
    storedEmployeeList.splice(idx, 1);
    localStorage.setItem('employeeList', JSON.stringify(storedEmployeeList));
    setEmployeeDetailsList(storedEmployeeList);
    toggleModal();
  }

  return (
    <>
      <nav>
        <h1>List of employees</h1>
        <img src={vector} alt="" onClick={handleMenu} />
      </nav>
      <div id="user_info" className="hide" value={isMenuOpen}>
        <p className="user_email">{loggedInUserEmail}</p>
        <button className="logout_btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className='employee_info'>
        <button className="add_btn" onClick={handleAdd}>ADD</button>
        <div className="employee_list">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email ID</th>
                <th>Phone No</th>
                <th>Domain</th>
                <th colSpan="2">Action</th>
              </tr>
            </thead>
            <tbody>
              {storedEmployeeList.map((employeeData, index) => {
                return (
                  <tr className="emp_row" key={index}>
                    <td>{employeeData?.firstName + " " + employeeData?.lastName}</td>
                    <td>{employeeData?.email}</td>
                    <td>{employeeData?.phone.replace(/.(?=.{4,}$)/g, "*")}</td>
                    <td>{employeeData?.domain}</td>
                    <td className="edit_btn" onClick={() => { setIdx(index); handleEdit(employeeData); }}>Edit</td>
                    <td className="delete_btn" onClick={() => { handleDelete(); setIdx(index); }}>Delete</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={toggleModal}
            contentLabel="My dialog"
            className="modal"
          >
            <div>
              <h1>ARE YOU SURE?</h1>
              <div className='modal_btn'>
                <button onClick={toggleModal} className='cancel_btn'>CANCEL</button>
                <button onClick={handleConfirm} className='confirm_btn'>CONFIRM</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;