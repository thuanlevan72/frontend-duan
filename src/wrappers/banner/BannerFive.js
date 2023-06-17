import React from "react";
import { Link } from "react-router-dom";

const BannerFive = () => {
  return (
    <div className="banner-area hm9-section-padding">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-4 col-md-6">
            <div className="row">
              <div className="col-lg-12">
                <div className="single-banner mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        "https://images.pexels.com/photos/616837/pexels-photo-616837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      }
                      alt=""
                    />
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-1">
                    <h3>Green Apple </h3>
                    <p>
                      Starting At <span>$99.00</span>
                    </p>
                    <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="single-banner mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        "https://images.pexels.com/photos/1414126/pexels-photo-1414126.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      }
                      alt=""
                    />
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-1">
                    <h3>Ripe orange</h3>
                    <p>
                      Starting At <span>$99.00</span>
                    </p>
                    <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6">
            <div className="single-banner mb-20">
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                <img
                  src={
                    "https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  }
                  alt=""
                />
              </Link>
              <div className="banner-content-4 banner-position-hm15-2">
                <span>-20% Off</span>
                <h2>New Fruits</h2>
                <h5>Best for your health</h5>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="row">
              <div className="col-lg-12 col-md-6">
                <div className="single-banner mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                        "https://images.pexels.com/photos/1311771/pexels-photo-1311771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      }
                      alt=""
                    />
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-2">
                    <h3>Ripe Corn </h3>
                    <p>
                      Starting At <span>$99.00</span>
                    </p>
                    <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-12 col-md-6">
                <div className="single-banner mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                    <img
                      src={
                       "https://images.pexels.com/photos/12916311/pexels-photo-12916311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      }
                      alt=""
                    />
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-2">
                    <h3>Green guava </h3>
                    <p>
                      Starting At <span>$99.00</span>
                    </p>
                    <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerFive;
