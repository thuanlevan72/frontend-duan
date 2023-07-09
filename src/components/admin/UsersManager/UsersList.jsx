import React, { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb, Space, Table, Typography, Avatar, Tag, Pagination, Button, Descriptions, Modal, message, Image, Input } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UserApi from "../../../api/security/UserApi";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";

const { Text } = Typography;
const UsersList = () => {
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataCurrent, setDataCurrent] = useState([]);
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
        const dataOrderCurrent = data?.data?.find((x) => x.accountId === id);
        const user = dataOrderCurrent?.user;
        console.log(user);
        if (user) {
            setDataCurrent([
                {
                    userId: 1,
                    avartar: dataOrderCurrent.avartar,
                    name: user.userName,
                    email: user.email,
                    phone: user.phone,
                    address: user.address,
                },
            ]);
        }
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
        const getUsers = async () => {
            try {
                setLoading(true);
                const { data } = await UserApi.getAllUsers(param);
                setData(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        };
        getUsers();
    }, [param]);
    const dataSource = data?.data?.map((item, index) => {
        return {
            key: index + 1,
            accountId: item.accountId,
            userName: item.userName,
            email: item.email,
            role: <Tag
                color={item.decentralization.authorityName == "Admin" ? "cyan" : "green"}>
                {item.decentralization.authorityName}
            </Tag>,
            avartar: item.avartar,
            createdAt: item.createdAt,
            status:
                item.status === 1 ? (
                    <Tag color="cyan">Hoạt động</Tag>
                ) : (
                    <Tag color="red">Vô hiệu hóa</Tag>
                ),
        };
    });
    const columns = [
        {
            title: "STT",
            dataIndex: "key",
            key: "key",
            align: "center",
        },
        {
            title: "Họ Tên",
            dataIndex: "userName",
            key: "userName",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "Ảnh đại diện",
            dataIndex: "avartar",
            key: "avartar",
            align: "center",
            render: (avartar) => (
                <Avatar
                    size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                    icon={<UserOutlined />}
                    src={avartar}
                />
            ),
        },
        {
            title: "Vai trò",
            dataIndex: "role",
            key: "role",
            align: "center",
        },
        {
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            render: (createdAt) => (
                <>{format(new Date(createdAt), "HH:mm:ss dd/MM/yyyy")}</>
            ),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            align: "center",
        },
        {
            title: "Hành động",
            dataIndex: "accountId",
            key: "accountId",
            align: "center",
            render: (accountId) => (
                <Space size="middle">
                    <Button type="primary" onClick={(e) => showModal(accountId)}>
                        Chi tiết
                    </Button>
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
                <Breadcrumb.Item>Danh sách người dùng</Breadcrumb.Item>
            </Breadcrumb>
            {contextHolder}
            <Modal
                open={isModalOpen}
                width={1100}
                onOk={handleOk}
                onCancel={handleCancel}>
                <Descriptions title="Chi tiết đơn hàng">
                    <Descriptions.Item label="Tên khách hàng">
                        {dataCurrent.length > 0 && dataCurrent[0].name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số điện thoại">
                        {dataCurrent.length > 0 && dataCurrent[0].phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Email">
                        {dataCurrent.length > 0 && dataCurrent[0].email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Địa chỉ">
                        {dataCurrent.length > 0 && dataCurrent[0].address}
                    </Descriptions.Item>
                    <Descriptions.Item label="Vai trò">
                        {dataSource.length > 0 && dataSource[0].role}
                    </Descriptions.Item>
                    <Descriptions.Item label="Trạng thái">
                        {dataSource.length > 0 && dataSource[0].status}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {format(new Date(dataSource.length > 0 && dataSource[0].createdAt), "HH:mm:ss dd/MM/yyyy")}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ảnh">
                        <Image
                            src={dataCurrent.length > 0 && dataCurrent[0].avartar}
                            alt="avatar"
                            width={100}
                            height={100}
                            className="object-fit-cover border rounded-circle border border-success"
                        />
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
            <div>
                {loading && (<div><LoadingSpin /></div>)}
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

export default UsersList;
