import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import AuthLayout from "./AuthLayout";

export default function ResetPassword() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const navigate = useNavigate();

    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/reset-password", { email, otp, newPassword });
            setMessage("Password reset successful! Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Reset failed");
        }
    };

    return (
        <AuthLayout title="Reset Password">
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={submit}>
                <input
                    className="form-control mb-3"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <input
                    className="form-control mb-3"
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
                <button className="btn btn-primary w-100 mb-3">Reset Password</button>
            </form>
        </AuthLayout>
    );
}
