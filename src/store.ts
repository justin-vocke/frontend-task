import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./features/student/studentSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {students: StudentsState}
export type AppDispatch = AppStore["dispatch"];
