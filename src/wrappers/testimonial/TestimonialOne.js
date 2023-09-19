import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";

const TestimonialOne = ({ spaceTopClass, spaceBottomClass }) => {
    return (
        <div
            className={`testimonial-area ${
                spaceTopClass ? spaceTopClass : ""
            }  ${spaceBottomClass ? spaceBottomClass : ""}`}
        >
            <div className="container">
                <div className="d-flex flex-row-reverse item-vegetable">
                    <div className="testimonial-active nav-style-1 nav-testi-style">
                        <h2 className="special-polyfood-title">
                            Món ăn Chay Poly Food - Hương vị thanh tịnh
                        </h2>
                        <p>
                            Món ăn chay chính là món ăn theo đuổi cái đẹp thuần
                            khiết. Chay PolyFood luôn nỗ lực, dụng công để tạo
                            ra món ngon bộc lộ hương vị và mỹ cảm chân thực
                            nhất. Sự kết hợp, bày biện dung dị cũng đủ làm thỏa
                            mãn tâm hồn thực khách bởi nét quyến rũ của thiên
                            nhiên hài hòa trong mỗi món ngon.
                        </p>
                        <div className="funfact-btn funfact-btn-green btn-hover text-left">
                          <Link to={process.env.PUBLIC_URL + "/contact"}>
                            Liên hệ ngay
                          </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

TestimonialOne.propTypes = {
    bgColorClass: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    spaceLeftClass: PropTypes.string,
    spaceRightClass: PropTypes.string,
    spaceTopClass: PropTypes.string,
    testimonialClass: PropTypes.string,
};

export default TestimonialOne;
