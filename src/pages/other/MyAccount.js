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

const MyAccount = ({ location }) => {
  const { pathname } = location;
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : ""
  );
  const handleFileChange =  async (event) => {
    const file = event.target.files[0];
  
    if (file.size > 2 * 1024 * 1024) {
      // Kích thước tệp tin vượt quá 2MB
      alert('Tệp tin quá lớn. Vui lòng chọn một tệp tin nhỏ hơn 2MB.');
      return;
    }
  
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      // Định dạng tệp tin không phải là hình ảnh
      alert('Vui lòng chọn một tệp tin hình ảnh (jpg, png, webp).');
      return;
    }
    setUser({
      ...user,
      avartar: URL.createObjectURL(file)
    })
    const formData = new FormData();
    formData.append('Avatar', file);
    const users = JSON.parse(localStorage.getItem("user"));
    try {
      setLoading(true);
      const res = await UserApi.ChangeAvartar(user.accountId, formData);
      users.avartar = res.data;
      localStorage.setItem("user", JSON.stringify(users));
      setLoading(false);
      history.go(0);
   }catch(error){
    alert(error)
    setLoading(false)
   }
  };
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
                                  <input type="text"  value={user.user.userName}/>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Email</label>
                                  <input type="email" value={user.email} readOnly disabled/>
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12" >
                                <div className="billing-info">
                                  <label>Address</label>
                                  <input type="text" value={user.user.address}/>
                                </div>
                              </div>
                              {loading && (<div><LoadingSpin/></div>)}
                              <div className="col-lg-6 col-md-6">
                                <div className="billing-info">
                                  <label>Telephone</label>
                                  <input type="text" value={user.user.phone}/>
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
                                  <h4 style={{ padding: "10px 20px", fontWeight:"bolder" }}>
                                    thay avatar{" "}
                                  </h4>
                                  <input type="file" onChange={handleFileChange} />
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
                                  <input type="password" />
                                </div>
                              </div>
                              <div className="col-lg-12 col-md-12">
                                <div className="billing-info">
                                  <label>Password Confirm</label>
                                  <input type="password" />
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
                    </Card>
                    <Card className="single-my-account mb-20">
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
                    </Card>
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
