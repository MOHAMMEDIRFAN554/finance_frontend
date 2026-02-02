import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import AuthLayout from "./AuthLayout";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");
        try {
            await api.post("/auth/forgot-password", { email });
            setMessage("OTP sent to your email. Redirecting...");
            setTimeout(() => {
                window.location.href = `/reset-password?email=${email}`;
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Request failed");
        }
    };

    return (
        <AuthLayout title="Forgot Password">
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={submit}>
                <input
                    className="form-control mb-3"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="btn btn-warning w-100 mb-3">Send OTP</button>
            </form>

            <div className="text-center">
                <Link to="/login">Back to Login</Link>
            </div>
        </AuthLayout>
    );
}
