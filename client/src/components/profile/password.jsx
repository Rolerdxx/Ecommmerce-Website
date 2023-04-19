import axios from "axios";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Password() {
  let history = useHistory();
  const [user, setuser] = useState({});
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const [oldPass, setoldPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [conPass, setconPass] = useState("");

  const Checkpass = (newpass) => {
    axios
      .post("http://localhost:5000/api/v1/users/login", {
        email: user.email,
        password: newpass,
      })
      .then((res) => {
        if (res.data.token) {
          return true;
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
    return false;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/users/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setuser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const oldPassHandler = (e) => {
    setoldPass(e.target.value);
  };
  const newPassHandler = (e) => {
    setnewPass(e.target.value);
  };
  const conPassHandler = (e) => {
    setconPass(e.target.value);
  };

  const ChangePass = (e) => {
    e.preventDefault();
    if (newPass === conPass && Checkpass(oldPass)) {
      axios
        .put(`http://localhost:5000/api/v1/users/${id}`, {
          password: newPass,
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
    }
  };

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-md-5 mx-auto mb-5">
          <h1 className="display-6 fw-bolder text-center">Change Password</h1>
          <form onSubmit={ChangePass}>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Old Password
              </label>
              <input
                value={oldPass}
                onChange={oldPassHandler}
                type="password"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                New Password
              </label>
              <input
                value={newPass}
                onChange={newPassHandler}
                type="password"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label">
                Confirm Password
              </label>
              <input
                value={conPass}
                onChange={conPassHandler}
                type="password"
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
