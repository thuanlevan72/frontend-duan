import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import OrderApi from "../../api/order/OrderApi";
import { Spin } from "antd";

const ProductDescriptionTab = ({
  spaceBottomClass,
  productFullDesc,
  productId,
}) => {
  const [isPurchased, setIsPurchased] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );
  useEffect(async () => {
    if (user) {
      try {
        setLoading(true);
        const res = await OrderApi.isPurchased(user.user.userId, productId);
        console.log(res);
        if (res.isPurchased) {
          setIsPurchased(true);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
  }, []);
  return (
    <div className={`description-review-area ${spaceBottomClass}`}>
      <div className="container">
        <div className="description-review-wrapper">
          <Tab.Container defaultActiveKey="productDescription">
            <Nav variant="pills" className="description-review-topbar">
              <Nav.Item>
                <Nav.Link eventKey="additionalInfo">
                  Additional Information
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productDescription">Description</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="productReviews">Reviews(2)</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content className="description-review-bottom">
              <Tab.Pane eventKey="additionalInfo">
                <div className="product-anotherinfo-wrapper">
                  <ul>
                    <li>
                      <span>Weight</span> 400 g
                    </li>
                    <li>
                      <span>Dimensions</span>10 x 10 x 15 cm{" "}
                    </li>
                    <li>
                      <span>Materials</span> 60% cotton, 40% polyester
                    </li>
                    <li>
                      <span>Other Info</span> American heirloom jean shorts pug
                      seitan letterpress
                    </li>
                  </ul>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="productDescription">
                {productFullDesc}
              </Tab.Pane>
              <Tab.Pane eventKey="productReviews">
                <div className="row">
                  <div className="col-lg-7">
                    <div className="review-wrapper">
                      <div className="single-review">
                        <div className="review-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/testimonial/1.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="review-content">
                          <div className="review-top-wrap">
                            <div className="review-left">
                              <div className="review-name">
                                <h4>White Lewis</h4>
                              </div>
                              <div className="review-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                              </div>
                            </div>
                            <div className="review-left">
                              <button>Reply</button>
                            </div>
                          </div>
                          <div className="review-bottom">
                            <p>
                              Vestibulum ante ipsum primis aucibus orci
                              luctustrices posuere cubilia Curae Suspendisse
                              viverra ed viverra. Mauris ullarper euismod
                              vehicula. Phasellus quam nisi, congue id nulla.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="single-review child-review">
                        <div className="review-img">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/img/testimonial/2.jpg"
                            }
                            alt=""
                          />
                        </div>
                        <div className="review-content">
                          <div className="review-top-wrap">
                            <div className="review-left">
                              <div className="review-name">
                                <h4>White Lewis</h4>
                              </div>
                              <div className="review-rating">
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                              </div>
                            </div>
                            <div className="review-left">
                              <button>Reply</button>
                            </div>
                          </div>
                          <div className="review-bottom">
                            <p>
                              Vestibulum ante ipsum primis aucibus orci
                              luctustrices posuere cubilia Curae Suspendisse
                              viverra ed viverra. Mauris ullarper euismod
                              vehicula. Phasellus quam nisi, congue id nulla.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <div className="ratting-form-wrapper pl-50">
                      <h3>Gửi bình luận</h3>
                      <div className="ratting-form">
                        {isPurchased ? (
                          <form action="#">
                            <div className="star-box">
                              {/* <span>Your rating:</span>
                            <div className="ratting-star">
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                              <i className="fa fa-star" />
                            </div> */}
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div className="rating-form-style mb-10">
                                  {/* <input placeholder="Name" type="text" /> */}
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="rating-form-style mb-10">
                                  {/* <input placeholder="Email" type="email" /> */}
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="rating-form-style form-submit">
                                  <textarea
                                    name="Your Review"
                                    placeholder="Message"
                                    defaultValue={""}
                                  />
                                  <input type="submit" defaultValue="Submit" />
                                </div>
                              </div>
                            </div>
                          </form>
                        ) : (
                          <h3
                            style={{
                              color: "#484747",
                              padding: "20% 0",
                              lineHeight: "30px",
                            }}>
                            bạn cần mua và trải nghiệm sản phẩm này để có thể
                            đánh giá
                          </h3>
                        )}

                        {loading && (
                          <div style={{ width: "100%", textAlign: "center" }}>
                            <Spin
                              style={{ textAlign: "center" }}
                              size="large"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </div>
      </div>
    </div>
  );
};

ProductDescriptionTab.propTypes = {
  productFullDesc: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default ProductDescriptionTab;
