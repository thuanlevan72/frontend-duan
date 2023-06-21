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
// Icons
import { RxDashboard } from "react-icons/rx";
import { BsCart2, BsBoxSeam, BsClock, BsBagCheck } from "react-icons/bs";
import { MdOutlineCategory, MdOutlineInfo, MdOutlineCancel } from "react-icons/md";
import { FiUsers, FiBookOpen } from "react-icons/fi";
import { IoCreateOutline } from "react-icons/io5";
import SubMenu from "antd/es/menu/SubMenu";
const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const history = useHistory();
    useEffect(() => {
        const Token = localStorage.getItem("token");
        if (Token !== null) {
            // Phân tách JWT thành các phần: header, payload và signature
            const parts = Token.split(".");
            const encodedPayload = parts[1];
            // Giải mã phần payload từ Base64
            const decodedPayload = atob(encodedPayload);
            // Chuyển đổi chuỗi JSON thành đối tượng JavaScript
            const payloadObject = JSON.parse(decodedPayload);
            // Truy cập vào giá trị "role"
            const role = payloadObject.role;
            if (role !== "admin") {
                alert("bạn không có quyền để vào dây chơi");
                history.push("/login-register");
            }
            console.log(role); // Kết quả: "admin"
        } else {
            alert("vui lòng đăng nhập để có thể vào đây chơi");
            history.push("/login-register");
        }
    }, [history]);
    return (
        <Layout className="min-vh-100">
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                width={240}
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/2/20/FPT_Polytechnic.png"
                    alt=""
                    width={150}
                    className="py-2"
                    style={{ marginLeft: 30 }}
                />
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
                    <Menu.Item key="/admin/dashboard" icon={<RxDashboard />}>
                        <NavLink to="/admin/dashboard">Bảng điều khiển</NavLink>
                    </Menu.Item>
                    {/* Product Manager */}
                    <SubMenu
                        key="subMenu-1"
                        icon={<BsCart2 />}
                        title="Quản lý sản phẩm"
                    >
                        <Menu.Item key="/admin/products" icon={<FiBookOpen />}>
                            <NavLink to="/admin/products">
                                Danh sách sản phẩm
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin/products-add"
                            icon={<IoCreateOutline />}
                        >
                            <NavLink to="/admin/products-add">
                                Thêm sản phẩm
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
                    {/* Category Manager */}
                    <SubMenu
                        key="subMenu-2"
                        icon={<MdOutlineCategory />}
                        title="Quản lý danh mục"
                    >
                        <Menu.Item key="/admin/categories" icon={<FiBookOpen />}>
                            <NavLink to="/admin/categories">
                                Danh sách danh mục
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin/categories-add"
                            icon={<IoCreateOutline />}
                        >
                            <NavLink to="/admin/categories-add">
                                thêm danh mục
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="subMenu-3"
                        icon={<FiUsers />}
                        title="Quản lý người dùng"                    >
                        <Menu.Item key="/admin/account" icon={<FiBookOpen />}>
                            <NavLink to="/admin/account">Danh sách người dùng</NavLink>
                        </Menu.Item>
                        {/* <Menu.Item key="/admin/users-add" icon={<IoCreateOutline />}>
                            <NavLink to="/admin/users-add">Thêm người dùng</NavLink>
                        </Menu.Item> */}
                    </SubMenu>
                    <SubMenu
                        key="subMenu-4"
                        icon={<MdOutlineInfo />}
                        title="Quản lý thông tin"
                    >
                        <Menu.Item key="/admin" icon={<FiBookOpen />}>
                            <NavLink to="/admin">
                                Danh sách thông tin
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin"
                            icon={<IoCreateOutline />}
                        >
                            <NavLink to="/admin">
                                Thêm thông tin trang
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu
                        key="subMenu-5"
                        icon={<BsBoxSeam />}
                        title="Quản lý đơn hàng"
                    >
                        <Menu.Item key="/admin" icon={<FiBookOpen />}>
                            <NavLink to="/admin">
                                Danh sách đơn hàng
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin"
                            icon={<BsClock />}
                        >
                            <NavLink to="/admin">
                                Đơn hàng chờ
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin"
                            icon={<BsBagCheck />}
                        >
                            <NavLink to="/admin">
                                Đơn hàng hoàn thành
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item
                            key="/admin"
                            icon={<MdOutlineCancel />}
                        >
                            <NavLink to="/admin">
                                Đơn hàng đã hủy
                            </NavLink>
                        </Menu.Item>
                    </SubMenu>
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
