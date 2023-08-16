import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StatisticsApi from "../../api/statistic/StatisticsApi";

const BannerFive = () => {
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
                const data = await StatisticsApi.GetTopSellingProducts();
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
            <h1 className="banner-title font-weight-bold">Sản phẩm bán chạy</h1>
            <div className="container-fluid">
                <div className="d-flex flex-column">
                    <Slider {...settings}>
                        {products.map((item, index) => (
                            <div key={index} className="col-lg-3 col-md-6">
                                <div className="single-banner mb-20">
                                    <Link to={`/product/${item.productId}`}>
                                        <img
                                            src={item.product.avartarImageProduct}
                                            alt={item.product.nameProduct}
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
