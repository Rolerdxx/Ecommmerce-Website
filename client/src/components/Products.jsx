import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

export default function Products() {
  const [data, setData] = useState([]);
  const [cat, setCat] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/v1/products");
      if (componentMounted) {
        setData(await response.clone().json());
        setFilter(await response.json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    const getCategories = async () => {
      const response = await fetch("http://localhost:5000/api/v1/category");
      if (componentMounted) {
        setCat(await response.clone().json());
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    }

    getCategories();
    getProducts();
  }, []);

  const Loading = () => {
    return(
    <>
      <div className="col-md-3">
        <Skeleton height={350}/>
      </div>
      <div className="col-md-3">
        <Skeleton height={350}/>
      </div>
      <div className="col-md-3">
        <Skeleton height={350}/>
      </div>
      <div className="col-md-3">
        <Skeleton height={350}/>
      </div>
    </>
    );
  };

  const filterProduct = (cat) => {
    console.log(cat);
    const updatedList = data.filter((x)=>x.category.name === cat);
    setFilter(updatedList);
  };

  const ShowProducts = () => {
    return (
      <>
      <div className="container">
        <div className="row">
        <div className="buttons d-flex justify-content-center mb-5 pb-5">
          <button className="btn btn-outline-dark me-2" onClick={()=>setFilter(data)}>All</button>
          {
            cat.map(c => {
              return(
                <button key={c._id} className="btn btn-outline-dark me-2" onClick={()=>filterProduct(c.name)}>{c.name}</button>
              );
            })
          }
        </div>
        </div>
        <div className="row">
        {filter.map((product) => {
          return (
              <div key={product._id} className="col-md-3 mb-4">
                <div className="card h-100 text-center p-4" key={product.id}>
                  <img src={product.image} className="card-img-top" alt={product.name} height="250px" />
                  <div className="card-body">
                    <h5 className="card-title mb-0">{product.name.substring(0,12)}...</h5>
                    <p className="card-text lead fw-bold">
                      ${product.price}
                    </p>
                    <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">
                      Buy Now
                    </NavLink>
                  </div>
                </div>
              </div>
          );
        })}
        </div>
        </div>
      </>
    );
  };
 

  return (
    <div>
      <div className="container my-5 py-5">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
      </div>
    </div>
  );
}
