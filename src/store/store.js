import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./taskSlice";
import authReducer from "./authSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
    profile: profileReducer,
  },
});
