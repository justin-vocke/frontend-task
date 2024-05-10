import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
//import { selectAllTrips, getAllTrips } from "../../features/trip/tripSlice";
import axios from "axios";
export const Trips = () => {
  let navigateTo = useNavigate();
  const dispatch = useDispatch();
  const allTrips = useSelector(selectAllTrips);
  const tripStatus = useSelector((state) => state.trips.status);
  const error = useSelector((state) => state.trips.error);
  useEffect(() => {
    if (tripStatus === "idle") dispatch(getAllTrips());
  }, [tripStatus, dispatch]);

  const onTripUpdate = (id) => {
    navigateTo("/update/" + id);
  };

  const onTripDelete = (id) => {
    navigateTo("/delete/" + id);
  };
  const renderAllTripsTable = (trips) => {
    return (
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date started</th>
            <th>Date completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.name}</td>
              <td>{trip.description}</td>
              <td>{new Date(trip.dateStarted).toISOString().slice(0, 10)}</td>
              <td>
                {trip.dateCompleted
                  ? new Date(trip.dateCompleted).toISOString().slice(0, 10)
                  : "-"}
              </td>
              <td>
                <div className="form-group">
                  <input
                    type="button"
                    value="Update"
                    className="btn btn-success"
                    onClick={() => onTripUpdate(trip.id)}
                  />
                  <input
                    type="button"
                    value="Delete"
                    className="btn btn-danger"
                    onClick={() => onTripDelete(trip.id)}
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
    content = renderAllTripsTable(allTrips);
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
