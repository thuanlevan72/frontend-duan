import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Rate } from "antd";
import StatisticsApi from "../../api/statistic/StatisticsApi";

const BannerFive = () => {
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    // Get Top Selling Products
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                let data = await StatisticsApi.GetTopSellingProducts();
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };
        getProducts();
    }, []);
    console.log(products);
    return (
        <div className="banner-area hm9-section-padding">
            <div className="container-fluid">
                <h2 className="banner-title font-weight-bold">
                    Thực Phẩm Bán Chạy
                </h2>
                <div className="d-flex flex-column slider-container">
                    <Slider {...settings}>
                        {products.map((item, index) => {
                            const originalPrice = item.product.price;
                            const discountPercentage = item.product.discount;
                            const discountedPrice =
                                originalPrice * (1 - discountPercentage / 100);
                            return (
                                <div
                                    className="single-banner mb-20"
                                    key={index}
                                >
                                    <Link
                                        to={`/product/${
                                            item.productId || item.id
                                        }`}
                                    >
                                        <img
                                            src={
                                                item.product
                                                    ?.avartarImageProduct ||
                                                item.image[0]
                                            }
                                            alt={
                                                item.product?.nameProduct ||
                                                item.name
                                            }
                                        />
                                        <h3 className="product-name two-lines">
                                            {item.product?.nameProduct}
                                        </h3>
                                        <div className="container-price">
                                            <span className="discount">
                                                {discountedPrice.toLocaleString(
                                                    "vi-VN",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                )}
                                            </span>
                                            <span className="price">
                                                {originalPrice.toLocaleString(
                                                    "vi-VN",
                                                    {
                                                        style: "currency",
                                                        currency: "VND",
                                                    }
                                                )}
                                            </span>
                                        </div>
                                    </Link>
                                </div>
                            );
                        })}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default BannerFive;
