import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div className="form-control">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-control">
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default Login;
