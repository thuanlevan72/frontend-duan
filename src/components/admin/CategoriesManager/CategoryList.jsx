import React from "react";
import { Breadcrumb, Image, Space, Table, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
const { Text } = Typography;
const CategoryList = () => {
    const dataSource = [];
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: "ID",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Tên danh mục",
            dataIndex: "nameProductType",
            key: "nameProductType",
            align: "center",
        },
        {
            title: "Hình ảnh",
            dataIndex: "imageTypeProduct",
            key: "imageTypeProduct",
            align: "center",
            render: (imageTypeProduct) => (
                <Image
                    src={imageTypeProduct}
                    alt={imageTypeProduct}
                    width={100}
                    height={100}
                    className="object-fit-cover border rounded-circle border border-success"
                />
            ),
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            key: "updatedAt",
            align: "center",
        },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: () => (
                <Space size="middle">
                    <NavLink to={"/admin/products-edit"}>
                        <BiEdit />
                    </NavLink>
                    <Text type="danger">
                        <ImBin />
                    </Text>
                </Space>
            ),
        },
    ];
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </>
    );
};

export default CategoryList;
