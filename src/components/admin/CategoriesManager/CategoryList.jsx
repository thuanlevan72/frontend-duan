import React from "react";
import { Breadcrumb, Button, Table } from "antd";
import { Pagination } from 'antd';
import { GrPrevious, GrFormNext } from 'react-icons/gr'
import { Link } from "react-router-dom";

const CategoryList = () => {
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
            title: "Tên danh mục",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Hình ảnh",
            dataIndex: "image",
            key: "image",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
        },
    ];
    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
            return <button ><GrPrevious /></button>;
        }
        if (type === 'next') {
            return <button ><GrFormNext /></button>;
        }
        return originalElement;
    };
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách danh mục</Breadcrumb.Item>
            </Breadcrumb>
            <Button type="primary" className="my-6">
                <Link to={`/admin/categories-add`}>Thêm mới</Link>
            </Button>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                }}
            >
                <Table dataSource={dataSource} columns={columns} />
                <div style={{ textAlign: 'right', padding: 30 }}>
                    <Pagination total={50} itemRender={itemRender} />
                </div>
            </div>
        </>
    );
};

export default CategoryList;
