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
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Product add</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: "#fff",
                }}
            >
                Thêm sản phẩm
            </div>
        </>
    );
};

export default ProductAdd;
