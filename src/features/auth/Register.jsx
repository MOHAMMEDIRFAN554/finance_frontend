import { useState } from "react";
import api from "../../services/api";
import { useNavigate, Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await api.post("/auth/register", { name, email, password });
      navigate(`/verify-otp?email=${email}`);
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout title="Register">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit}>
        <input className="form-control mb-3" placeholder="Name"
          onChange={e => setName(e.target.value)} />
        <input className="form-control mb-3" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />
        <input className="form-control mb-3" type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-success w-100 mb-3">Register</button>
      </form>

      <div className="text-center">
        Already registered? <Link to="/login">Login</Link>
      </div>
    </AuthLayout>
  );
}
