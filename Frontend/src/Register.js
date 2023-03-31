import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import config from "./Configuration";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.ServerEndpoint}/signup`, {
        name,
        email,
        password,
        confirmPassword,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="form-control">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
      </div>
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
          minLength="6"
          required
        />
      </div>
      <div className="form-control">
        <label>Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          minLength="6"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Register
      </button>
    </form>
  );
};

export default Register;
