import React from "react";
import { Breadcrumb } from "antd";
const ProductAdd = () => {
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Tạo sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                Thêm sản phẩm
            </div>
        </>
    );
};

export default ProductAdd;
