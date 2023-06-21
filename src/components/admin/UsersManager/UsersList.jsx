import React, { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb, Space, Table, Typography, Avatar, Tag } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import UserApi from "../../../api/security/UserApi";
import { format } from "date-fns";

// const currentDate = new Date();
const { Text } = Typography;
const UsersList = () => {
    const [users, setUsers] = useState();
    useEffect(() => {
        const getUsers = async () => {
            try {
                const { data } = await UserApi.getAllUsers();
                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        };
        getUsers();
    }, []);
    console.log(users);
    const dataSource = users?.data?.map((item, index) => {
        return {
            key: index + 1,
            accountId: item.accountId,
            userName: item.userName,
            email: item.email,
            decentralizationId: item.decentralizationId,
            // phone: item.phone,
            // address: item.address,
            avartar: item.avartar,
            createdAt: item.createdAt,
            updateAt: item.updateAt,
            status:
                item.status === 1 ? (
                    <Tag color="cyan">Hoạt động</Tag>
                ) : (
                    <Tag color="red">Vô hiệu</Tag>
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
            title: "ID",
            dataIndex: "accountId",
            key: "accountId",
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
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            render: (createdAt) => (
                <>{format(new Date(createdAt), "HH:mm:ss dd/MM/yyyy")}</>
            ),
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updateAt",
            key: "updateAt",
            align: "center",
            render: (updateAt) => (
                <>{format(new Date(updateAt), "HH:mm:ss dd/MM/yyyy")}</>
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
                <Table dataSource={dataSource} columns={columns} />
            </div>
        </>
    );
};

export default UsersList;
