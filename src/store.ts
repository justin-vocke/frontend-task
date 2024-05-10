import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./features/student/studentSlice";

export const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {students: StudentState}
export type AppDispatch = typeof store.dispatch;
