import React from "react";
import { Breadcrumb, Button, Table } from "antd";
import { Link } from "react-router-dom";
const ProductList = () => {
    const dataSource = [];
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Giảm giá (%)",
            dataIndex: "discount",
            key: "discount",
        },
        {
            title: "Danh mục",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
        },
    ];
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Product list</Breadcrumb.Item>
            </Breadcrumb>
            <Button type="primary" className="my-6">
                <Link to={`/admin/products-add`}>Thêm mới</Link>
            </Button>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                }}
            >
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </>
    );
};

export default ProductList;
