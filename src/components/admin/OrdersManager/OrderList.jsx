import React, { useState } from "react";
import { Breadcrumb, Pagination, Space, Table } from "antd";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import LoadingSpin from "../../loading/LoadingSpin";
// import OrderApi from "../../../api/order/OrderApi";

const OrderList = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        totalItems: 0,
        totalPages: 0,
        page: 1,
        pageSize: 10,
        hasPrevious: false,
        hasNext: true,
        data: [],
    });
    const handlePaginationChange = (page, pageSize) => {
        setParam(
            (prev) =>
            (prev = {
                ...param,
                page: page,
                pageSize: pageSize,
            })
        );
    };
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        search: "",
    });
    const dataSource = []
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: "Mã đơn hàng",
            dataIndex: "codeOrder",
            key: "codeOrder",
            align: "center",
        },
        {
            title: "Tên khách hàng",
            dataIndex: "fullName",
            key: "fullName",
            align: "center",
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "Ngày đặt",
            dataIndex: "categoryName",
            key: "categoryName",
            align: "center",
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
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
                <Breadcrumb.Item>Danh sách đơn hàng</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                {loading && (
                    <div>
                        <LoadingSpin />
                    </div>
                )}
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
                <Pagination
                    style={{
                        textAlign: "right",
                        padding: "10px 20px",
                    }}
                    current={data.page}
                    pageSize={data.pageSize}
                    total={data.totalItems}
                    onChange={handlePaginationChange}
                    showSizeChanger
                    showTotal={(total) => `Total ${total} items`}
                />
            </div>
        </>
    );
};

export default OrderList;
