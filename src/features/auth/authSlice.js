import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* ---------- Async Actions ---------- */
export const login = createAsyncThunk(
  "auth/login",
  async (data) => {
    const res = await api.post("/auth/login", data);
    localStorage.setItem("accessToken", res.data.accessToken);
    return res.data;
  }
);

/* ---------- Initial State ---------- */
const initialState = {
  isAuth: !!localStorage.getItem("accessToken")
};

/* ---------- Slice ---------- */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthTrue: (state) => {
      state.isAuth = true;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.isAuth = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state) => {
      state.isAuth = true;
    });
  }
});

/* ---------- Exports ---------- */
export const { logout, setAuthTrue } = authSlice.actions;
export default authSlice.reducer;
