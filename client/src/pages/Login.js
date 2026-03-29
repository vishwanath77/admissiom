import { useState } from "react";
import { toast } from "react-toastify";

import API from "../services/api";

export default function Login({ setIsAuth }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const login = async () => {
    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      toast.success("Login successful!");

      setIsAuth(true);
    } catch (e) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Admission CRM</h2>
        <p className="subtitle">Login to continue</p>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={login}>Login</button>
      </div>
    </div>
  );
}
