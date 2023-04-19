import React, { useState } from 'react';
import axios from "axios";

export default function AddCategory() {
    const [name,setname]=useState('');
    const [icon,seticon]=useState('');
    const [color,setcolor]=useState('');

    const nameHandler=(e)=>{
        setname(e.target.value);
    };
    const iconHandler=(e)=>{
        seticon(e.target.value);
    };
    const colorHandler=(e)=>{
        setcolor(e.target.value);
    };

    const addCatHandler = (e)=>{
        e.preventDefault();
        axios.post("http://localhost:5000/api/v1/category",{
            name:name,
            icon:icon,
            color:color
        })
        .then((res)=>{
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err)
        })
    };

  return (
    <div className="container my-5 py-5">
      <div className="row">
        <div className="col-md-5 mx-auto mb-5">
          <h1 className="display-6 fw-bolder text-center">Add Category</h1>
          <form onSubmit={addCatHandler}>
            <div class="mb-3">
              <label for="input" class="form-label">
                Name
              </label>
              <input
                onChange={nameHandler}
                value={name}
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                icon
              </label>
              <input
                onChange={iconHandler}
                value={icon}
                type="text"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                color
              </label>
              <input
                onChange={colorHandler}
                value={color}
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
  )
}
