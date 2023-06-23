import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useState } from "react";
import UserApi from "../../api/security/UserApi";
import LoadingSpin from "../../components/loading/LoadingSpin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { message } from "antd";

const MyAccount = ({ location }) => {
  const [messageApi, contextHolder] = message.useMessage();
  const oldData = JSON.parse(localStorage.getItem("user"));
  const { pathname } = location;
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [dataPass, setDataPass] = useState({
    accountId: JSON.parse(localStorage.getItem("user")).accountId,
    password: "",
    confirmPass: "",
  });
  const changeDataPass = (e) => {
    setDataPass({
      ...dataPass,
      [e.target.name]: e.target.value,
    });
  };
  
  const changeDataUser = (e)=>{

    if(e.target.name === "phone"){
      if (!/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(user.phone) && user.phone.length == 9) {
        messageApi.open({
          type: 'error',
          content: "số điện thoại nhận vào không hợp lệ",
        });
    }
    }
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
  const chnagePassSubmit = async ()=>{
    if(!dataPass.password || !dataPass.confirmPass){
      messageApi.open({
        type: 'error',
        content: "vui lòng nhập đầy đủ các trường của mật khẩu",
      });
      return
    }
      if(dataPass.password != dataPass.confirmPass){
        messageApi.open({
          type: 'error',
          content: "mật khẩu nhập lại không giống nhau",
        });
        return
      }
      try{
        setLoading(true);
        messageApi.open({
          type: 'success',
          content: "thay đổi mật khẩu thành công",
        });
        const data = dataPass;
        delete data.confirmPass;
        console.log(data);
        const res = await UserApi.ChangePass(data);
        setLoading(false);
      }catch(error){
        messageApi.open({
          type: 'error',
          content: "thay đổi mật khẩu thất bại",
        });
        setLoading(false);
      }
  }
  const [user, setUser] = useState({
    phone: oldData.user.phone,
    email: oldData.user.email,
    address: oldData.user.address,
    userName: oldData.user.userName,
    avartar: oldData.avartar
  }
  );
  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file.size > 2 * 1024 * 1024) {
      messageApi.open({
        type: 'error',
        content: "Tệp tin quá lớn. Vui lòng chọn một tệp tin nhỏ hơn 2MB.",
      });
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      // Định dạng tệp tin không phải là hình ảnh
      messageApi.open({
        type: 'error',
        content: "Vui lòng chọn một tệp tin hình ảnh (jpg, png, webp).",
      });
      return;
    }
    const formData = new FormData();
    formData.append("Avatar", file);
    const users = JSON.parse(localStorage.getItem("user"));
    try {
      setLoading(true);
      const res = await UserApi.ChangeAvartar(user.accountId, formData);
      setUser({
        ...user,
        avartar: URL.createObjectURL(file),
      });
      users.avartar = res.data;
      localStorage.setItem("user", JSON.stringify(users));
      messageApi.open({
        type: 'success',
        content: "update avatar thành công",
      });
      setLoading(false);
      history.go(0);
    } catch (error) {
      alert(error);
      setLoading(false);
    }
  };
  //
  const onChageSubmitInfo = async () => {
    try{
      setLoading(true);
      const data = user;
      const formData = new FormData();
      formData.append("phone", user.phone);
      formData.append("email", user.email);
      formData.append("address", user.address);
      formData.append("userName", user.userName);
      const res = await UserApi.ChangeInfo(oldData.accountId,formData);
      const usersUpdate = JSON.parse(localStorage.getItem("user"));
   
      messageApi.open({
        type: 'success',
        content: "thay đổi thông tin thành công",
      });

      usersUpdate.user.phone = user.phone;
      usersUpdate.user.address = user.address;
      usersUpdate.user.userName = user.userName;
      localStorage.setItem("user", JSON.stringify(usersUpdate));
      setLoading(false);
      setTimeout(() => {
        history.go(0);
      }, 1000);
    }catch(error){
      setLoading(false);
      messageApi.open({
        type: 'success',
        content: "thay đổi thông tin thất bại",
      });
    }
  }
  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | My Account</title>
        <meta
          name="description"
          content="Compare page of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        My Account
      </BreadcrumbsItem>
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <div className="myaccount-area pb-80 pt-100">
          <div className="container">
            <div className="row">
              <div className="ml-auto mr-auto col-lg-9">
                <div className="myaccount-wrapper">
                  {contextHolder}
                  {loading && (
                                <div>
                                  <LoadingSpin />
                                </div>
                              )}
                  <Accordion defaultActiveKey="0">
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="0">
                          <h3 className="panel-title">
                            <span>1 .</span> Edit your account information{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>My Account Information</h4>
                              <h5>Your Personal Details</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Name</label>
                                  <input
                                    type="text"
                                    value={user.userName}
                                    name="userName"
                                    onChange={changeDataUser}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email</label>
                                  <input
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    disabled
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Address</label>
                                  <input
                                    type="text"
                                    value={user.address}
                                    name="address"
                                    onChange={changeDataUser}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Telephone</label>
                                  <input type="text"  name="phone" value={user.phone} onChange={changeDataUser} />
                                </div>
                              </div>
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label style={{ padding: "0 20px" }}>
                                    Ảnh đại diện{" "}
                                  </label>

                                  <img
                                    src={user.avartar}
                                    alt="Avatar"
                                    style={{
                                      width: "120px",
                                      height: "120px",
                                      marginBottom: "10px",
                                      objectFit: "cover",
                                      borderRadius: "50%",
                                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                      border: "2px solid #fff",
                                    }}
                                  />
                                  <br />
                                  <h4
                                    style={{
                                      padding: "10px 20px",
                                      fontWeight: "bolder",
                                    }}
                                  >
                                    thay avatar{" "}
                                  </h4>
                                  <input
                                    type="file"
                                    onChange={handleFileChange}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                {((user.phone !== oldData.user.phone) 
                                || (user.address !== oldData.user.address
                                || (user.userName !== oldData.user.userName))
                                )&& (/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(user.phone)) && <button type="button" onClick={onChageSubmitInfo}>Continue</button>}
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="1">
                          <h3 className="panel-title">
                            <span>2 .</span> Change your password
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Change Password</h4>
                              <h5>Your Password</h5>
                            </div>
                            <div className="row">
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password</label>
                                  <input
                                    type="password"
                                    name="password"
                                    value={dataPass.password}
                                    onChange={changeDataPass}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password Confirm</label>
                                  <input
                                    type="password"
                                    name="confirmPass"
                                    value={dataPass.confirmPass}
                                    onChange={changeDataPass}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                               {(dataPass.confirmPass || dataPass.password) && <button type="click" onClick={chnagePassSubmit}>Continue</button>} 
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    {/* <Card className="single-my-account mb-20">
                      <Card.Header className="panel-heading">
                        <Accordion.Toggle variant="link" eventKey="2">
                          <h3 className="panel-title">
                            <span>3 .</span> Modify your address book entries{" "}
                          </h3>
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <div className="myaccount-info-wrapper">
                            <div className="account-info-wrapper">
                              <h4>Address Book Entries</h4>
                            </div>
                            <div className="entries-wrapper">
                              <div className="row">
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-info text-center">
                                    <p>John Doe</p>
                                    <p>Paul Park </p>
                                    <p>Lorem ipsum dolor set amet</p>
                                    <p>NYC</p>
                                    <p>New York</p>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-md-6 d-flex align-items-center justify-content-center">
                                  <div className="entries-edit-delete text-center">
                                    <button className="edit">Edit</button>
                                    <button>Delete</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="billing-back-btn">
                              <div className="billing-btn">
                                <button type="submit">Continue</button>
                              </div>
                            </div>
                          </div>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card> */}
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

MyAccount.propTypes = {
  location: PropTypes.object,
};

export default MyAccount;
