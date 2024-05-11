import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { selectAllTrips, getAllTrips } from "../../features/trip/tripSlice";
import {
  selectAllStudents,
  getAllStudents,
} from "../../features/student/studentSlice";
import type { StudentInfo as StudentInfoType } from "../../features/student/studentSlice";
import axios from "axios";
export const Trips = () => {
  let navigateTo = useNavigate();
  const dispatch = useDispatch();
  const allStudents = useSelector(selectAllStudents);
  const tripStatus = useSelector((state) => state.trips.status);
  const error = useSelector((state) => state.trips.error);
  useEffect(() => {
    if (tripStatus === "idle") dispatch(getAllStudents());
  }, [tripStatus, dispatch]);

  const onTripUpdate = (id: number) => {
    navigateTo("/update/" + id);
  };

  const onTripDelete = (id: number) => {
    navigateTo("/delete/" + id);
  };
  const renderAllStudentsTable = (students: StudentInfoType[]) => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.firstName}</td>
              <td>{student.lastName}</td>
              <td>{student.age}</td>

              <td>
                <div className="form-group">
                  <input
                    type="button"
                    value="Update"
                    className="btn btn-success"
                    onClick={() => onTripUpdate(student.id)}
                  />
                  <input
                    type="button"
                    value="Delete"
                    className="btn btn-danger"
                    onClick={() => onTripDelete(student.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  let content;
  if (tripStatus === "loading") {
    content = (
      <p>
        <em>Loading...</em>
      </p>
    );
  } else if (tripStatus === "succeeded") {
    content = renderAllStudentsTable(allStudents);
  } else if (tripStatus === "failed") {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h1>All trips</h1>
      <p>Here you will see a list of all trips.</p>
      {content}
    </div>
  );
};
