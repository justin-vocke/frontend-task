import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "@reduxjs/toolkit/query";
import axios from "axios";

interface StudentInfo {
  firstName: string;
  lastName: string;
  age: number | null;
}
// Define a type for the slice state
interface StudentState {
  loading: boolean;
  status: string;
  hasError: boolean | null;
  error: string | null;
  data: StudentInfo[];
}

// Define the initial state using that type
const initialState: StudentState = {
  loading: false,
  status: "idle",
  hasError: false,
  error: null,
  data: [],
};
export const studentSlice = createSlice({
  name: "students",
  initialState: {
    loading: false,
    status: "idle",
    hasError: false,
    error: null,
    data: [],
  },
  reducers: {
    getStudentsSuccess: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.hasError = false;
      state.loading = false;
      state.data = action.payload;
    },
    getStudentsError: (state, action) => {
      state.loading = false;
      state.hasError = true;
      state.error = action.payload;
    },
    getAllStudentsRequest: (state) => {
      state.loading = true;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getAllStudents.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(getAllStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.hasError = false;
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getAllStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        state.loading = false;
        state.hasError = true;
      });
  },
});

export const { getTripsSuccess, getTripsError, getAllTripsRequest } =
  tripSlice.actions;

export const getAllStudents = createAsyncThunk(
  "trips/getAllTrips",
  async () => {
    const response = await axios.get(
      "https://localhost:7093/api/Trips/GetTrips"
    );
    return response.data;
  }
);

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAllTrips = (state: RootState) => state.trips.data;

export default studentSlice.reducer;
