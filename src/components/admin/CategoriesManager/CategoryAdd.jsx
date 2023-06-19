import React from "react";
import { Breadcrumb } from "antd";

const CategoryAdd = () => {
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Danh mục sản phẩm</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm danh mục sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: "#fff",
                }}
            >
                Thêm danh mục
            </div>
        </>
    );
};

export default CategoryAdd;
