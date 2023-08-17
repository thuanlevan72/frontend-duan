import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StatisticsApi from "../../api/statistic/StatisticsApi";
import ProductApi from "../../api/product/ProductApi";

const BannerFive = () => {
    const isLoggedIn = localStorage.getItem("user") !== null;
    var settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true,
    };
    // Get Top Selling Products
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const getProducts = async () => {
            try {
                let data;
                if (isLoggedIn) {
                    data = await StatisticsApi.GetTopSellingProducts();
                } else {
                    data = await ProductApi.getAllNoPagition();
                }
                setProducts(data);
            } catch (error) {
                console.error(error);
            }
        };
        getProducts();
    }, []);
    return (
        <div className="banner-area hm9-section-padding">
            <h1 className="banner-title font-weight-bold">Sản phẩm bán chạy</h1>
            <div className="container-fluid">
                <div className="d-flex flex-column">
                    <Slider {...settings}>
                        {products.map((item, index) => (
                            <div key={index} className="col-lg-3 col-md-6">
                                <div className="single-banner mb-20">
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
                                            width={246}
                                            className="item-card"
                                        />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </div>
    );
};

export default BannerFive;
