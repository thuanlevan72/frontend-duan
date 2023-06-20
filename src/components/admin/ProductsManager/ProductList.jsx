import React, { useEffect, useState } from "react";
import { Breadcrumb, Image, Pagination, Space, Table, Typography } from "antd";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import ProductApi from "../../../api/product/ProductApi";

const { Text } = Typography;
const ProductList = () => {
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
    // debugger
    setParam((prev)=>prev = {
        ...param,
        page:page,
        pageSize: pageSize
    })
  };
  const [param, setParam] = useState({
    page: 1,
    pageSize: 10,
    search: "",
  });
  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await ProductApi.getAllProducts(param);
        setData(data);

      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [param]);
  console.log(data);
  const dataSource = data.data?.map((item, index) => {
    return {
      key: index + 1,
      id: item.productTypeId,
      name: item.nameProduct,
      image: item.avartarImageProduct,
      price: item.price,
      discount: item.discount,
      quantity: item.quantity,
      categoryName: item.productType.nameProductType,
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
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên món",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      align: "center",
      render: (image) => (
        <Image
          src={image}
          alt={image}
          width={100}
          height={100}
          className="object-fit-cover border rounded-circle border border-success"
        />
      ),
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      align: "center",
    },
    {
      title: "Giảm giá (%)",
      dataIndex: "discount",
      key: "discount",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "center",
    },
    {
      title: "Tên danh mục",
      dataIndex: "categoryName",
      key: "categoryName",
      align: "center",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: () => (
        <Space size="middle">
          <NavLink to={"/admin/products-edit"}>
            <BiEdit />
          </NavLink>
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
        }}
      >
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Danh sách sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
        <Pagination style={{
            textAlign:"right",
            padding:"10px 20px"
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

export default ProductList;
