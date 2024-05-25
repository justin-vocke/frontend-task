import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { loginRequest, protectedResources } from "../../authConfig";
import useFetchWithMsal from "../../hooks/useFetchWithMsal";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";

import { useNavigate } from "react-router-dom";
//import { selectAllTrips, getAllTrips } from "../../features/trip/tripSlice";
import {
  selectAllStudents,
  getAllStudents,
} from "../../features/student/studentSlice";
//import type { StudentInfo as StudentInfoType } from "../../features/student/studentSlice";

const Students = () => {
  const { error, execute } = useFetchWithMsal({
    scopes: protectedResources.studentAPI.scopes.read,
  });
  const [studentList, setStudentList] = useState(null);
  const navigateTo = useNavigate();
  const dispatch = useAppDispatch();
  const allStudents = useSelector(selectAllStudents);
  const tripStatus = useAppSelector((state) => state.students.status);
  const studentLoadError = useAppSelector((state) => state.students.error);
  useEffect(() => {
    //if (tripStatus === "idle") dispatch(getAllStudents());
    if (!studentList) {
      execute("GET", protectedResources.studentAPI.endpoint).then(
        (response) => {
          console.log("response is " + response);
          setStudentList(response);
        }
      );
    }
  }, [execute, studentList]);

  const onTripUpdate = (id) => {
    navigateTo("/update/" + id);
  };

  const onTripDelete = (id) => {
    navigateTo("/delete/" + id);
  };
  const renderAllStudentsTable = (students) => {
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
    content = renderAllStudentsTable(studentList);
  } else if (tripStatus === "failed") {
    content = <div>{studentLoadError}</div>;
  }

  return (
    <div>
      <h1>All trips</h1>
      <p>Here you will see a list of all trips.</p>
      {content}
    </div>
  );
};

/**
 * The `MsalAuthenticationTemplate` component will render its children if a user is authenticated
 * or attempt to sign a user in. Just provide it with the interaction type you would like to use
 * (redirect or popup) and optionally a request object to be passed to the login API, a component to display while
 * authentication is in progress or a component to display if an error occurs. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const StudentList = () => {
  const authRequest = {
    ...loginRequest,
  };

  return (
    <MsalAuthenticationTemplate
      interactionType={InteractionType.Redirect}
      authenticationRequest={authRequest}
    >
      <Students />
    </MsalAuthenticationTemplate>
  );
};
