import { useDispatch } from "react-redux";
import { login } from "./authSlice";
import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <AuthLayout title="Login">
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
      </div>
    </AuthLayout>
  );
}
