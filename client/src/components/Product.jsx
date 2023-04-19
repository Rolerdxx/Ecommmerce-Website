import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import axios from "axios";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
      console.log(id);
      setLoading(true);
      axios
        .get(`http://localhost:5000/api/v1/products/${id}`)
        .then((res)=>{
            setProduct(res.data);
        }
        )
        .catch(err => {
          console.log(err);
        });
      setLoading(false);
  }, [id]);

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={300} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton width={300} height={50} />
          <Skeleton width={75} />
          <Skeleton width={300} height={50} />
          <Skeleton width={50} />
          <Skeleton width={150} />
          <Skeleton width={50} height={100} />
          <Skeleton width={50} height={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const addToCart = (item) => {
    if (localStorage.getItem("cart") === null) {
      let cart = [];
      cart[0] = item;
      localStorage.setItem("cart", JSON.stringify(cart));
    }else{
      let cart = JSON.parse(localStorage.getItem("cart"));
      const isFound = cart.some(c => {
        if (c._id == item._id) {
          return true;
        }
        return false;
      });
      if (!isFound) {
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      }else {
        console.log("already exist");
      }
    }
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6">
          <img
            src={product?.image}
            alt={product?.name}
            height="400px"
            width="400px"
          />
        </div>
        <div>
          <div className="text-uppercase text-black-50">
            {product?.category.name}
          </div>
          <h1 className="display-5">{product?.name}</h1>
          <p className="lead fw-bolder">
            Rating {product?.rating}
            <i className="fa fa-star"></i>
          </p>
          <h3 className="display-6 fw-bold my-4">$ {product?.price}</h3>
          <p className="lead">{product?.description}</p>
          <button onClick={ () => addToCart(product) } className="btn btn-outline-dark px-4 py-2">
            Add to Cart
          </button>
          <NavLink className="btn btn-dark ms-2 px-3" to="/cart">
            Go to Cart
          </NavLink>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-5">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
}

export default Product;
