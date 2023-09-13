import PropTypes from "prop-types";
import React from "react";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitleThree from "../../components/section-title/SectionTitleThree";
import ProductGridTwo from "./ProductGridTwo";
import { useEffect } from "react";
import { useState } from "react";
import categoryAPI from "../../api/category/CategoryApi";

const TabProductCategory = ({
  spaceBottomClass,
  category,
  productTabClass,
}) => {
  const [data, setDatas] = useState([
    {
      productTypeId: 1,
      nameProductType: "Hàng chay cấp đông",
      imageTypeProduct:
        "https://res.cloudinary.com/doedovklj/image/upload/v1694237398/xyz-abc_638298593973418611image.png",
      createdAt: "2023-06-04T14:52:00.2831254",
      updatedAt: "2023-06-04T14:52:00.2831343",
      key: "add1d092-84c2-4c92-b105-ae8548a0bbe2",
    },
    {
      productTypeId: 3,
      nameProductType: "Món Cơm",
      imageTypeProduct:
        "https://res.cloudinary.com/doedovklj/image/upload/v1694237300/xyz-abc_638298592992322785image.png",
      createdAt: "2023-06-13T14:20:31.2382471",
      updatedAt: "2023-06-13T14:20:31.2382622",
      key: "92513a2e-0d14-40cc-8436-625d1da5fcfd",
    },
    {
      productTypeId: 4,
      nameProductType: "Món Nộm",
      imageTypeProduct:
        "https://res.cloudinary.com/doedovklj/image/upload/v1694237053/xyz-abc_638298590524334592image.png",
      createdAt: "2023-06-13T14:20:31.2382471",
      updatedAt: "2023-06-13T14:20:31.2382622",
      key: "25ae9c9d-38c8-4be5-b0c9-0f613c2cd66e",
    },
    {
      productTypeId: 6,
      nameProductType: "Món Chay Mặn",
      imageTypeProduct:
        "https://res.cloudinary.com/doedovklj/image/upload/v1686793918/xyz-abc_638224159162019553image.webp",
      createdAt: "2023-06-13T14:20:31.2382471",
      updatedAt: "2023-06-13T14:20:31.2382622",
      key: "1fb37a48-705d-44ad-af42-10b0b0965dde",
    },
    {
      productTypeId: 47,
      nameProductType: "Đồ Uống",
      imageTypeProduct:
        "https://res.cloudinary.com/doedovklj/image/upload/v1694237751/xyz-abc_638298597491440622image.png",
      createdAt: "2023-09-09T12:35:52.0366667",
      updatedAt: "0001-01-01T00:00:00",
      key: "c6be60e1-293c-423a-86e5-5926bfce8c15",
    },
    {
      productTypeId: 48,
      nameProductType: "Rau Củ",
      imageTypeProduct:
        "https://res.cloudinary.com/doedovklj/image/upload/v1694244233/xyz-abc_638298662319140215image.png",
      createdAt: "2023-09-09T14:23:54.18",
      updatedAt: "0001-01-01T00:00:00",
      key: "2e08e015-f39c-4abc-ba82-037a6bd5b95d",
    },
  ]);

  useEffect(async () => {
    try {
      const res = await categoryAPI.GetCategoryFrontend();
      // setDatas(res);
    } catch (error) {}
  }, []);
  return (
    <div className={`product-area ${spaceBottomClass ? spaceBottomClass : ""}`}>
      <div className="container">
        <SectionTitleThree
          titleText="Loại sản phẩm"
          positionClass="text-center"
        />
        <Tab.Container defaultActiveKey={data && data[0].key}>
          <Nav
            variant="pills"
            className={`product-tab-list pt-35 pb-60 text-center ${
              productTabClass ? productTabClass : ""
            }`}>
            {data &&
              data.map((item, index) => {
                return (
                  <Nav.Item>
                    <Nav.Link eventKey={item.key}>
                      <h4>{item.nameProductType}</h4>
                    </Nav.Link>
                  </Nav.Item>
                );
              })}
          </Nav>
          <Tab.Content>
            {data &&
              data.map((item, index) => {
                return (
                  <Tab.Pane eventKey={item.key}>
                    <div className="row">
                      <ProductGridTwo
                        category={item.nameProductType}
                        type="new"
                        limit={8}
                        spaceBottomClass="mb-25"
                      />
                    </div>
                  </Tab.Pane>
                );
              })}
          </Tab.Content>
        </Tab.Container>
        <div className="view-more text-center mt-20 toggle-btn6 col-12">
          <Link
            className="loadMore6"
            to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
            Xem thêm
          </Link>
        </div>
      </div>
    </div>
  );
};

TabProductCategory.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string,
};

export default TabProductCategory;
