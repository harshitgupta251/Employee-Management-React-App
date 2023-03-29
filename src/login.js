import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const LoginForm = () => {
    const navigate = useNavigate();

    const [emailId, setEmailId] = useState(() => {
        // getting stored value
        const storedEmail = localStorage.getItem("email");
        return storedEmail || "";
    });
    const [password, setPassword] = useState("");

    let isEmailValidated = false, isPasswordValidated = false;

    const checkValidation = () => {
        const lowerCaseLetters = /[a-z]/;
        const upperCaseLetters = /[A-Z]/;
        const numbers = /[0-9]/;
        const specialChar = /[#?!@$%^&*-]/;
        const minLength = /.{8,}/;
        const emailValidationExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
        const isUpperCase = upperCaseLetters.test(password);
        const isLowerCase = lowerCaseLetters.test(password);
        const isNumber = numbers.test(password);
        const isSpecialChar = specialChar.test(password);
        const isMinLength = minLength.test(password);
        const isEmail = emailValidationExp.test(emailId);

        if (!isEmail && emailId.length > 0) {
            document.getElementById('validation_email_msg').classList.remove('hide');
            isEmailValidated = false;
        }

        if ((!isLowerCase || !isUpperCase || !isNumber || !isMinLength || !isSpecialChar) && password.length > 0) {
            document.getElementById('validation_pass_msg').classList.remove('hide');
            isPasswordValidated = false;
        }

        if (isEmail) {
            document.getElementById('validation_email_msg').classList.add('hide');
            isEmailValidated = true;
        }

        if ((isLowerCase && isUpperCase && isNumber && isMinLength && isSpecialChar) && password.length > 0) {
            document.getElementById('validation_pass_msg').classList.add('hide');
            isPasswordValidated = true;
        }
    }

    const handleSubmit = (e) => {
        checkValidation();
        e.preventDefault();
        if (isEmailValidated && isPasswordValidated) {
            navigate('/employeeList');
        }
    }

    useEffect(() => {
        // storing input name
        localStorage.setItem("email", emailId);
    }, [emailId]);

    return (
        <div className='login_page'>
            <div className='welcome'>Welcome</div>
            <form onSubmit={handleSubmit}>
                <input type="text" className='login_input login_email' placeholder='USER ID' value={emailId} onChange={(e) => { setEmailId(e.target.value); }} />
                <p className='hide' id='validation_email_msg'>ENTER VALID EMAIL ADDRESS</p>
                <input type="password" className='login_input login_pass' placeholder='PASSWORD' value={password} onChange={(e) => { setPassword(e.target.value); }} />
                <p className='hide' id='validation_pass_msg'>8-16 characters , 1 Special Character, 1 Uppercase, 1 Lowercase, 1 number</p>
                <input type="submit" value="LOGIN" className='login_input login_button' />
            </form>
        </div>
    )
}

export default LoginForm  