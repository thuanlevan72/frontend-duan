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
                    <img src={"/assets/img/product/product1.webp"} alt="" height={350}/>
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-1">
                    <h3>Giò nấm 1kg </h3>
                    <p>
                      Giá từ <span>90K</span>
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
                  <img src={"/assets/img/product/product2.webp"} alt="" height={350}/>
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-1">
                    <h3>Cá kho tộ chay</h3>
                    <p>
                      Giá từ <span>60K</span>
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
            <div className="row">
            <div className="col-lg-12">
            <div className="single-banner mb-20">
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              <img src={"/assets/img/product/product3.webp"} alt="" height={350}/>
              </Link>
              <div className="banner-content-4 banner-position-hm15-2">
                <span>-20% Off</span>
                <h2>Giò phổ tai chay</h2>
                <h5>Best for your health</h5>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  SHOP NOW
                </Link>
              </div>
            </div>
            </div>
            <div className="col-lg-12">
            <div className="single-banner mb-20">
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
              <img src={"/assets/img/product/product4.webp"} alt="" height={350}/>
              </Link>
              <div className="banner-content-3 banner-position-hm15-1">
                    <h3>KHOAI MÔN LỆ PHỐ HÀ NỘI</h3>
                    <p>
                      Giá từ <span>55K</span>
                    </p>
                    <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                      <i className="fa fa-long-arrow-right" />
                    </Link>
                  </div>
            </div>
            </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12">
            <div className="row">
              <div className="col-lg-12 col-md-6">
                <div className="single-banner mb-20">
                  <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  <img src={"/assets/img/product/product5.webp"} alt="" height={350}/>
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-2">
                    <h3>Dồi chay </h3>
                    <p>
                      Giá từ <span>44K</span>
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
                  <img src={"/assets/img/product/product6.webp"} alt="" height={350}/>
                  </Link>
                  <div className="banner-content-3 banner-position-hm15-2">
                    <h3>Tôm tẩm vừng </h3>
                    <p>
                      Giá từ <span>45K</span>
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
