import React from "react";
import { Breadcrumb } from "antd";

const CategoryEdit = () => {
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Danh mục sản phẩm</Breadcrumb.Item>
                <Breadcrumb.Item>Sửa danh mục</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: "#fff",
                }}
            >
                Sửa danh mục
            </div>
        </>
    );
};

export default CategoryEdit;
