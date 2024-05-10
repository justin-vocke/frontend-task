import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const Create = () => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState(0);
  const [dateCompleted, setDateCompleted] = useState("");

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

  const onSubmit = (e) => {
    e.preventDefault();

    let studentObject = {
      firstName: firstName,
      lastName: lastName,
      age: age,
    };
    axios
      .post("https://localhost:7093/api/Trips/AddTrip", studentObject)
      .then((res) => {
        navigateTo("/trips");
      });
  };
  return (
    <div className="trip-from">
      <h3>Add new trip</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>First name: </label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={onChangeFirstName}
          />
        </div>
        <div className="form-group">
          <label>Last name: </label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={onChangeLastName}
          />
        </div>
        <div className="form-group">
          <label>Student age: </label>
          <input
            type="text"
            className="form-control"
            value={age}
            onChange={onChangeAge}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Add trip" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};
