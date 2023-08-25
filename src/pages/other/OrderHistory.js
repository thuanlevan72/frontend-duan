import PropTypes from "prop-types";
import React, { Fragment, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useEffect } from "react";
import OrderApi from "../../api/order/OrderApi";
import {
  Button,
  Descriptions,
  Image,
  Modal,
  Pagination,
  Space,
  Table,
  Tag,
} from "antd";
import LoadingSpin from "../../components/loading/LoadingSpin";
import { format } from "date-fns";
// import Bill from "./Bill";
import ReactToPrint from "react-to-print";
class Bill extends React.Component {
  render() {
    const { curentInfo, count, currenOrderDeatail } = this.props;
    const body = {
      font: "VCR OSD Mono",
      color: " #000",
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      fontZize: "10px",
    };
    const billStyles = {
      width: "400px",
      boxShadow: "0 0 3px #aaa",
      padding: "20px 20px",
      lineHeight: "30px",
      boxSizing: "border-box",
    };

    const tableStyles = {
      borderCollapse: "collapse",
      width: "100%",
      padding: "40px 0",
    };

    const headerRowStyles = {
      borderTop: "2px dashed #000",
      borderBottom: "2px dashed #000",
    };

    const totalRowStyles = {
      borderTop: "2px dashed #000",
      borderBottom: "2px dashed #000",
    };

    const netAmountRowStyles = {
      borderTop: "2px dashed #000",
    };

    return (
      <>
        <div style={body}>
          {console.log(currenOrderDeatail)}
          <div style={billStyles} className="bill">
            <div className="brand">PolyFood - Hóa đơn</div>
            <div className="address">
              địa chỉ - {curentInfo.address} <br /> Số điện thoại -{" "}
              {curentInfo.phone}
            </div>
            <div className="shop-details">
              Mã hóa đơn: {curentInfo.codeOrder}
            </div>
            <div className="shop-details">
              Tên người đặt: {curentInfo.fullName}
            </div>
            <div className="bill-details">
              <div>
                Tổng đơn: {curentInfo.actualPrice.toLocaleString("vi-VN")} vnd
              </div>

              <div className="flex justify-between">
                <div>Ngày đặt: {curentInfo.createdAt}</div>
                {/* <div>TIME: 14:10</div> */}
              </div>
            </div>
            <table style={tableStyles} className="table">
              <tbody>
                <tr style={headerRowStyles} className="header">
                  <th>Particulars</th> <th>Qty</th>
                  <th></th>
                  <th>Amount</th>
                </tr>
                {/* {
    "productId": 2,
    "nameProduct": "Khoai môn",
    "avartarImageProduct": "https://res.cloudinary.com/doedovklj/image/upload/v1686122885/xyz-abc_638217448807644326image.webp",
    "priceOld": "56.000 vnd",
    "quantity": 1,
    "price": "53.200 vnd",
    "totalPrice": "53.200 vnd"
} */}
                {currenOrderDeatail.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.nameProduct}</td>
                      <td>{item.quantity}</td>
                      <td></td>
                      <td>{item.totalPrice}</td>
                    </tr>
                  );
                })}
                <tr style={totalRowStyles} className="total">
                  <td />
                  <td>Tổng tiền</td>
                  <td>{count}</td>
                  <td>{curentInfo.actualPrice.toLocaleString("vi-VN")} vnd</td>
                </tr>

                {/* <td />
                  <td>CGST</td>
                  <td>5%</td>
                  <td>17.5</td>
                </tr>
                <tr>
                  <td />
                  <td>SGST</td>
                  <td>5%</td>
                  <td>17.5</td>
                </tr>
                <tr>
                  <td />
                  <td>RND-Off</td>
                  <td>0</td>
                  <td>17.5</td>
                </tr> */}
                {/* <tr style={netAmountRowStyles} className="net-amount">
                  <td />
                  <td>Net Amnt</td>
                  <td />
                  <td>385</td>
                </tr> */}
              </tbody>
            </table>
            Phương thức thanh toán: {curentInfo.paymentOrder}
            <br />
            Mã đơn hàng ID: {curentInfo.codeOrder}
            <br />
            Tên tài khoảng: {curentInfo.fullName}
            <br />
            Cảm ơn ! Vui lòng ghé thăm lại
          </div>
        </div>
      </>
    );
  }
}
const PrintButton = ({ invoiceRef }) => {
  console.log(invoiceRef);
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <ReactToPrint
        trigger={() => <button>Print Invoice</button>}
        content={() => invoiceRef.current}
      />
    </div>
  );
};
const Cart = ({ location, cartItems }) => {
  const twoDaysInMillis = 2 * 24 * 60 * 60 * 1000;
  const { pathname } = location;
  const [loading, setLoading] = useState(false);
  const invoiceRef = useRef(null);

  const [currenOrderDeatail, setCurrenOrderDeatail] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [dataOrderHistory, setDataOrderHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [curentInfo, setCurenInfo] = useState({});
  const showModal = (codeOrder, data) => {
    const orderDetails = dataOrderHistory.data.data.filter(
      (x) => x.codeOrder === codeOrder
    )[0];
    setCurenInfo({
      address: data.address,
      phone: data.phone,
      paymentOrder: data.paymentOrder.paymentMethod,
      noteOrder: data.noteOrder,
      imageComplete: data.imageComplete,
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
          priceOld: item.product.price.toLocaleString("vi-VN") + " " + "vnd",
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
  const handlePaginationChange = (page, pageSize) => {
    setParam(
      (prev) =>
        (prev = {
          ...param,
          page: page,
          pageSize: pageSize,
        })
    );
  };
  const [param, setParam] = useState({
    page: 1,
    pageSize: 6,
  });
  useEffect(() => {
    const getDataApi = async () => {
      try {
        setLoading(true);
        const accountId = JSON.parse(localStorage.getItem("user")).accountId;
        const res = await OrderApi.GetOrderForUserId(accountId, param);
        setLoading(false);
        setDataOrderHistory(res);
      } catch (error) {}
    };
    getDataApi();
  }, [param]);
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
      render: (price, record) => (
        <span>
          <del style={{ color: "#535c68" }}>{record.priceOld}</del>
          <br />
          {price}
        </span>
      ),
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
        <meta name="description" content="Cart page of PolyFood." />
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
          width={1200}>
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
            {curentInfo && curentInfo.imageComplete && (
              <Descriptions.Item label="Ảnh xác nhận khi hoàn thành">
                <Image width={100} src={curentInfo.imageComplete} />
              </Descriptions.Item>
            )}

            <Descriptions.Item label="In hóa đơn">
              <Button
                size="small"
                type="primary"
                onClick={() => {
                  setIsModal(true);
                }}>
                xem qua
              </Button>
            </Descriptions.Item>
          </Descriptions>
          <Table columns={columns} dataSource={currenOrderDeatail} />
          <Modal
            title="Demo hóa đơn"
            open={isModal}
            onOk={handleOk}
            width={600}
            onCancel={handleCancel}>
            <Bill
              curentInfo={curentInfo}
              count={currenOrderDeatail.reduce(
                (total, product) => total + product.quantity,
                0
              )}
              currenOrderDeatail={currenOrderDeatail}
              ref={invoiceRef}
            />
            <PrintButton invoiceRef={invoiceRef} />
          </Modal>
        </Modal>
        <div className="cart-main-area pt-90 pb-100">
          <div className="container">
            {loading && (
              <div>
                <LoadingSpin />
              </div>
            )}

            {dataOrderHistory &&
            dataOrderHistory.data &&
            dataOrderHistory?.data?.data?.length > 0 ? (
              <>
                <h3 className="cart-page-title">Lịch sử đơn hàng.</h3>
                <div className="row">
                  <div className="col-12">
                    {dataOrderHistory.data.data.map((item) => (
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
                    <Pagination
                      style={{
                        textAlign: "right",
                        padding: "10px 20px",
                      }}
                      current={dataOrderHistory.data.page}
                      pageSize={dataOrderHistory.data.pageSize}
                      total={dataOrderHistory.data.totalItems}
                      onChange={handlePaginationChange}
                      showSizeChanger
                      showTotal={(total) => `Tổng ${total} sản phẩm`}
                    />
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
