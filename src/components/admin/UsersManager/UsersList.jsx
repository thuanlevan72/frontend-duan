import React, { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb, Space, Table, Typography, Avatar, Tag, Pagination } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import UserApi from "../../../api/security/UserApi";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";

// const currentDate = new Date();
const { Text } = Typography;
const UsersList = () => {
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
    console.log(data);
    const dataSource = data?.data?.map((item, index) => {
        return {
            key: index + 1,
            accountId: item.accountId,
            userName: item.userName,
            email: item.email,
            // decentralizationId: item.decentralizationId,
            role: <Tag
                color={item.decentralization.authorityName == "Admin" ? "cyan" : "green"}>
                {item.decentralization.authorityName}
            </Tag>,

            // phone: item.phone,
            // address: item.address,
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
        // {
        //     title: "ID",
        //     dataIndex: "accountId",
        //     key: "accountId",
        // },
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
        // {
        //   title: "Phone",
        //   dataIndex: "phone",
        //   key: "phone",
        //   align: "center",
        // },
        // {
        //   title: "Address",
        //   dataIndex: "address",
        //   key: "address",
        //   align: "center",
        // },
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
            title: "Role",
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
                <Breadcrumb.Item>Danh sách người dùng</Breadcrumb.Item>
            </Breadcrumb>
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
