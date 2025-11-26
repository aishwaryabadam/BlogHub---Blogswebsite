import React, { useState } from "react";
import "./Login.css";

function Login() {
  const [loginForm, setLoginForm] = useState({
    emailAddress: "",
    password: "",
  });

  function handleInput(e) {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function login() {
    try {
      const response = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();
      console.log("Response from backend:", data);

      if (data.success) {
        // Save user ID in sessionStorage
        sessionStorage.setItem("UserID", data.user.id);
        sessionStorage.setItem("UserName", data.user.name);

        alert("Login successful! Redirecting to home...");
        window.location.href = "/"; // redirect after login
      } else {
        alert(`${data.message}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong, please try again!");
    }
  }

  return (
    <div className="login-page">
      <form
        className="login-form d-flex flex-column row-gap-2 justify-content-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1>Please Login</h1>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            name="emailAddress"
            placeholder="name@example.com"
            onChange={handleInput}
            value={loginForm.emailAddress}
          />
          <label>Email address</label>
        </div>

        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Password"
            onChange={handleInput}
            value={loginForm.password}
          />
          <label>Password</label>
        </div>

        <button className="btn btn-success w-100" type="button" onClick={login}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
