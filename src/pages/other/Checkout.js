import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Checkout = ({ location, cartItems, currency }) => {
  const { pathname } = location;
  let cartTotalPrice = 0;
  console.log(cartItems)
  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | Checkout</title>
        <meta
          name="description"
          content="Checkout page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Thanh Toán
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        {console.log(process.env.PUBLIC_URL)}
        <Breadcrumb />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>Thông tin khách hàng</h3>
                    <div className="row">
                      {/* <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>First Name</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Last Name</label>
                          <input type="text" />
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Họ và Tên</label>
                          <input type="text" />
                        </div>
                      </div>
                      {/* <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>Country</label>
                          <select>
                            <option>Select a country</option>
                            <option>Azerbaijan</option>
                            <option>Bahamas</option>
                            <option>Bahrain</option>
                            <option>Bangladesh</option>
                            <option>Barbados</option>
                          </select>
                        </div>
                      </div> */}
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Địa chỉ</label>
                          <input
                            className="billing-address"
                            // placeholder="Nhập địa chỉ của bạn"
                            type="text"
                          />
                          {/* <input
                            placeholder="Apartment, suite, unit etc."
                            type="text"
                          /> */}
                        </div>
                      </div>
                      {/* <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>Town / City</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>State / County</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Postcode / ZIP</label>
                          <input type="text" />
                        </div>
                      </div> */}
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Điện thoại</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email</label>
                          <input type="text" />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Ghi chú</h4>
                      <div className="additional-info">
                        {/* <label>Order notes</label> */}
                        <textarea
                          // placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="message"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3 className="text-uppercase">Đơn hàng</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top">
                          <ul>
                            <li>Sản Phẩm</li>
                            <li>Tổng số lượng</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
                                    {discountedPrice !== null
                                      ? parseInt((currency.currencySymbol +
                                        (
                                          finalDiscountedPrice * cartItem.quantity
                                        ).toFixed(2)).replace("$", "")).toLocaleString("en-US") + " VND"
                                      : parseInt((currency.currencySymbol +
                                        (
                                          finalProductPrice * cartItem.quantity
                                        ).toFixed(2)).replace("$", "")).toLocaleString("en-US") + " VND"}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">Khuyến mãi vận chuyển</li>
                            <li>Miễn phí vận chuyển</li>
                          </ul>
                        </div>
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Tổng cộng</li>
                            <li>
                              {parseInt((currency.currencySymbol +
                                cartTotalPrice.toFixed(2)).replace("$", "")).toLocaleString("en-US") + " VND"}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover">Thanh Toán khi nhận hàng</button>
                    </div>
                    <div className="place-order mt-25">
                      <button className="btn-hover">Thanh Toán online</button>
                    </div>
                  </div>
                  <br />
                  <div className="discount-code-wrapper">
                    <div className="title-wrap">
                      <h4 className="cart-bottom-title section-bg-gray">
                        Mã giảm giá
                      </h4>
                    </div>
                    <div className="discount-code">
                      <p>Nhập mã giảm giá của bạn (nếu có).</p>
                      <form>
                        <input type="text" required name="name" />
                        <button className="cart-btn-2" type="submit">
                          Áp dụng
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No items found in cart to checkout <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

Checkout.propTypes = {
  cartItems: PropTypes.array,
  currency: PropTypes.object,
  location: PropTypes.object
};

const mapStateToProps = state => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData
  };
};

export default connect(mapStateToProps)(Checkout);
