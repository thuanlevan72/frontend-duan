import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useEffect } from "react";
import OrderApi from "../../api/order/OrderApi";
import { Button, Descriptions, Image, Modal, Space, Table, Tag } from "antd";
import LoadingSpin from "../../components/loading/LoadingSpin";
import { format } from "date-fns";
const Cart = ({ location, cartItems }) => {
  const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
  const { pathname } = location;
  const [loading, setLoading] = useState(false);
  const [currenOrderDeatail, setCurrenOrderDeatail] = useState([]);
  const [dataOrderHistory, setDataOrderHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curentInfo, setCurenInfo] = useState({});
  const showModal = (codeOrder, data) => {
    const orderDetails = dataOrderHistory.filter(
      (x) => x.codeOrder === codeOrder
    )[0];
    setCurenInfo({
      address: data.address,
      phone: data.phone,
      paymentOrder: data.paymentOrder.paymentMethod,
      noteOrder: data.noteOrder,
      orderStatus: data.orderStatus.name,
      actualPrice: data.actualPrice,
      paymentId: data.paymentId,
      fullName: data.fullName,
      email: data.address,
      createdAt: data.createdAt,
      codeOrder: data.codeOrder,
    });
    setCurrenOrderDeatail(
      orderDetails.orderDetails.map((item, index) => {
        return {
          productId: index + 1,
          nameProduct: item.product.nameProduct,
          avartarImageProduct: item.product.avartarImageProduct,
          quantity: item.quantity,
          price: item.price.toLocaleString("vi-VN") + " " + "vnd",
          totalPrice:
            (item.price * item.quantity).toLocaleString("vi-VN") + " " + "vnd",
        };
      })
    );
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getDataApi = async () => {
      try {
        setLoading(true);
        const accountId = JSON.parse(localStorage.getItem("user")).accountId;
        const res = await OrderApi.GetOrderForUserId(accountId);
        setLoading(false);
        setDataOrderHistory(res);
      } catch (error) {}
    };
    getDataApi();
  }, []);
  const columns = [
    {
      title: "STT",
      dataIndex: "productId",
      key: "productId",
      align: "center",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "nameProduct",
      key: "nameProduct",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "avartarImageProduct",
      key: "avartarImageProduct",
      align: "center",
      render: (avartarImageProduct) => (
        <Image
          src={avartarImageProduct}
          alt={"image"}
          width={100}
          height={100}
          className="object-fit-cover border rounded-circle border border-success"
        />
      ),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      align: "center",
    },
  ];

  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | Lịch sử đơn hàng</title>
        <meta
          name="description"
          content="Cart page of flone react minimalist eCommerce template."
        />
      </MetaTags>

      <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
        Trang chủ
      </BreadcrumbsItem>
      <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
        Lịch sử đơn hàng
      </BreadcrumbsItem>

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb />
        <Modal
          title="Thông tin Đơn Hàng"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          width={"1000"}>
          <Descriptions title="Thông Tin Tiết người đặt">
            <Descriptions.Item label="UserName">
              {curentInfo && curentInfo.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Telephone">
              {" "}
              {curentInfo && curentInfo.phone}
            </Descriptions.Item>
            <Descriptions.Item label="address">
              {curentInfo && curentInfo.address}
            </Descriptions.Item>
            <Descriptions.Item label="Tổng tiền">
              {" "}
              {curentInfo &&
                curentInfo.actualPrice &&
                curentInfo.actualPrice.toLocaleString("vi-VN")}{" "}
              vnd
            </Descriptions.Item>
            <Descriptions.Item label="Phương thức thanh toán">
              {curentInfo && (
                <Tag color={curentInfo.paymentId === 1 ? "cyan" : "green"}>
                  {curentInfo.paymentOrder}
                </Tag>
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Mã hóa đơn">
              {curentInfo && curentInfo.codeOrder}
            </Descriptions.Item>
          </Descriptions>
          <Table columns={columns} dataSource={currenOrderDeatail} />
        </Modal>
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {loading && (
              <div>
                <LoadingSpin />
              </div>
            )}
            {dataOrderHistory && dataOrderHistory.length > 0 ? (
              <>
                <h3 className="cart-page-title">Lịch sử đơn hàng.</h3>
                <div className="row">
                  <div className="col-12">
                    {dataOrderHistory.map((item) => (
                      <>
                        <div className="table-content table-responsive cart-table-content">
                          <table>
                            <thead>
                              <tr>
                                <th>Mã đơn hàng</th>
                                <th>Trạng thái đơn hàng</th>
                                <th>Ngày tạo đơn</th>
                                <th>hoạt động</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr key={item.orderId}>
                                <td
                                  className="product-thumbnail"
                                  style={{ color: "green" }}>
                                  {item.codeOrder}
                                </td>

                                <td
                                  className="product-name"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}>
                                  <Tag
                                    color={
                                      item.orderStatus.orderStatusId === 4
                                        ? "#70a1ff"
                                        : item.orderStatus.orderStatusId === 5
                                        ? "#2ed573"
                                        : item.orderStatus.orderStatusId === 7
                                        ? "#ff4757"
                                        : item.orderStatus.orderStatusId === 9
                                        ? "#ffa502"
                                        : "white"
                                    }>
                                    {item.orderStatus.name}
                                  </Tag>
                                </td>

                                <td className="product-name">
                                  {format(
                                    new Date(item.createdAt),
                                    "HH:mm:ss dd/MM/yyyy"
                                  )}
                                </td>

                                <td className="product-quantity">
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent:
                                        item.orderStatus.orderStatusId == 4 &&
                                        new Date() - new Date(item.createdAt) <
                                          twoDaysInMillis
                                          ? "center"
                                          : "space-around",
                                    }}>
                                    {item.orderStatus.orderStatusId == 4 &&
                                      new Date() - new Date(item.createdAt) <
                                        twoDaysInMillis && (
                                        <Button type="dashed" danger>
                                          Hủy đơn
                                        </Button>
                                      )}
                                    {item.orderStatus.orderStatusId == 4 &&
                                      new Date() - new Date(item.createdAt) <
                                        twoDaysInMillis && (
                                        <div style={{ width: "5px" }}> </div>
                                      )}
                                    <Button
                                      type="primary"
                                      onClick={() =>
                                        showModal(item.codeOrder, item)
                                      }>
                                      Chi tiết
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div
                          style={{
                            width: "70%",
                            height: "1px",
                            border: "2px inset #fff",
                            margin: "20px 15%",
                          }}></div>
                      </>
                    ))}
                    {/* <div className="table-content table-responsive cart-table-content">
                      <div style={{ display: "flex", margin: "20 auto" }}>
                        <table>
                          <thead>
                            <tr>
                              <th>Ảnh</th>
                              <th>Tên sản phẩm</th>
                              <th>Đơn giá</th>
                              <th>Số lượng</th>
                              <th>Tổng phụ</th>
                              <th>Hoạt động</th>
                            </tr>
                          </thead>
                          <tbody>
                            {item.orderDetails.map((item) => (
                              <tr key={item.orderDetailId}>
                                <td className="product-thumbnail">
                                  <img
                                    src={item.product.avartarImageProduct}
                                    alt=""
                                  />
                                </td>
                                <td className="product-name">
                                  {item.product.nameProduct}
                                </td>
                                <td className="product-price-cart">
                                  {item.price} vnd
                                </td>
                                <td className="product-quantity">
                                  {item.quantity}
                                </td>
                                <td className="product-subtotal">
                                  {item.price * item.quantity} vnd
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div> */}
                  </div>
                </div>
              </>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-drawer"></i>
                    </div>
                    <div className="item-empty-area__text">
                      Không tồn tại đơn hàng <br />{" "}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
