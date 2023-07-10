import React, { useState, useEffect } from "react";
import { Breadcrumb, Pagination, Space, Table, Select, Tag, Button, message, Modal, Descriptions, Image } from "antd";
import OrderApi from "../../../api/order/OrderApi.js";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";

const OrderList = () => {
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [currenOrderDeatail, setCurrenOrderDeatail] = useState([]);
    const [dataCurrent, setDataCurrent] = useState({});
    const [data, setData] = useState({
        totalItems: 0,
        totalPages: 0,
        page: 1,
        pageSize: 10,
        hasPrevious: false,
        hasNext: true,
        data: [],
    });
    const showModal = (id) => {
        const dataOrderCurrent = data.data.filter((x) => x.orderId === id)[0];
        setDataCurrent(dataOrderCurrent);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
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
    useEffect(() => {
        const getOrders = async () => {
            try {
                setLoading(true);
                const { data } = await OrderApi.getAllOrders(param);
                setData(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        getOrders();
    }, [param]);
    const dataSource = data.data?.map((item, index) => {
        return {
            key: index + 1,
            orderId: item.orderId,
            code: item.codeOrder,
            fullName: item.fullName,
            createdAt: item.createdAt,
            paymentOrder:
                item.paymentOrderPaymentId == 1 ? (
                    <Tag color="cyan">Thanh toàn khi nhận hàng</Tag>
                ) : (
                    <Tag color="green">Thanh toán online</Tag>
                ),
            orderStatus: item.orderStatus,
        };
    });

    const [options, setOptions] = useState([]);
    useEffect(() => {
        getStatus();
    }, []);
    const getStatus = async () => {
        try {
            const data = await OrderApi.getOrderStatus();
            setOptions(data);
        } catch (error) { }
    };

    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: "Sản phẩm",
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: "Số lượng",
            dataIndex: "code",
            key: "code",
            align: "center",
        },
        {
            title: "Giá cao nhất",
            dataIndex: "paymentOrder",
            key: "paymentOrder",
            align: "center",
        },
        {
            title: "Giá thấp nhất",
            dataIndex: "paymentOrder",
            key: "paymentOrder",
            align: "center",
        },
    ];

    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}>
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Danh sách thống kê</Breadcrumb.Item>
            </Breadcrumb>
            {contextHolder}
            <Modal
                // title="Basic Modal"
                open={isModalOpen}
                width={1100}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Descriptions title="Chi tiết bình luận">

                </Descriptions>
            </Modal>
            <div>
                {loading && (
                    <div>
                        <LoadingSpin />
                    </div>
                )}
                <Table dataSource={dataSource} columns={columns} pagination={false} />
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
