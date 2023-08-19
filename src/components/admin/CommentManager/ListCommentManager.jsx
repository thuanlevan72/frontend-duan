import React, { useEffect } from "react";
import {
  Breadcrumb,
  Image,
  Space,
  Table,
  Typography,
  Pagination,
  Tag,
  Button,
  Modal,
  Form,
  Rate,
  message,
} from "antd";
import { NavLink } from "react-router-dom";
import { BiComment } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import categoryAPI from "../../../api/category/CategoryApi";
import { useState } from "react";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import ProductReviewApi from "../../../api/product/ProductReviewApi";
import TextArea from "antd/es/input/TextArea";

// const currentDate = new Date();
const { Text, Paragraph } = Typography;
const ListCommentManager = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCurrent, setDataCurrent] = useState();
  const { id } = useParams();
  const [data, setData] = useState({
    totalItems: 0,
    totalPages: 0,
    page: 1,
    pageSize: 10,
    hasPrevious: false,
    hasNext: true,
    data: [],
  });
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
  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await ProductReviewApi.ReplyMess(
        dataCurrent.productReviewId,
        values.mess
      );
      messageApi.open({
        type: "success",
        content: "Đã trả lời bình luận thành công",
      });
      setLoading(false);
      setParam({
        ...param,
      });
      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const showModal = (id) => {
    setDataCurrent(data.data.filter((x) => x.productReviewId === id)[0]);
    console.log(data?.data);
    form.setFieldsValue({
      mess: data.data.filter((x) => x.productReviewId === id)[0].contentSeen,
    });
    setIsModalOpen(true);
  };
  console.log(dataCurrent);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    productId: id,
  });
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const { data } = await ProductReviewApi.getReviewForproduct(param);
        console.log(data);
        // setDataCurrent({});
        setLoading(false);
        setData(data);
      } catch (error) {
        setLoading(false);
      }
    };
    getCategories();
  }, [param]);
  const dataSource = data?.data?.map((item, index) => {
    return {
      key: index + 1,
      id: item.productReviewId,
      userName: item.user.userName || item.user.account.userName,
      avartar: item.user.account.avartar,
      contentRated: item.contentRated,
      createdAt: item.createdAt,
      pointEvaluation: item.pointEvaluation,
      contentSeen: item.contentSeen,
      // updatedAt: item.updatedAt,
    };
  });
  const columns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      align: "center",
    },
    {
      title: "Tên người gửi",
      dataIndex: "userName",
      key: "userName",
      align: "center",
      render: (userName) => <Tag color="#f50">{userName}</Tag>,
    },

    {
      title: "Ảnh đại diện",
      dataIndex: "avartar",
      key: "avartar",
      align: "center",
      render: (avartar) => (
        <Image
          src={avartar}
          alt={avartar}
          width={100}
          height={100}
          className="object-fit-cover border rounded-circle border border-success"
        />
      ),
    },
    {
      title: "nội dung",
      dataIndex: "contentRated",
      key: "contentRated",
      align: "left",
      render: (contentRated) => <Paragraph>{contentRated}</Paragraph>,
    },
    {
      title: "đánh giá",
      dataIndex: "pointEvaluation",
      key: "pointEvaluation",
      align: "left",
      render: (pointEvaluation) => (
        <Rate disabled defaultValue={pointEvaluation} />
      ),
    },
    {
      title: "trạng thái",
      dataIndex: "contentSeen",
      key: "statusComment",
      align: "left",
      render: (contentSeen) =>
        contentSeen ? (
          <Tag color="blue">{"đã trả lời"}</Tag>
        ) : (
          <Tag color="red">{"chưa trả lời"}</Tag>
        ),
    },
    {
      title: "Ngày Gửi",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (createdAt) => (
        <>{format(new Date(createdAt), "HH:mm:ss dd/MM/yyyy")}</>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <BiComment
            className="text-info"
            onClick={() => showModal(record.id)}
          />
          <Text type="danger">
            <ImBin />
          </Text>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>danh sách bình luận</Breadcrumb.Item>
      </Breadcrumb>
      {contextHolder}
      <div>
        <Modal
          open={isModalOpen}
          width={1100}
          onOk={handleOk}
          onCancel={handleCancel}>
          <Form
            name="basic"
            form={form}
            style={{
              maxWidth: 700,
            }}
            // initialValues={{
            //   mess: dataCurrent && dataCurrent.contentRated,
            // }}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off">
            <Form.Item
              label="Nội dung trả lời"
              name="mess"
              value={dataCurrent && dataCurrent.contentRated}
              rules={[
                {
                  required: true,
                  message: "Please input your mess!",
                },
              ]}>
              <TextArea />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                gửi phản hồi
              </Button>
            </Form.Item>
          </Form>
        </Modal>
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
          showTotal={(total) => `Tổng ${total} sản phẩm`}
        />
      </div>
    </>
  );
};

export default ListCommentManager;
