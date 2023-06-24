import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Breadcrumb, Button, Form, Input, Select, Upload } from "antd";
import Title from "antd/es/typography/Title";
import categoryAPI from "../../../api/category/CategoryApi";
import LoadingSpin from "../../loading/LoadingSpin";
const { TextArea } = Input;

const ProductAdd = () => {
  const [categories, setCategories] = useState();
  const [loading, setLoading] = useState(false);
  const [dataCreate, setDataCreate] = useState({
    ProductTypeId: 0,
    NameProduct: "",
    Price: 1.9,
    Quantity: 1,
    AvartarImageProduct: "",
    shortDescription: "",
    fullDescription: "",
    Discount: 1,
    Status: 1,
  });
  useEffect(() => {
    getDataApiCategory();
  }, []);
  const getDataApiCategory = async () => {
    try {
      setLoading(true);
      const { data } = await categoryAPI.getAllCategories({
        page: 1,
        pageSize: 20,
        search: "",
      });
      console.log(data);
      setCategories(data.data);
      setLoading(false);
    } catch (error) {}
  };
  return (
    <>
      <Breadcrumb
        style={{
          margin: "16px 0",
        }}>
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Tạo sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mt-3">
        <Title level={4} className="text-uppercase text-center">
          Thêm sản phẩm
        </Title>
        {loading && (
          <div>
            <LoadingSpin />
          </div>
        )}
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 1000 }}
          initialValues={{ remember: true }}
          autoComplete="off">
          <Form.Item label="Tên sản phẩm" name="NameProduct">
            <Input style={{ height: 30 }} />
          </Form.Item>
          <Form.Item label="Giá sản phẩm" name="Price">
            <Input style={{ height: 30 }} />
          </Form.Item>
          <Form.Item label="Số lượng" name="Quantity">
            <Input style={{ height: 30 }} />
          </Form.Item>
          <Form.Item label="Giảm giá" name="Discount">
            <Input style={{ height: 30 }} />
          </Form.Item>
          <Form.Item label="Danh mục" name="Category">
            <Select placeholder="Chọn danh mục">
              {categories &&
                categories.map((item, index) => {
                  return (
                    <Select.Option
                      key={item.productTypeId}
                      value={item.productTypeId}>
                      {item.nameProductType}
                    </Select.Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="Trạng thái" name="Status">
            <Select placeholder="Chọn trạng thái">
              <Select.Option key="1" value="1">
                Hiển thị
              </Select.Option>
              <Select.Option key="0" value="0">
                Ẩn
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Hình ảnh" tooltip="Ảnh sản phẩm xem trước">
            <Upload
              name="AvartarImageProduct"
              listType="picture-card"
              className="avatar-uploader"
              disabled>
              <div>
                {/* Image default */}
                <img
                  src="https://res.cloudinary.com/do9rcgv5s/image/upload/v1669841925/no-image-icon-6_ciydgz.png"
                  alt="Error"
                  width={100}
                />
              </div>
            </Upload>
            <input
              type="file"
              id="actual-btn"
              accept=".png,.jpg,.webp"
              className="form-control"
              hidden
            />
            <Button>
              <label htmlFor="actual-btn">Chọn ảnh</label>
            </Button>
          </Form.Item>
          <Form.Item label="Mô tả ngắn" name="shortDescription">
            <TextArea rows={2} placeholder="Mô tả ngắn sản phẩm..." />
          </Form.Item>
          <Form.Item label="Mô tả dài" name="fullDescription">
            <ReactQuill theme="snow" placeholder="Mô tả chi tiết sản phẩm..." />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default ProductAdd;
