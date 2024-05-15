import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useAppSelector, useAppDispatch } from "../../hooks";

import axios from "axios";
export const Update = (props) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const params = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    getTripData();
  }, []);

  const getTripData = () => {
    const id = params.id;

    axios.get("https://localhost:7119/api/Student/" + id).then((res) => {
      const response = res.data;
      setfirstName(response.firstName);
      setLastName(response.lastName);
      setAge(response.age);
    });
  };
  let navigateTo = useNavigate();
  const onChangeFirstName = (e) => {
    setfirstName(e.target.value);
  };

  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };

  const onChangeAge = (e) => {
    setAge(e.target.value);
  };

  const onUpdateCancel = () => {
    navigateTo("/students");
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const id = params.id;

    const studentObject = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    axios
      .put("https://localhost:7119/api/Student/" + id, studentObject)
      .then((res) => {
        navigateTo("/students");
      });
  };
  return (
    <div className="trip-from">
      <h3>Update Student</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Student first name: </label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={onChangeFirstName}
          />
        </div>
        <div className="form-group">
          <label>Student last name: </label>
          <textarea
            className="form-control"
            value={lastName}
            onChange={onChangeLastName}
          />
        </div>
        <div className="row">
          <div className="col col-md-6 col-sm-6 col-xs-12">
            <div className="form-group">
              <label>Student age</label>
              <input
                type="date"
                className="form-control"
                value={age}
                onChange={onChangeAge}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <button onClick={onUpdateCancel} className="btn btn-default">
            Cancel
          </button>
          <button type="submit" className="btn btn-success">
            Update
          </button>
        </div>
      </form>
    </div>
  );
};
