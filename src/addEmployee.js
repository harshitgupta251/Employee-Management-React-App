import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addEmployee.css';
import Modal from "react-modal";

Modal.setAppElement("#root");

const AddEmployeeForm = ({ setEmployeeData, employeeDetailsList, setEmployeeDetailsList,
    firstName, setFirstName, lastName, setLastName, emailId, setEmailId, phoneNo, setPhoneNo
    , domain, setDomain, isEditMode, idx }) => {

    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);

    let empData = {
        firstName: firstName,
        lastName: lastName,
        email: emailId,
        phone: phoneNo,
        domain: domain
    };

    let isEmailValidated = false, isPhoneNumberValidated = false;

    const checkValidation = () => {
        const numbers = /[0-9]{10}/;
        const emailValidationExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        const isNumber = numbers.test(phoneNo);
        const isEmail = emailValidationExp.test(emailId);

        if (!isEmail && emailId.length > 0) {
            document.getElementById('validation_emp_email_msg').classList.remove('hide');
            isEmailValidated = false;
        }

        if (!isNumber && phoneNo.length > 0) {
            document.getElementById('validation_phone_msg').classList.remove('hide');
            isPhoneNumberValidated = false;
        }

        if (isEmail) {
            document.getElementById('validation_emp_email_msg').classList.add('hide');
            isEmailValidated = true;
        }

        if (isNumber && phoneNo.length > 0) {
            document.getElementById('validation_phone_msg').classList.add('hide');
            isPhoneNumberValidated = true;
        }
    }

    const handleSubmit = (e) => {
        checkValidation();
        e.preventDefault();
        if (isEmailValidated && isPhoneNumberValidated) {
            toggleModal();
        }
    }

    const handleDiscard = () => {
        setFirstName('');
        setLastName('');
        setEmailId('');
        setPhoneNo('');
        setDomain('');
        document.getElementById('validation_emp_email_msg').classList.add('hide');
        document.getElementById('validation_phone_msg').classList.add('hide');
        if (employeeDetailsList.length) {
            navigate('/employeeList')
        }
    }

    const toggleModal = () => {
        setIsOpen(!isOpen);
    }

    const handleConfirm = () => {
        const newStoredList = JSON.parse(localStorage.getItem('employeeList'));
        if (isEditMode) {
            newStoredList.splice(idx, 0, empData);
            localStorage.setItem('employeeList', JSON.stringify(newStoredList));
            setEmployeeDetailsList(newStoredList);
        } else {
            setEmployeeData(empData);
            setEmployeeDetailsList([...newStoredList, empData]);
            localStorage.setItem('employeeList', JSON.stringify([...newStoredList, empData]));
        }

        navigate('/employeeList');
    }

    return (
        <div className='home_page'>
            <div className='main_text'>ADD EMPLOYEE</div>
            <div className='employee_form'>
                <form onSubmit={handleSubmit}>
                    <div className='form_component'>
                        <input type="text" required placeholder='FIRST NAME' value={firstName} onChange={(e) => { setFirstName(e.target.value); }} />
                        <input type="text" required placeholder='LAST NAME' value={lastName} onChange={(e) => { setLastName(e.target.value); }} />
                    </div>
                    <div className='form_component'>
                        <input type="text" required placeholder='EMAIL ID' value={emailId} onChange={(e) => { setEmailId(e.target.value); }} />
                        <p className='hide' id='validation_emp_email_msg'>ENTER VALID EMAIL ADDRESS</p>
                        <input type="text" required placeholder='PHONE NO' value={phoneNo} onChange={(e) => { setPhoneNo(e.target.value); }} />
                        <p className='hide' id='validation_phone_msg'>ENTER VALID PHONE NUMBER</p>
                    </div>
                    <div className='form_component'>
                        <select required value={domain} onChange={(e) => setDomain(e.target.value)}>
                            <option value="" disabled selected>DOMAIN</option>
                            <option value="Operations">Operations</option>
                            <option value="Development">Development</option>
                            <option value="Devops">Devops</option>
                            <option value="Testing">Testing</option>
                        </select>
                    </div>
                    <div className='form_component'>
                        <input type="button" value="DISCARD" className='discard_btn' onClick={handleDiscard} />
                        <input type="submit" value="SUBMIT" className='submit_btn' />
                    </div>
                    <Modal
                        isOpen={isOpen}
                        onRequestClose={toggleModal}
                        contentLabel="My dialog"
                        className="modal"
                    >
                        <div className=''>
                            <h1>ARE YOU SURE?</h1>
                            <div className='modal_btn'>
                                <button onClick={toggleModal} className='cancel_btn'>CANCEL</button>
                                <button onClick={handleConfirm} className='confirm_btn'>CONFIRM</button>
                            </div>
                        </div>
                    </Modal>
                </form>
            </div>
        </div>
    )
}

export default AddEmployeeForm  