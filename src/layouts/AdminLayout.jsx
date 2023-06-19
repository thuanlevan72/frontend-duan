import React from "react";
import { Layout, Menu, theme } from "antd";
import { useState } from "react";
import { Route, Switch, Redirect, NavLink } from "react-router-dom";
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
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { RxDashboard } from "react-icons/rx";
import { BsCart2 } from "react-icons/bs";
import { MdOutlineCategory } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const history = useHistory();
    useEffect(() => {
        // const Token = localStorage.getItem("token");
        // if (Token !== null) {
        //     // Phân tách JWT thành các phần: header, payload và signature
        //     const parts = Token.split(".");
        //     const encodedPayload = parts[1];
        //     // Giải mã phần payload từ Base64
        //     const decodedPayload = atob(encodedPayload);
        //     // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
        //     const payloadObject = JSON.parse(decodedPayload);
        //     // Truy cập vào giá trị "role"
        //     const role = payloadObject.role;
        //     if(role !== "admin"){
        //         alert("bạn không có quyền để vào dây chơi");
        //         history.push("/login-register");
        //     }
        //     console.log(role); // Kết quả: "admin"
        // } else {
        //     alert("vui lòng đăng nhập để có thể vào đây chơi");
        //     history.push("/login-register");
        // }
    }, []);
    return (
        <Layout className="min-vh-100">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" className="py-5">
                    <Menu.Item key="/admin/dashboard" icon={<RxDashboard />}>
                        <NavLink to="/admin/dashboard">Dashboard</NavLink>
                    </Menu.Item>
                    <Menu.Item key="/admin/products" icon={<BsCart2 />}>
                        <NavLink to="/admin/products">Product Manager</NavLink>
                    </Menu.Item>
                    <Menu.Item
                        key="/admin/categories"
                        icon={<MdOutlineCategory />}
                    >
                        <NavLink to="/admin/categories">
                            Category Manager
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="/admin/account" icon={<FiUsers />}>
                        <NavLink to="/admin/account">User Manager</NavLink>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
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
                        <Route
                            path="/admin/products-add"
                            component={ProductAdd}
                        />
                        <Route
                            path="/admin/products-edit/:id"
                            component={ProductEdit}
                        />
                        {/* Category router */}
                        <Route
                            path="/admin/categories"
                            component={CategoryList}
                        />
                        <Route
                            path="/admin/categories-add"
                            component={CategoryAdd}
                        />
                        <Route
                            path="/admin/categories-edit/:id"
                            component={CategoryEdit}
                        />
                        {/* User router */}
                        <Route path="/admin/account" component={UsersList} />
                        <Route path="/admin/account-add" component={UsersAdd} />
                        <Route
                            path="/admin/account-edit/:id"
                            component={UsersEdit}
                        />
                        <Redirect to="/admin/dashboard" />
                    </Switch>
                </Content>
                <Footer
                    style={{
                        textAlign: "center",
                    }}
                >
                    Poly Food - &#169; FPT Polytechnic Hà Nội
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;
