import React, { useState } from "react";
import axios from "axios";

export default function Regsiter() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [apartement, setApartement] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const nameHandler = (event) => {
    setName(event.target.value);
  };
  const emailHandler = (event) => {
    setEmail(event.target.value);
  };
  const passwordHandler = (event) => {
    setPassword(event.target.value);
  };
  const password1Handler = (event) => {
    setPassword1(event.target.value);
  };
  const phoneHandler = (event) => {
    setPhone(event.target.value);
  };
  const streetHandler = (event) => {
    setStreet(event.target.value);
  };
  const apartementHandler = (event) => {
    setApartement(event.target.value);
  };
  const zipHandler = (event) => {
    setZip(event.target.value);
  };
  const cityHandler = (event) => {
    setCity(event.target.value);
  };
  const countryHandler = (event) => {
    setCountry(event.target.value);
  };

  function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const addUserHandler = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/v1/users/register", {
        name: name,
        email: email,
        password: password,
        phone: phone,
        city: city,
        country: country,
        street: street,
        zip: zip,
        apartment: apartement,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-md-5 mx-auto mb-5">
          <h1 className="display-6 fw-bolder text-center">Register</h1>
          <form onSubmit={addUserHandler}>
            <div class="mb-3">
              <label for="input" class="form-label">
                Name
              </label>
              <input
                onChange={nameHandler}
                value={name}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Email address
              </label>
              <input
                onChange={emailHandler}
                value={email}
                type="email"
                class="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                onChange={passwordHandler}
                value={password}
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Confirm Password
              </label>
              <input
                onChange={password1Handler}
                value={password1}
                type="password"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                Phone Number
              </label>
              <input
                onChange={phoneHandler}
                value={phone}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                Street
              </label>
              <input
                onChange={streetHandler}
                value={street}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                Apartement
              </label>
              <input
                onChange={apartementHandler}
                value={apartement}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                Zip
              </label>
              <input
                onChange={zipHandler}
                value={zip}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                City
              </label>
              <input
                onChange={cityHandler}
                value={city}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                Country
              </label>
              <input
                onChange={countryHandler}
                value={country}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
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
