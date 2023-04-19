import axios from "axios";
import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

export default function Otherinfo() {
  const history = useHistory()
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [street, setstreet] = useState("");
  const [apartement, setapartement] = useState("");
  const [zip, setzip] = useState("");
  const [city, setcity] = useState("");
  const [country, setcountry] = useState("");

  const nameHandler = (e) => {
    setname(e.target.value);
  };
  const emailHandler = (e) => {
    setemail(e.target.value);
  };
  const phoneHandler = (e) => {
    setphone(e.target.value);
  };
  const streetHandler = (e) => {
    setstreet(e.target.value);
  };
  const apartementHandler = (e) => {
    setapartement(e.target.value);
  };
  const zipHandler = (e) => {
    setzip(e.target.value);
  };
  const cityHandler = (e) => {
    setcity(e.target.value);
  };
  const countryHandler = (e) => {
    setcountry(e.target.value);
  };

  const submitInfo = (e) => {
    e.preventDefault();
    axios
        .put(`http://localhost:5000/api/v1/users/${id}`, {
          name: name,
          email:email,
          phone:phone,
          street:street,
          apartement:apartement,
          zip:zip,
          city:city,
          country:country,
        },{
          headers:{
            Authorization:"Bearer " +token,
          }
        })
        .then((res) => {
          localStorage.removeItem('token')
          localStorage.removeItem('id')
          history.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
  };

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-md-5 mx-auto mb-5">
          <h1 className="display-6 fw-bolder text-center">Change Info</h1>
          <form onSubmit={submitInfo}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Name
              </label>
              <input
                value={name}
                onChange={nameHandler}
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email
              </label>
              <input
                value={email}
                onChange={emailHandler}
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Phone
              </label>
              <input
                value={phone}
                onChange={phoneHandler}
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Street
              </label>
              <input
                value={street}
                onChange={streetHandler}
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Apartement
              </label>
              <input
                value={apartement}
                onChange={apartementHandler}
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Zip
              </label>
              <input
                value={zip}
                onChange={zipHandler}
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                City
              </label>
              <input
                value={city}
                onChange={cityHandler}
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Country
              </label>
              <input
                value={country}
                onChange={countryHandler}
                type="text"
                class="form-control"
              />
            </div>
            <button type="submit" class="btn btn-outline-dark">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
