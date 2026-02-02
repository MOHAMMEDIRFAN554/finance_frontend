import { useDispatch } from "react-redux";
import { login } from "./authSlice";
import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await dispatch(login({ email, password })).unwrap();
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <AuthLayout title="Login">
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={submit}>
        <input className="form-control mb-3" placeholder="Email"
          onChange={e => setEmail(e.target.value)} />
        <input className="form-control mb-3" type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-primary w-100 mb-3">Login</button>
      </form>

      <div className="text-center">
        New user? <Link to="/register">Register</Link>
        <br />
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </AuthLayout>
  );
}
