import React, { useState } from "react";
import { useEffect } from "react";
import { Breadcrumb, Image, Space, Table, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import UserApi from "../../../api/security/UserApi";

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
      title: "Hình ảnh",
      dataIndex: "avartar",
      key: "avartar",
      align: "center",
      render: (avartar) => (
        <Image
          src={avartar}
          // alt={avartar}
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
      dataIndex: "updateAt",
      key: "updateAt",
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
