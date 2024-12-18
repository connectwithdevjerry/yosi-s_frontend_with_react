import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import customFetch from "./axiosObject";
import {
  ADMIN_ROLE,
  BASE_URL,
  GET_CLASSES,
  GET_CLASSES_ADMIN,
  GET_FILTERED_CLASSES,
  GET_USERS,
  INSTRUCTOR_ROLE,
  USER_ROLE,
} from "../paths";

const initialState = {
  all_classes: [],
  myFilteredClasses: [],
  classMessage: "",
  loading: false,
  inappLoading: false,
  prevPath: "/",
};

// slice
export const myClassSlice = createSlice({
  name: "myClass",
  initialState,
  reducers: {
    // handleCheckOut: (state, action) => {
    //   console.log("this is handlecheckout function!");
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllClasses.pending, (state) => {
        console.log("getting all classes...");
        state.loading = true;
        state.classMessage = "";
      })
      .addCase(getAllClasses.fulfilled, (state, action) => {
        console.log("getting all classes...");
        state.loading = false;
        if (!action?.payload?.status) {
          state.classMessage = "No classes found!";
          return;
        }
        state.all_classes = action.payload?.data;
        console.log("all classes", action);
      })
      .addCase(getAllClasses.rejected, (state) => {
        console.log("couldn't get classes...");
        state.loading = false;
        state.classMessage = "Error Loading Product";
      })
      .addCase(getFilteredClasses.pending, (state) => {
        console.log("getting filtered classes...");
        state.loading = true;
        state.classMessage = "";
      })
      .addCase(getFilteredClasses.fulfilled, (state, action) => {
        console.log("getting filtered classes...");
        state.loading = false;
        if (!action?.payload?.status) {
          state.classMessage = "No classes found!";
          return;
        }
        state.myFilteredClasses = action.payload?.data;
        console.log("all classes", action);
      })
      .addCase(getFilteredClasses.rejected, (state) => {
        console.log("couldn't get classes...");
        state.loading = false;
        state.classMessage = "Error Loading Product";
      });

    // .addCase(handleRemoveFromCart.pending, (state) => {
    //   state.productsError = "";
    //   state.inappLoading = true;
    // })
    // .addCase(handleRemoveFromCart.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   if (!action.payload.data.status) {
    //     state.productsError = "Product already in cart!";
    //     alert(state.productsError);
    //   } else {
    //     const updated = state.orderDetails.items.filter(
    //       (item) => item.id._id != action.payload.productId
    //     );
    //     state.orderDetails.items = updated;
    //     state.orderDetails.subtotal = action.payload.data?.totalPrice;
    //   }
    //   state.inappLoading = false;
    // })
    // .addCase(handleRemoveFromCart.rejected, (state) => {
    //   state.inappLoading = false;
    //   state.productsError = "Couldn't remove product from cart!";
    //   alert(state.productsError);
    // });
  },
});

export const getUsers = createAsyncThunk("myClass/getUsers", async () => {
  // const permissions = [ADMIN_ROLE, INSTRUCTOR_ROLE];
  try {
    const response = await customFetch.post(`${BASE_URL}${GET_USERS}`);
    console.log({ users: response?.data });
    return response?.data;
  } catch (error) {
    console.error(error);
  }
});

export const getAllClasses = createAsyncThunk(
  "myClass/getAllClasses",
  async (role) => {
    const permissions = [ADMIN_ROLE, INSTRUCTOR_ROLE];

    const url = `${BASE_URL}${
      permissions.includes(role) ? GET_CLASSES_ADMIN : GET_CLASSES
    }`;

    try {
      const response = await customFetch.get(url);
      console.log({ myFilteredClasses: response?.data });
      return response?.data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const getFilteredClasses = createAsyncThunk(
  "myClass/getFilteredClasses",
  async (values) => {
    const url = `${BASE_URL}${GET_FILTERED_CLASSES}/${values.ageMin}/${values.ageMax}`;

    try {
      const response = await customFetch.get(url);
      console.log({ myFilteredClasses: response?.data });
      return response?.data;
    } catch (error) {
      console.error(error);
      return;
    }
  }
);

export const { getCartItems, handleCheckOut } = myClassSlice.actions;

export default myClassSlice.reducer;
