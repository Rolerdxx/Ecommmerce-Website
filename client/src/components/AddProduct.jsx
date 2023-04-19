import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import FormData from "form-data";

export default function AddProduct() {
  const [name, getName] = useState("");
  const [Description, getDescription] = useState("");
  const [richDescription, getrichDescription] = useState("");
  const [image, getimage] = useState(undefined);
  const [brand, getbrand] = useState("");
  const [price, getprice] = useState("");
  const [countInStock, getcountInStock] = useState("");
  const [selectedCat , setcat] = useState('');
  //const [catBody,setcatBody] = useState('')
  
  const [categories,setCategories] = useState([]);

  useEffect(() => {
    const getcategories = () => {
      axios
        .get(`http://localhost:5000/api/v1/category`)
        .then((res)=>{
            setCategories(res.data);
        });
    };
    getcategories();
  }, []);

  const catBody = useMemo(()=>{
    return categories.map(category => 
        <option value={category._id} key={category._id}>{category.name}</option>
      );
  },[categories])

  const nameHandler = (e) => {
    getName(e.target.value);
  };
  const DescriptionHandler = (e) => {
    getDescription(e.target.value);
  };
  const richDescriptionHandler = (e) => {
    getrichDescription(e.target.value);
  };
  const imageHandler = (e) => {
    getimage(e.target.files[0]);
  };
  const brandHandler = (e) => {
    getbrand(e.target.value);
  };
  const priceHandler = (e) => {
    getprice(e.target.value);
  };
  const countInStockHandler = (e) => {
    getcountInStock(e.target.value);
  };
  const catHandler =(e)=>{
    setcat(e.target.value);
  }



  const addProductHandler = (event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("name",name);
    data.append("description",Description);
    data.append("richDescription",richDescription);
    data.append("image",image);
    data.append("brand",brand);
    data.append("price",price);
    data.append("countInStock",countInStock);
    data.append("selectedCat",selectedCat);
    axios
      .post("http://localhost:5000/api/v1/products", data, {
        headers:{
          'Content-Type': 'multipart/form-data'
        }
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
          <h1 className="display-6 fw-bolder text-center">Add Product</h1>
          <form onSubmit={addProductHandler}>
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
                Description
              </label>
              <input
                onChange={DescriptionHandler}
                value={Description}
                type="text"
                class="form-control"

              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                richDescription
              </label>
              <input
                onChange={richDescriptionHandler}
                value={richDescription}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                image
              </label>
              <input
                onChange={imageHandler}
                type="file"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                brand
              </label>
              <input
                onChange={brandHandler}
                value={brand}
                type="text"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                price
              </label>
              <input
                onChange={priceHandler}
                value={price}
                type="number"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                category
              </label><br></br>
              <select id="category" name="category" onChange={catHandler}>
                {catBody}
              </select>
            </div>
            <div class="mb-3">
              <label for="input" class="form-label">
                countInStock
              </label>
              <input
                onChange={countInStockHandler}
                value={countInStock}
                type="number"
                class="form-control"
                id="exampleInputPassword1"
              />
            </div>
            <button type="submit" class="btn btn-outline-dark">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
