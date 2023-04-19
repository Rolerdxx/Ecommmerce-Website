import React from "react";
import Products from "./Products";
import { NavLink } from "react-router-dom";


const Home = () => {
  return (
    <>
      <div className="hero">
        <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
          </div>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="https://i.imgur.com/sh71Ao8.png" class="d-block w-100" height="550" alt="..." />
              <div class="carousel-caption d-none d-md-block bg-secondary" style={{ "--bs-bg-opacity": .5 }}>
                <h5>Surface Pro 7 128GB</h5>
                <p>Tablet PC - Intel Core i3 1005G1 Ice Lake, touchscreen 12.3" IPS 2736 × 1824, RAM 4GB LPDDR4X, Intel UHD Graphics</p>
                <NavLink to="/products/5f15d8852a025143f9593a7c" class="btn btn-light col-6">Buy now</NavLink>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://i.imgur.com/VuMYlAE.png" class="d-block w-100" height="550" alt="..." />
              <div class="carousel-caption d-none d-md-block bg-secondary" style={{ "--bs-bg-opacity": .5 }}>
                <h5>iPhone SE 64GB</h5>
                <p>Mobile Phone 4,7" IPS 1334×750, processor Apple A13 Bionic 6-core, RAM 3 GB, internal memory 64 GB, main camera 12 Mpx (f/1,8)</p>
                <button class="btn btn-light col-6">Buy now</button>
              </div>
            </div>
            <div class="carousel-item">
              <img src="https://i.imgur.com/UYlvCD4.png" class="d-block w-100" height="550" alt="..." />
              <div class="carousel-caption d-none d-md-block bg-secondary" style={{ "--bs-bg-opacity": .5 }}>
                <h5>Samsung Galaxy S10e Dual SIM Black</h5>
                <p>Mobile Phone 5,8" AMOLED 2280 × 1080, processor Samsung Exynos 9820 8-core, RAM 6 GB, internal memory 128 GB</p>
                <button class="btn btn-light col-6">Buy now</button>
              </div>
            </div>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        <Products />
      </div>
    </>
  );
};

export default Home;