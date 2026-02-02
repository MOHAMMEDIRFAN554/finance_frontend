import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import VerifyOtp from "./features/auth/VerifyOtp";
import ForgotPassword from "./features/auth/ForgotPassword";
import ResetPassword from "./features/auth/ResetPassword";
import Dashboard from "./features/dashboard/Dashboard";
import AddIncome from "./features/income/AddIncome";
import AddExpense from "./features/expense/AddExpense";
import History from "./features/history/History";
import Reports from "./features/reports/Reports";
import Categories from "./features/others/Categories";
import Banks from "./features/others/Banks";
import AppNavbar from "./components/Navbar";

import { setAuthTrue } from "./features/auth/authSlice";

export default function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuth);

  // ✅ FIX: keep login on refresh
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(setAuthTrue());
    }
  }, [dispatch]);

  return (
    <>
      {/* Navbar ONLY after login */}
      {isAuth && <AppNavbar />}

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={!isAuth ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/register"
          element={!isAuth ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/verify-otp"
          element={!isAuth ? <VerifyOtp /> : <Navigate to="/" />}
        />
        <Route
          path="/forgot-password"
          element={!isAuth ? <ForgotPassword /> : <Navigate to="/" />}
        />
        <Route
          path="/reset-password"
          element={!isAuth ? <ResetPassword /> : <Navigate to="/" />}
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={isAuth ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/income"
          element={isAuth ? <AddIncome /> : <Navigate to="/login" />}
        />
        <Route
          path="/expense"
          element={isAuth ? <AddExpense /> : <Navigate to="/login" />}
        />
        <Route
          path="/history"
          element={isAuth ? <History /> : <Navigate to="/login" />}
        />
        <Route
          path="/reports"
          element={isAuth ? <Reports /> : <Navigate to="/login" />}
        />
        <Route
          path="/others/categories"
          element={isAuth ? <Categories /> : <Navigate to="/login" />}
        />
        <Route
          path="/others/banks"
          element={isAuth ? <Banks /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
