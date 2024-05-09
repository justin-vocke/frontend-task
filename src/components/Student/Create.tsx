import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export const Create = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [dateStarted, setDateStarted] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");

  let navigateTo = useNavigate();

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangeDateStarted = (e) => {
    setDateStarted(e.target.value);
  };

  const onChangeDescription = (e) => {
    setDescription(e.target.value);
  };

  const onChangeDateCompleted = (e) => {
    setDateCompleted(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let tripObject = {
      name: name,
      description: description,
      dateStarted: dateStarted,
      dateCompleted: dateCompleted,
    };
    axios
      .post("https://localhost:7093/api/Trips/AddTrip", tripObject)
      .then((res) => {
        navigateTo("/trips");
      });
  };
  return (
    <div className="trip-from">
      <h3>Add new trip</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Trip name: </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={onChangeName}
          />
          {console.log(description)}
        </div>
        <div className="form-group">
          <label>Trip description: </label>
          <textarea
            type="text"
            className="form-control"
            value={description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="row">
          <div className="col col-md-6 col-sm-6 col-xs-12">
            <div className="form-group">
              <label>Date of start: </label>
              <input
                type="date"
                className="form-control"
                value={dateStarted}
                onChange={onChangeDateStarted}
              />
            </div>
          </div>
          <div className="col col-md-6 col-sm-6 col-xs-12">
            <div className="form-group">
              <label>Date of completion: </label>
              <input
                type="date"
                className="form-control"
                value={dateCompleted}
                onChange={onChangeDateCompleted}
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Add trip" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};
