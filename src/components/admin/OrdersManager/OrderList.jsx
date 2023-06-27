import React, { useState, useEffect } from "react";
import {
  Breadcrumb,
  Pagination,
  Space,
  Table,
  Select,
  Tag,
  Button,
  message,
  Modal,
  Descriptions,
  Image,
} from "antd";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import OrderApi from "../../../api/order/OrderApi.js";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";

const OrderList = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [currenOrderDeatail, setCurrenOrderDeatail] = useState([]);
  const [dataCurrent, setDataCurrent] = useState({});
  const [data, setData] = useState({
    totalItems: 0,
    totalPages: 0,
    page: 1,
    pageSize: 10,
    hasPrevious: false,
    hasNext: true,
    data: [],
  });
  const showModal = (id) => {
    const dataOrderCurrent = data.data.filter((x) => x.orderId === id)[0];
    setDataCurrent(dataOrderCurrent);
    setCurrenOrderDeatail(
      dataOrderCurrent.orderDetails.map((item, index) => {
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
    pageSize: 10,
    search: "",
  });
  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const { data } = await OrderApi.getAllOrders(param);
        setData(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getOrders();
  }, [param]);
  const dataSource = data.data?.map((item, index) => {
    return {
      key: index + 1,
      orderId: item.orderId,
      code: item.codeOrder,
      fullName: item.fullName,
      // phone: item.phone,
      // email: item.email,
      // address: item.address,
      // note: item.noteOrder,
      createdAt: item.createdAt,
      paymentOrder:
        item.paymentOrderPaymentId == 1 ? (
          <Tag color="cyan">Thanh toàn khi nhận hàng</Tag>
        ) : (
          <Tag color="green">Thanh toán online</Tag>
        ),
      orderStatus: item.orderStatus,
    };
  });

  const [options, setOptions] = useState([]);
  useEffect(() => {
    getStatus();
  }, []);
  const getStatus = async () => {
    try {
      const data = await OrderApi.getOrderStatus();
      setOptions(data);
    } catch (error) {}
  };
  const handleChangeStatus = (id) => async (orderId, newStatus) => {
    try {
      setLoading(true);
      await OrderApi.updateOrderStatus({
        id: id.orderId,
        idStatus: newStatus.value,
      });
      messageApi.open({
        type: "success",
        content: "Thay đổi trạng thái thành công",
      });
      setLoading(false);
      return;
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Thay đổi trạng thái thất bại",
      });
      return;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 4:
        return "#70a1ff";
      case 5:
        return "#2ed573";
      case 7:
        return "#ff4757";
      case 9:
        return "#ffa502";
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "code",
      key: "code",
      align: "center",
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullName",
      key: "fullName",
      align: "center",
    },

    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => (
        <>{format(new Date(createdAt), "HH:mm:ss dd/MM/yyyy")}</>
      ),
    },
    {
      title: "Phương thức thanh toàn",
      dataIndex: "paymentOrder",
      key: "paymentOrder",
      align: "center",
    },
    {
      title: "Trạng Thái",
      dataIndex: "orderStatus",
      key: "orderStatus",
      align: "center",
      render: (orderStatus, orderId) => (
        <Select
          defaultValue={orderStatus.orderStatusId}
          onChange={handleChangeStatus(orderId)}>
          {options &&
            options.map((item) => {
              return (
                <Select.Option
                  key={item.orderStatusId}
                  value={item.orderStatusId}>
                  <p style={{ color: getStatusColor(item.orderStatusId) }}>
                    {item.name}
                  </p>
                </Select.Option>
              );
            })}
        </Select>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "orderId",
      key: "orderId",
      align: "center",
      render: (orderId) => (
        <Space size="middle">
          <Button type="primary" onClick={(e) => showModal(orderId)}>
            Chi tiết
          </Button>
        </Space>
      ),
    },
  ];
  const columnDeatail = [
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
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách đơn hàng</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        width={1100}
        onOk={handleOk}
        onCancel={handleCancel}>
        <Descriptions title="Thông Tin Tiết người đặt">
          <Descriptions.Item label="Tên khách hàng">
            {dataCurrent && dataCurrent.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Số điện thoại">
            {" "}
            {dataCurrent && dataCurrent.phone}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {" "}
            {dataCurrent && dataCurrent.email}
          </Descriptions.Item>
          <Descriptions.Item label="Địa chỉ">
            {dataCurrent && dataCurrent.address}
          </Descriptions.Item>
          <Descriptions.Item label="Tổng tiền">
            {" "}
            {dataCurrent &&
              dataCurrent.actualPrice &&
              dataCurrent.actualPrice.toLocaleString("vi-VN")}{" "}
            vnd
          </Descriptions.Item>
          <Descriptions.Item label="Phương thức thanh toán">
            {dataCurrent && (
              <Tag
                color={
                  dataCurrent.paymentOrderPaymentId === 1 ? "cyan" : "green"
                }>
                {dataCurrent.paymentOrderPaymentId === 1
                  ? "Thanh Toán Khi Nhận Hàng"
                  : "Thanh Toán Online"}
              </Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Mã hóa đơn">
            {dataCurrent && dataCurrent.codeOrder}
          </Descriptions.Item>
        </Descriptions>
        <Table columns={columnDeatail} dataSource={currenOrderDeatail} />
      </Modal>
      <div>
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <Pagination
          style={{
            textAlign: "right",
            padding: "10px 20px",
          }}
          current={data.page}
          pageSize={data.pageSize}
          total={data.totalItems}
          onChange={handlePaginationChange}
          showSizeChanger
          showTotal={(total) => `Total ${total} items`}
        />
      </div>
    </>
  );
};

export default OrderList;
