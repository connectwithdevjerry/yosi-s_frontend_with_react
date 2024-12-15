import { configureStore } from "@reduxjs/toolkit";
import myClassReducer from "./myClassSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: { myClass: myClassReducer, user: userReducer },
});
