import React, { useState, useEffect } from "react";
import { Breadcrumb, Pagination, Space, Table, Select, message } from "antd";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import OrderApi from "../../../api/order/OrderApi.js";
import { format } from 'date-fns';
import LoadingSpin from "../../loading/LoadingSpin";

const OrderList = () => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
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
    useEffect(() => {
        const getOrders = async () => {
            try {
                setLoading(true);
                const { data } = await OrderApi.getAllOrders(param);
                setData(data);
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
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
            phone: item.phone,
            email: item.email,
            address: item.address,
            note: item.noteOrder,
            orderStatus: item.orderStatus,
            createdAt: item.createdAt,
        };
    });
    const [options, setOptions] = useState([]);
    useEffect(() => {
        getStatus();
    }, []);
    const getStatus = async () => {
        try {
            const data = await OrderApi.getOrderStatus();
            setOptions(data)
        } catch (error) {

        }
    };
    const handleChangeStatus = (id) => async (orderId, newStatus) => {
        try {
            setLoading(true);
            await OrderApi.updateOrderStatus({
                id: id.orderId,
                idStatus: newStatus.value
            });
            messageApi.open({
                type: 'success',
                content: "Thay đổi trạng thái thành công",
            });
            setLoading(false);
            return
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: "Thay đổi trạng thái thất bại",
            });
            return
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 4:
                return '#70a1ff';
            case 5:
                return '#2ed573';
            case 7:
                return '#ff4757';
            case 9:
                return '#ffa502';
            case 10:
                return 'green';
        }
        return "red"
    };
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: "Mã đơn hàng",
            dataIndex: "code",
            key: "code",
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
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            align: "center",
        },
        {
            title: "Ghi chú",
            dataIndex: "note",
            key: "note",
            align: "center",
        },
        {
            title: "Ngày đặt",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            render: (createdAt) => (
                <>
                    {format(new Date(createdAt), 'HH:mm:ss dd/MM/yyyy')}
                </>
            ),
        },
        {
            title: "Trạng Thái",
            dataIndex: "orderStatus",
            key: "orderStatus",
            align: "center",
            render: (orderStatus, orderId) => (
                <Select defaultValue={orderStatus.orderStatusId}
                    onChange={handleChangeStatus(orderId)}
                >
                    {options &&
                        options.map((item) => {
                            return (
                                <Select.Option
                                    key={item.orderStatusId}
                                    value={item.orderStatusId}
                                >
                                    <p
                                        style={{ color: getStatusColor(item.orderStatusId) }}
                                    >
                                        {item.name}
                                    </p>
                                </Select.Option>
                            );
                        })}
                </Select >
            )
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
            {contextHolder}
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
