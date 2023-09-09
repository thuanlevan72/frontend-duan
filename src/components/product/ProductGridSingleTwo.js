import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { getDiscountPrice } from "../../helpers/product";

const ProductGridSingleTwo = ({
    product,
    currency,
    addToWishlist,
    wishlistItem,
    sliderClassName,
    spaceBottomClass,
    colorClass,
    titlePriceClass,
}) => {
    const { addToast } = useToasts();
    const discountedPrice = getDiscountPrice(product.price, product.discount);
    const finalProductPrice = +(product.price * currency.currencyRate).toFixed(
        2
    );
    const finalDiscountedPrice = +(
        discountedPrice * currency.currencyRate
    ).toFixed(2);
    return (
        <Fragment>
            <div
                className={`col-xl-3 col-md-6 col-lg-4 col-sm-6 ${
                    sliderClassName ? sliderClassName : ""
                }`}
                style={{ padding: "0 10px 0 0" }}
            >
                <div
                    className={`product-wrap-2 ${
                        spaceBottomClass ? spaceBottomClass : ""
                    } ${colorClass ? colorClass : ""} `}
                >
                    <div className="product-img">
                        <Link
                            to={
                                process.env.PUBLIC_URL +
                                "/product/" +
                                product.id
                            }
                        >
                            <img
                                className="default-img d-flex object-fit-cover align-items-center"
                                style={{
                                    width: "270px !important",
                                    height: "270px",
                                }}
                                src={process.env.PUBLIC_URL + product.image[0]}
                                alt="polyfood sản phẩm"
                            />
                        </Link>
                        {product.discount || product.new_product ? (
                            <div className="product-img-badges">
                                {product.discount ? (
                                  <Tag color="#87d068">-{product.discount}%</Tag>
                                ) : (
                                    ""
                                )}
                                {product.new_product ? (
                                    <Tag color="#f50">Mới</Tag>
                                ) : (
                                    ""
                                )}
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="product-content-2">
                        <div
                            className={`title-price-wrap-2 ${
                                titlePriceClass ? titlePriceClass : ""
                            }`}
                        >
                            <h3 className="font-weight-bold">
                                <Link
                                    to={
                                        process.env.PUBLIC_URL +
                                        "/product/" +
                                        product.id
                                    }
                                >
                                    {product.name}
                                </Link>
                            </h3>
                            <div className="price-2">
                                {discountedPrice !== null ? (
                                    <Fragment>
                                        <span className="font-weight-bold">
                                            {parseInt(
                                                (
                                                    currency.currencySymbol +
                                                    finalDiscountedPrice
                                                ).replace("$", "")
                                            ).toLocaleString("en-US") + " VND"}
                                        </span>
                                        <span className="old">
                                            {parseInt(
                                                (
                                                    currency.currencySymbol +
                                                    finalProductPrice
                                                ).replace("$", "")
                                            ).toLocaleString("en-US") + " VND"}
                                        </span>
                                    </Fragment>
                                ) : (
                                    <span className="font-weight-bold">
                                        {parseInt(
                                            (
                                                currency.currencySymbol +
                                                finalProductPrice
                                            ).replace("$", "")
                                        ).toLocaleString("en-US") + " VND"}
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="pro-wishlist-2">
                            <button
                                className={
                                    wishlistItem !== undefined ? "active" : ""
                                }
                                disabled={wishlistItem !== undefined}
                                title={
                                    wishlistItem !== undefined
                                        ? "Đã thêm vào danh sách yêu thích"
                                        : "Thêm vào danh sách yêu thích"
                                }
                                onClick={() => addToWishlist(product, addToast)}
                            >
                                <i className="fa fa-heart-o" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

ProductGridSingleTwo.propTypes = {
    addToCart: PropTypes.func,
    addToCompare: PropTypes.func,
    addToWishlist: PropTypes.func,
    cartItem: PropTypes.object,
    compareItem: PropTypes.object,
    currency: PropTypes.object,
    product: PropTypes.object,
    sliderClassName: PropTypes.string,
    spaceBottomClass: PropTypes.string,
    colorClass: PropTypes.string,
    titlePriceClass: PropTypes.string,
    wishlistItem: PropTypes.object,
};

export default ProductGridSingleTwo;
