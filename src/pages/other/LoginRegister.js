import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import MetaTags from "react-meta-tags";
import { Link } from "react-router-dom";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import UserApi from "../../api/security/UserApi";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Spin, message } from "antd";
const LoginRegister = ({ location }) => {
  const { pathname } = location;
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();
  const [activeKey, setActiveKey] = useState("login");

  const [dataLogin, setDataLogin] = useState({
    email: "",
    password: "",
  });
  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
    username: "",
  });
  const changeInputValue = (val) => {
    setDataLogin({
      ...dataLogin,
      [val.target.name]: val.target.value,
    });
    console.log(dataLogin);
  };
  const setInputValue = (val) => {
    setDataRegister({
      ...dataRegister,
      [val.target.name]: val.target.value,
    });
    console.log(dataRegister);
  };
  const handleSubmitRegister = async (e) => {
    if(!dataRegister.email || !dataRegister.password || !dataRegister.username){
      messageApi.open({
        type: 'error',
        content: "vui lòng nhập đầy đủ các trường",
      });
      return
    }
    e.preventDefault();
    console.log(dataRegister);
    const formData = new FormData();
    formData.append("UserName", dataRegister.username);
    formData.append("Email", dataRegister.email);
    formData.append("Password", dataRegister.password);
    formData.append("Status", 1);
    formData.append("DecentralizationId", 3);
    setDataRegister(
      (prev) =>
        (prev = {
          email: "",
          password: "",
          username: "",
        })
    );
    console.log(formData);
    try {
      setLoading(true);
      const response = await UserApi.Register(formData); // đưa dữ liệu lên đăng ký
      alert("bạn đã đăng ký thành công");
      setActiveKey("login");
      setLoading(false);
      // Xử lý phản hồi từ API tại đây (ví dụ: hiển thị thông báo thành công, điều hướng đến trang khác, vv)
    } catch (error) {
      console.error(error);
      alert(error.response.data);
      setLoading(false);
      // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi)
    }
  };

  const handleSubmit = async (e) => {
    if(!dataLogin.email || !dataLogin.password){
      messageApi.open({
        type: 'error',
        content: "vui lòng nhập đầy đủ các trường",
      });
      return
    }
    e.preventDefault();
    try {
      setLoading(true);
      const response = await UserApi.Login(dataLogin); // đưa dữ liệu lên đăng ký
      console.log(response);
      if (response?.data?.decentralizationId !== 3) {
        messageApi.open({
          type: 'success',
          content: 'bạn là admin.',
        });
        //nếu đi vào đây thì người đó không phải là người dùng nên phải đưa về admin
        const userJSON = JSON.stringify(response.data); // lưu dữ liệu người dùng
        const token = JSON.stringify(response.loginResponse.token); // lưu token vào để sau lấy dữ liệu sẽ cần phải dùng
        localStorage.setItem("user", userJSON);
        localStorage.setItem("token", token);
        setLoading(false);
        history.push("/admin");

        return;
      }
      // response.data.password = null;
      console.log(response);
      const userJSON = JSON.stringify(response.data); // lưu dữ liệu người dùng
      const token = JSON.stringify(response.loginResponse.token); // lưu token vào để sau lấy dữ liệu sẽ cần phải dùng
      localStorage.setItem("user", userJSON);
      localStorage.setItem("token", token);
      messageApi.open({
        type: 'success',
        content: 'chào mừng bạn đã đến poly-food.',
      });
      history.push("/");
      setLoading(false);
      // Xử lý phản hồi từ API tại đây (ví dụ: hiển thị thông báo thành công, điều hướng đến trang khác, vv)
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: error.response.data,
      });
      setLoading(false);
      // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi)
    }
    console.log(dataLogin);
  };
  return (
    <Fragment>
      <MetaTags>
        <title>Flone | Login</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>Trang chủ</BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Login Register
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        {contextHolder}
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ml-auto mr-auto">
                <div className="login-register-wrapper">
                  <Tab.Container activeKey={activeKey}>
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link
                          eventKey="login"
                          onClick={() => setActiveKey("login")}
                        >
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link
                          eventKey="register"
                          onClick={() => setActiveKey("register")}
                        >
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          {loading && (
                            <div style={{ width: "100%", textAlign: "center" }}>
                              <Spin style={{ textAlign: "center" }} size="large"/>
                            </div>
                          )}
                          <div className="login-register-form">
                            <form>
                              <input
                                type="email"
                                name="email"
                                value={dataLogin.email}
                                placeholder="email"
                                onChange={changeInputValue}
                                required
                              />
                              <input
                                type="password"
                                name="password"
                                value={dataLogin.password}
                                placeholder="Password"
                                onChange={changeInputValue}
                                required
                              />
                              <div className="button-box">
                                {/* <div className="login-toggle-btn">
                                    <input type="checkbox" />
                                    <label className="ml-10">Remember me</label>
                                    <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div> */}
                                <button type="submit" onClick={handleSubmit}>
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form>
                              <input
                                type="text"
                                name="username"
                                value={dataRegister.username}
                                placeholder="Username"
                                onChange={setInputValue}
                                required
                              />
                              <input
                                type="password"
                                name="password"
                                value={dataRegister.password}
                                placeholder="Password"
                                onChange={setInputValue}
                                required
                              />
                              <input
                                name="email"
                                value={dataRegister.email}
                                placeholder="Email"
                                type="email"
                                onChange={setInputValue}
                                required
                              />
                              <div className="button-box">
                                <button
                                  type="button"
                                  onClick={handleSubmitRegister}
                                >
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

LoginRegister.propTypes = {
  location: PropTypes.object,
};

export default LoginRegister;
