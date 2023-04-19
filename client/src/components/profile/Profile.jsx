import axios from "axios";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setuser] = useState({});
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/users/${id}`,{
        headers:{
          Authorization:"Bearer " +token,
        }
      })
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-md-5 mx-auto mb-5">
          <label for="input" class="form-label">
            Name:    {user.name}
          </label>
          <br></br>
          <label for="input" class="form-label">
            email:   {user.email}
          </label>
          <br></br>
          <label for="input" class="form-label">
            phone:   {user.phone}
          </label>
          <br></br>
          <label for="input" class="form-label">
            street:   {user.street}
          </label>
          <br></br>
          <label for="input" class="form-label">
            apartment:   {user.apartement}
          </label>
          <br></br>
          <label for="input" class="form-label">
            zip:   {user.zip}
          </label>
          <br></br>
          <label for="input" class="form-label">
            city:   {user.city}
          </label>
          <br></br>
          <label for="input" class="form-label">
            country:   {user.country}
          </label>
          <br></br>
          <NavLink type="button" class="btn btn-outline-dark" to="/passwordchange">
            Change Password
          </NavLink>
          <NavLink type="button" class="btn btn-outline-dark ms-2" to="/infochange">
            Change Other Info
          </NavLink>
        </div>
      </div>
    </div>
  );
}
