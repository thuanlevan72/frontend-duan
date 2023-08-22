import PropTypes from "prop-types";
import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { connect } from "react-redux";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { confirmOrder } from "../../redux/actions/cartActions";
import { useState } from "react";
import OrderApi from "../../api/order/OrderApi";
import { Spin, message } from "antd";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { typeOf } from "react-hooks-paginator";
import VoucherApi from "../../api/voucher/VoucherApi";

const Checkout = ({ location, cartItems, currency, confirmOrders }) => {
  const validateUserOrder = (userOrder) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    const isValidEmail = emailRegex.test(userOrder.email);
    const isValidAddress = userOrder.address.trim() !== "";
    const isValidFullName = userOrder.fullName.trim() !== "";
    const isValidPhone = phoneRegex.test(userOrder.phone);

    return isValidEmail && isValidAddress && isValidFullName && isValidPhone;
  };

  const [discount, setDiscount] = useState({
    voucherId: 1,
    voucherName: "",
    voucherCode: "",
    valuevoucher: 0,
    countVoucher: 0,
    expirationDate: "0000-08-17T09:50:40.151",
    createdAt: "2023-08-15T16:51:17.0633333",
    updatedAt: "0001-01-01T00:00:00",
    voucherUsers: null,
  });
  console.log(discount);
  const [codeVoucher, setCodeVoucher] = useState("");

  const [loading, setLoading] = useState(false);
  const totalPriceOld = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalPriceNew = cartItems?.reduce(
    (total, item) =>
      total + (item.price - (item.price / 100) * item.discount) * item.quantity,
    0
  );
  const localUser = localStorage.getItem("user");
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();
  const [userOrder, setUserOrder] = useState({
    paymentId: 1,
    userId:
      localUser ?? localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).user.userId
        : null,
    orderStatusId: 4,
    noteOrder: "",
    fullName: localUser
      ? JSON.parse(localStorage.getItem("user")).user.userName
      : "",
    phone: localUser ? JSON.parse(localStorage.getItem("user")).user.phone : "",
    address: localUser
      ? JSON.parse(localStorage.getItem("user")).user.address
      : "",
    email: localUser ? JSON.parse(localStorage.getItem("user")).user.email : "",
    originalPrice: totalPriceOld,
    actualPrice: totalPriceNew - (totalPriceNew / 100) * discount.valuevoucher,
    orderDetailDtos: cartItems?.map((item) => {
      return {
        productId: Number(item.id),
        quantity: item.quantity,
        price: item.price - (item.price / 100) * item.discount,
      };
    }),
  });
  useEffect(() => {
    setUserOrder({
      ...userOrder,
      actualPrice:
        totalPriceNew - (totalPriceNew / 100) * discount.valuevoucher,
    });
  }, [discount]);
  const { pathname } = location;
  let cartTotalPrice = 0;
  let cartTotalPriceDiscount = 0;
  const submitCodeVoucher = async (e) => {
    e.preventDefault();
    if (!JSON.parse(localStorage.getItem("user"))) {
      messageApi.open({
        type: "warning",
        content: "Bạn cần đăng nhập để có thể sử dụng mã giảm giá",
      });
      return false;
    }
    try {
      setLoading(true);
      const res = await VoucherApi.UseVoucher(userOrder.userId, codeVoucher);
      setLoading(false);
      messageApi.open({
        type: "success",
        content: "Mã giảm giá đã được áp dụng",
      });
      setDiscount(res.data);
    } catch (error) {
      setLoading(false);
      messageApi.open({
        type: "error",
        content: "Mã giảm giá không đúng hoặc không đã được sử dụng",
      });
    }
  };
  console.log(discount);
  const confirmOrderShipCode = async () => {
    const data = userOrder;
    if (!validateUserOrder(data)) {
      messageApi.open({
        type: "warning",
        content: "Vui lòng kiểm tra các trường thông tin cần nhập",
      });
      return false;
    }
    // validate trang thanh toán
    try {
      data.paymentId = 1;
      setLoading(true);
      const response = await OrderApi.CreateOrder(data);
      if (codeVoucher) {
        await VoucherApi.ApllyVoucher(userOrder.userId, codeVoucher);
      }
      messageApi.open({
        type: "success",
        content: "Cảm ơn bạn đã mua sản phẩm của chúng tôi",
      });
      setLoading(false);
      setTimeout(function () {
        confirmOrders();
        history.push("/Complete");
      }, 1500);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Thanh toán thất bại",
      });
      setLoading(false);
    }
  };
  const confirmOrderPayOnline = async () => {
    const data = userOrder;
    data.paymentId = 3;
    validateUserOrder(data);
    if (!validateUserOrder(data)) {
      messageApi.open({
        type: "warning",
        content: "Vui lòng kiểm tra các trường thông tin cần nhập",
      });
      return false;
    }
    try {
      setLoading(true);
      debugger;
      const response = await OrderApi.CreateUrlVnPay(
        parseInt(data.actualPrice)
      );
      messageApi.open({
        type: "success",
        content: "Đang tạo liên kết đến VnPay",
      });
      setLoading(false);
      localStorage.setItem(
        "dataOrderOnline",
        JSON.stringify({ ...data, codeVoucher })
      );
      setTimeout(function () {
        window.location.href = response;
      }, 500);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Tạo link thanh toán thất bại",
      });
      setLoading(false);
    }
    // const response = await OrderApi.CreateOrder(data);
  };
  const onChanginput = (e) => {
    setUserOrder({
      ...userOrder,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | Checkout</title>
        <meta name="description" content="Checkout page of PolyFood." />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Thanh Toán
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
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
                          <input
                            onChange={onChanginput}
                            name="fullName"
                            value={userOrder.fullName}
                            type="text"
                          />
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
                            name="address"
                            // placeholder="Nhập địa chỉ của bạn"
                            type="text"
                            value={userOrder.address}
                            onChange={onChanginput}
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
                          <input
                            type="text"
                            onChange={onChanginput}
                            name="phone"
                            value={userOrder.phone}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>Email</label>
                          <input
                            name="email"
                            onChange={onChanginput}
                            type="text"
                            value={userOrder.email}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>Ghi chú</h4>
                      <div className="additional-info">
                        {/* <label>Order notes</label> */}
                        <textarea
                          // placeholder="Notes about your order, e.g. special notes for delivery. "
                          name="noteOrder"
                          onChange={onChanginput}
                          value={userOrder.noteOrder}
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
                        {contextHolder}
                        {loading && (
                          <div style={{ width: "100%", textAlign: "center" }}>
                            <Spin
                              style={{ textAlign: "center" }}
                              size="large"
                            />
                          </div>
                        )}
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
                                      ? parseInt(
                                          (
                                            currency.currencySymbol +
                                            (
                                              finalDiscountedPrice *
                                              cartItem.quantity
                                            ).toFixed(2)
                                          ).replace("$", "")
                                        ).toLocaleString("en-US") + " VND"
                                      : parseInt(
                                          (
                                            currency.currencySymbol +
                                            (
                                              finalProductPrice *
                                              cartItem.quantity
                                            ).toFixed(2)
                                          ).replace("$", "")
                                        ).toLocaleString("en-US") + " VND"}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">
                              Khuyến mãi vận chuyển
                            </li>
                            <li>Miễn phí vận chuyển</li>
                          </ul>
                        </div>
                        {discount && discount.valuevoucher > 0 && (
                          <div className="your-order-total">
                            <ul>
                              <li style={{ color: "black" }}>
                                Tên voucher: {discount.voucherName}
                              </li>
                              <li style={{ color: "black" }}>
                                Giá trị giảm {discount.valuevoucher}%
                              </li>
                            </ul>
                          </div>
                        )}
                        <div className="your-order-total">
                          <ul>
                            <li className="order-total">Tổng cộng</li>
                            <li>
                              <div style={{ display: "none" }}>
                                {
                                  (cartTotalPriceDiscount =
                                    cartTotalPrice -
                                    (cartTotalPrice / 100) *
                                      discount.valuevoucher)
                                }
                              </div>
                              {discount.valuevoucher > 0 ? (
                                <del className="text-dark">
                                  {parseInt(
                                    (
                                      currency.currencySymbol +
                                      cartTotalPrice.toFixed(2)
                                    ).replace("$", "")
                                  ).toLocaleString("en-US") + " VND"}
                                </del>
                              ) : (
                                parseInt(
                                  cartTotalPrice.toFixed(2).replace("$", "")
                                ).toLocaleString("en-US") + " VND"
                              )}
                            </li>
                            {discount.valuevoucher > 0 && (
                              <li>
                                {parseInt(
                                  (
                                    currency.currencySymbol +
                                    cartTotalPriceDiscount.toFixed(2)
                                  ).replace("$", "")
                                ).toLocaleString("en-US") + " VND"}
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button
                        className="btn-hover"
                        onClick={confirmOrderShipCode}>
                        Thanh Toán khi nhận hàng
                      </button>
                    </div>
                    <div className="place-order mt-25">
                      <button
                        className="btn-hover"
                        onClick={confirmOrderPayOnline}>
                        Thanh Toán online
                      </button>
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
                        <input
                          type="text"
                          required
                          name="name"
                          onChange={(e) => setCodeVoucher(e.target.value)}
                        />

                        <button
                          className="cart-btn-2"
                          type="submit"
                          onClick={submitCodeVoucher}>
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
  location: PropTypes.object,
  confirmOrders: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
    currency: state.currencyData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    confirmOrders: () => {
      dispatch(confirmOrder());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
