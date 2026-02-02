import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../services/api";
import AuthLayout from "./AuthLayout";

export default function VerifyOtp() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const navigate = useNavigate();
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/verify-otp", { email, otp });
            navigate("/login");
        } catch (err) {
            setError(err.response?.data?.message || "Verification failed");
        }
    };

    const resend = async () => {
        try {
            await api.post("/auth/resend-otp", { email });
            setMessage("OTP resent successfully");
        } catch (err) {
            setError("Failed to resend OTP");
        }
    };

    return (
        <AuthLayout title="Verify OTP">
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            <p className="text-center text-muted mb-4">
                Enter the OTP sent to <strong>{email}</strong>
            </p>

            <form onSubmit={submit}>
                <input
                    className="form-control mb-3 text-center"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    maxLength={6}
                    onChange={(e) => setOtp(e.target.value)}
                />
                <button className="btn btn-primary w-100 mb-3">Verify</button>
            </form>

            <div className="text-center">
                <button className="btn btn-link" onClick={resend}>
                    Resend OTP
                </button>
            </div>
        </AuthLayout>
    );
}
