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
  Popconfirm,
} from "antd";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import categoryAPI from "../../../api/category/CategoryApi";
import { useState } from "react";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";

// const currentDate = new Date();
const { Text } = Typography;
const CategoryList = () => {
  const [loading, setLoading] = useState(false);
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
  const cancel = (e) => {};
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    search: "",
  });
  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const { data } = await categoryAPI.getAllCategories(param);
        setLoading(false);
        setData(data);
      } catch (error) {
        setLoading(false);
      }
    };
    getCategories();
  }, [param]);
  const DeleteCategory = async (id) => {
    try {
      setLoading(true);
      const res = await categoryAPI.removeCategory(id);
      setParam({ ...param });
      setLoading(false);
    } catch (error) {
      alert(
        "sản phẩm xóa thất bại có thể là loại sản phẩm này đã có sản phẩm phụ thuộc rồi"
      );
      setLoading(false);
    }
  };
  const dataSource = data?.data?.map((item, index) => {
    return {
      key: index + 1,
      id: item.productTypeId,
      nameProductType: item.nameProductType,
      quantity: item.products.length,
      imageTypeProduct: item.imageTypeProduct,
      createdAt: item.createdAt,
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
      title: "Tên danh mục",
      dataIndex: "nameProductType",
      key: "nameProductType",
      align: "center",
      render: (nameProductType) => <Tag color="#f50">{nameProductType}</Tag>,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
      render: (quantity) => <Tag color="blue">{quantity}</Tag>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "imageTypeProduct",
      key: "imageTypeProduct",
      align: "center",
      render: (imageTypeProduct) => (
        <Image
          src={imageTypeProduct}
          alt={imageTypeProduct}
          width={100}
          height={100}
          className="object-fit-cover border rounded-circle border border-success"
        />
      ),
    },
    {
      title: "Ngày tạo",
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
          <NavLink to={`/admin/categories-edit/${record.id}`}>
            <BiEdit className="text-info" />
          </NavLink>
          <Popconfirm
            title="Xóa loại sản phẩm"
            description="Bạn chắc chắn là muốn xóa loại sản phẩn này chứ?"
            onConfirm={() => DeleteCategory(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No">
            <Text type="danger">
              <ImBin />
            </Text>
          </Popconfirm>
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
        <Breadcrumb.Item>Danh sách danh mục</Breadcrumb.Item>
      </Breadcrumb>
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
          showTotal={(total) => `Tổng ${total} sản phẩm`}
        />
      </div>
    </>
  );
};

export default CategoryList;
