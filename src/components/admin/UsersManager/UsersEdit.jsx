import React from "react";
import { Breadcrumb } from "antd";
const UsersEdit = () => {
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Sửa tài khoản</Breadcrumb.Item>
            </Breadcrumb>
            <div
                style={{
                    padding: 24,
                    minHeight: 360,
                    background: "#fff",
                }}
            >
                Sửa tài khoản
            </div>
        </>
    );;
};

export default UsersEdit;
