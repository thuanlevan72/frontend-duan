import React from "react";
import {
    FileOutlined,
    PieChartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ProductList from "../components/admin/ProductsManager/ProductList";
import ProductAdd from "../components/admin/ProductsManager/ProductAdd";
import ProductEdit from "../components/admin/ProductsManager/ProductEdit";
import Dashboard from "../components/admin/Dashboard";
import CategoryList from "../components/admin/CategoriesManager/CategoryList";
import CategoryAdd from "../components/admin/CategoriesManager/CategoryAdd";
import CategoryEdit from "../components/admin/CategoriesManager/CategoryEdit";
import UsersList from "../components/admin/UsersManager/UsersList";
import UsersAdd from "../components/admin/UsersManager/UsersAdd";
import UsersEdit from "../components/admin/UsersManager/UsersEdit";
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <PieChartOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
        getItem("Tom", "3"),
        getItem("Bill", "4"),
        getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <PieChartOutlined />, [
        getItem("Team 1", "6"),
        getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
];
const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout
            style={{
                minHeight: "100vh",
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: "0 16px",
                    }}
                >
                    <Switch>
                        <Route path="/admin/dashboard" component={Dashboard} />
                        {/* Product router */}
                        <Route path="/admin/products" component={ProductList} />
                        <Route path="/admin/products-add" component={ProductAdd}/>
                        <Route path="/admin/products-edit/:id" component={ProductEdit} />
                        {/* Category router */}
                        <Route path="/admin/categories" component={CategoryList} />
                        <Route path="/admin/categories-add" component={CategoryAdd}/>
                        <Route path="/admin/categories-edit/:id" component={CategoryEdit} />
                        {/* User router */}
                        <Route path="/admin/account" component={UsersList} />
                        <Route path="/admin/account-add" component={UsersAdd}/>
                        <Route path="/admin/account-edit/:id" component={UsersEdit} />
                        <Redirect to="/admin/dashboard" />
                    </Switch>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;
