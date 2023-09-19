import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const CountDownTwo = ({ spaceBottomClass }) => {
  return (
    <div
      className={`funfact-area ${spaceBottomClass ? spaceBottomClass : ""} special-dish-bg`}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <div className="funfact-content funfact-res text-center">
              <h2 className="special-dish-text">Món ngon hôm nay</h2>
              <div className="timer">
                <h4 className="text-white">Salad hồ đào nhiệt đới</h4>
                <p>Sự kết hợp giữa hạt hồ đào đa dinh dưỡng với cà chua chín mọng, củ cải đỏ tươi giòn, những lát đào thanh ngọt và những cọng xà lách mơn mởn cùng sốt chanh dây chua nhẹ, món ăn như một bản phối đầy sắc màu sẽ khai vị cho bữa chay thêm phần tuyệt hảo</p>
              </div>
              <div className="funfact-btn funfact-btn-green btn-hover text-left">
                <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                  Xem thực đơn
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="fruits-deal-img">
              <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                <img src="http://chaygarden.com/wp-content/uploads/2020/08/vXHlPKW.png" width={"500px"} 
                alt="Ảnh gia vị" className="dish-bottom" />
                <img
                  src={"https://res.cloudinary.com/do9rcgv5s/image/upload/v1695115340/ejsoaqebpskyneltbsex.png"}
                  alt="Salad đặc biệt"
                  width={"410px"}
                  className="dish-top"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CountDownTwo.propTypes = {
  dateTime: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default CountDownTwo;
