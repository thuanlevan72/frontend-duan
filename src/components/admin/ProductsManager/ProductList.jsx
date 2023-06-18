import React from "react";
import { Breadcrumb } from "antd";
const ProductList = () => {
    
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: '#fff'
                }}
            >Giao diện quản lý sản phẩm</div>
        </>
    );
};

export default ProductList;
