import { jwtDecode } from "jwt-decode";
import customFetch from "./axiosObject";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  BACK_RESET_PASSWORD,
  BACK_SIGNIN,
  BACK_SIGNUP,
  RESET_PASSWORD,
  SIGNIN,
  USER_ROLE,
} from "../paths";

const initialState = {
  userMessage: "",
  loading: false,
  accessToken: "",
  isAuth: false,
  myRole: USER_ROLE,
  currentPath: "",
  myProfile: {},
  alertError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserMsg: (state) => {
      state.userMessage = "";
    },
    setAuth: (state) => {
      state.isAuth = false;
    },
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
    setMyProfile: (state, action) => {
      state.myProfile = action.payload;
      state.myRole = state.myProfile.permissionLev;
      state.isAuth = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        console.log("creating user...");
        state.loading = true;
        state.userMessage = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        console.log({ action });
        console.log("user created...");
        if (!action.payload.status) {
          console.log(action.payload.message);
          state.userMessage = action.payload.message;
          state.alertError = true;
        } else {
          state.userMessage =
            "A confirmation Link has been sent to your mailbox.";

          window.location.href = SIGNIN;
        }
        state.loading = false;
      })
      .addCase(createUser.rejected, (state) => {
        console.log("user could not be created...");
        state.userMessage = "user could not be created...";
        state.loading = false;
      })
      .addCase(getUser.pending, (state) => {
        console.log("authenticating user...");
        state.userMessage = "";

        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        if (!action.payload.status) {
          state.isAuth = false; //
          state.alertError = true; //
          state.userMessage = action.payload.message;
          return;
        }

        const { accessToken, refreshToken } = action.payload;

        state.accessToken = accessToken;

        state.myProfile = jwtDecode(accessToken);
        state.myRole = state.myProfile.permissionLev;

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        setTimeout(() => console.log("login..."), 500);

        state.alertError = false; //

        state.isAuth = true;

        // window.location.href = state.currentPath || "/";
      })
      .addCase(getUser.rejected, (state) => {
        console.log("could not fetch user...");
        state.userMessage = "Error occured while getting user!";
        state.alertError = true;
        state.loading = false;
      })
      .addCase(resetPassword.pending, (state) => {
        console.log("sending request to reset password...");
        state.loading = true;
        state.userMessage = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        if (!action.payload.status) {
          state.alertError = true;
          if (action.payload.message === "jwt expired") {
            state.userMessage = "You're using an expired Link";
          } else {
            state.userMessage = action.payload.message;
          }
          state.alertError = true;
          state.userMessage = "Password Reset Successful!";
          return;
        }
      })
      .addCase(resetPassword.rejected, (state) => {
        console.log("could not fetch user...");
        state.loading = false;
        state.alertError = true;
        state.userMessage = "could not fetch user...";
      });
  },
});

export const getUser = createAsyncThunk("crud/getUser", async (credentials) => {
  try {
    const response = await customFetch.post(BACK_SIGNIN, credentials);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const createUser = createAsyncThunk(
  "crud/createUser",
  async (credentials) => {
    try {
      const response = await customFetch.post(BACK_SIGNUP, credentials);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "crud/resetPassword",
  async (values) => {
    try {
      const response = await customFetch.post(BACK_RESET_PASSWORD, values);
      console.log({ values, res: response.data });
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const { clearUserMsg, setCurrentPath, setMyProfile, setAuth } =
  userSlice.actions;

export default userSlice.reducer;
