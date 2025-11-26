import React from "react";
import  { useState } from "react";
import './Registration.css';

function Registration() {
    const [registrationDetails, setRegistrationDetails] = useState({
        name: '',
        phoneNumber: '',
        emailAddress: '',
        password: ''
    });

    function handleInput(e) {
        const { name, value } = e.target;
        setRegistrationDetails(prev => ({
            ...prev,
            [name]: value
        }));
    }

    function Register() {
        fetch("http://localhost:3000/user/registration", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registrationDetails),
        })
        .then(res => {
            if (res.ok) {
                alert(" Registered successfully!");
                return res.json(); // Continue to parse the response if needed
            } else {
                alert("Registration failed. Please try again.");
            }
        })
        .then(data => console.log("Server Response:", data))
        .catch(err => {
            console.error("Error:", err);
            alert("Something went wrong. Please try again.");
        });
    }
    return (
        <div className="login-page">
            <form className="login-form d-flex flex-column row-gap-2 justify-content-center">
                <h1>Please Register</h1>

                <div className="form-floating mb-3">
                    <input
                        type="text"
                        className="form-control"
                        id="floatingName"
                        placeholder="Enter your name"
                        name="name"
                        onChange={handleInput}
                        value={registrationDetails.name}
                    />
                    <label htmlFor="floatingName">Name</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="tel"
                        className="form-control"
                        id="floatingPhone"
                        placeholder="Enter phone number"
                        name="phoneNumber"
                        onChange={handleInput}
                        value={registrationDetails.phoneNumber}
                    />
                    <label htmlFor="floatingPhone">Phone Number</label>
                </div>

                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        id="floatingEmail"
                        placeholder="Enter email address"
                        name="emailAddress"
                        onChange={handleInput}
                        value={registrationDetails.emailAddress}
                    />
                    <label htmlFor="floatingEmail">Email address</label>
                </div>

                <div className="form-floating">
                    <input
                        type="password"
                        className="form-control"
                        id="floatingPassword"
                        placeholder="Password"
                        name="password"
                        onChange={handleInput}
                        value={registrationDetails.password}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <button
                    className="btn btn-success w-100 mt-3"
                    onClick={Register}
                    type="button"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Registration;
