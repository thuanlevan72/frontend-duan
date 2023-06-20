import React from "react";
import { Breadcrumb } from "antd";
const UsersAdd = () => {
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Thêm tài khoản</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: "#fff",
                }}
            >
                Thêm tài khoản
            </div>
        </>
    );;
};

export default UsersAdd;
