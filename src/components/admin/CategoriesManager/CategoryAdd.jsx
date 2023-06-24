import React from "react";
import { Breadcrumb, Button, Form, Input, Upload } from "antd";
import Title from "antd/es/typography/Title";

const CategoryAdd = () => {
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Tạo danh mục</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-3">
                <Title level={4} className="text-uppercase text-center">Thêm danh mục</Title>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 1000 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                >
                    <Form.Item label="Tên danh mục" name="nameProductType">
                        <Input style={{ height: 30 }} />
                    </Form.Item>
                    <Form.Item
                        label="Hình ảnh"
                        tooltip="Ảnh danh mục xem trước"
                    >
                        <Upload
                            name="imageTypeProduct"
                            listType="picture-card"
                            className="avatar-uploader"
                            disabled
                        >
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
                            accept=".png,.jpg"
                            className="form-control"
                            hidden
                        />
                        <Button>
                            <label htmlFor="actual-btn">Chọn ảnh</label>
                        </Button>
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

export default CategoryAdd;
