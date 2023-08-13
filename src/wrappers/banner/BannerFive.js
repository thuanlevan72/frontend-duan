import React from "react";
import { Link } from "react-router-dom";

const BannerFive = () => {
  return (
    <div className="banner-area hm9-section-padding">
      <h1 style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px", textTransform: "uppercase" }}>
        Sản phẩm tiêu biểu
      </h1>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <div className="single-banner mb-20">
              <Link to={process.env.PUBLIC_URL + "/product/2007"}>
                <img src={"/assets/img/product/product3.webp"} alt="" width={400} height={400} />
              </Link>
              {/* <div className="banner-content-4 banner-position-hm15-2">
                <span>-20% Off</span>
                <h2>Giò phổ tai chay</h2>
                <h5>Best for your health</h5>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  SHOP NOW
                </Link>
              </div> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="single-banner mb-20">
              <Link to={process.env.PUBLIC_URL + "/product/1002"}>
                <img src={"/assets/img/product/product4.webp"} alt="" width={400} height={400} />
              </Link>
              {/* <div className="banner-content-3 banner-position-hm15-1">
                <h3>KHOAI MÔN LỆ PHỐ HÀ NỘI</h3>
                <p>
                  Giá từ <span>55K</span>
                </p>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  <i className="fa fa-long-arrow-right" />
                </Link>
              </div> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="single-banner mb-20">
              <Link to={process.env.PUBLIC_URL + "/product/2005"}>
                <img src={"/assets/img/product/product5.webp"} alt="" width={400} height={400} />
              </Link>
              {/* <div className="banner-content-3 banner-position-hm15-2">
                <h3>Dồi chay </h3>
                <p>
                  Giá từ <span>44K</span>
                </p>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  <i className="fa fa-long-arrow-right" />
                </Link>
              </div> */}
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="single-banner mb-20">
              <Link to={process.env.PUBLIC_URL + "/product/2021"}>
                <img src={"/assets/img/product/product6.webp"} alt="" width={400} height={400} />
              </Link>
              {/* <div className="banner-content-3 banner-position-hm15-2">
                <h3>Tôm tẩm vừng </h3>
                <p>
                  Giá từ <span>45K</span>
                </p>
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  <i className="fa fa-long-arrow-right" />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerFive;
