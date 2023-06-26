import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Form, Input, Select, Upload } from "antd";
import Title from "antd/es/typography/Title";
import categoryAPI from "../../../api/category/CategoryApi";
import LoadingSpin from "../../loading/LoadingSpin";
import ProductApi from "../../../api/product/ProductApi";
const { TextArea } = Input;

const ProductAdd = () => {
    const [form] = Form.useForm();
    // upload image
    const [fileList, setFileList] = useState([]);
    const [preview, setPreview] = useState("");
    const handleBeforeUpload = (file) => {
        setFileList([file]);
        return false;
    };
    const handleUpload = () => {
        const file = fileList[0];
        if (file.size > 2 * 1024 * 1024) {
            alert("Tệp tin quá lớn. Vui lòng chọn một tệp tin nhỏ hơn 2MB.");
            return;
        }
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            alert("Vui lòng chọn một tệp tin hình ảnh (jpg, png, webp).");
            return;
        }
        const filePreview = URL.createObjectURL(file);
        setPreview(filePreview);
    };
    const onHandleSubmit = () => {
        form.validateFields().then(async (item) => {
            const formDataApi = new FormData();
            const formData = {
                NameProduct: item.NameProduct,
                Price: item.Price,
                Quantity: item.Quantity,
                Discount: item.Discount,
                ProductTypeId: item.Category,
                Status: item.Status,
                AvartarImageProduct: fileList[0],
                shortDescription: item.shortDescription,
                fullDescription: item.fullDescription,
            };
            formDataApi.append("NameProduct", formData.NameProduct);
            formDataApi.append("Price", formData.Price);
            formDataApi.append("Quantity", formData.Quantity);
            formDataApi.append("Discount", formData.Discount);
            formDataApi.append("ProductTypeId", formData.ProductTypeId);
            formDataApi.append("Status", formData.Status);
            formDataApi.append("AvartarImageProduct", formData.AvartarImageProduct);
            formDataApi.append("shortDescription", formData.shortDescription);
            formDataApi.append("fullDescription", formData.fullDescription);
            await ProductApi.CreateProduct(formDataApi);
        });
    };
    const [categories, setCategories] = useState();
    const [loading, setLoading] = useState(false);
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
            setCategories(data.data);
            setLoading(false);
        } catch (error) { }
    };
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
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
                    autoComplete="off"
                    form={form}
                >
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
                                categories.map((item) => {
                                    return (
                                        <Select.Option
                                            key={item.productTypeId}
                                            value={item.productTypeId}
                                        >
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
                    <Form.Item
                        label="Hình ảnh"
                        tooltip="Ảnh sản phẩm xem trước"
                        name="AvartarImageProduct"
                    >
                        <Upload
                            listType="picture-card"
                            className="avatar-uploader"
                            accept=".png,.jpg,.jpeg"
                            maxCount={1}
                            fileList={fileList}
                            beforeUpload={handleBeforeUpload}
                            onChange={handleUpload}
                            showUploadList={false}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt={preview}
                                    width={96}
                                    className="rounded"
                                />
                            ) : (
                                <img
                                    src="https://res.cloudinary.com/do9rcgv5s/image/upload/v1669841925/no-image-icon-6_ciydgz.png"
                                    alt="Error"
                                    width={96}
                                    className="rounded"
                                />
                            )}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Mô tả ngắn" name="shortDescription">
                        <TextArea
                            rows={2}
                            placeholder="Mô tả ngắn sản phẩm..."
                        />
                    </Form.Item>
                    <Form.Item label="Mô tả dài" name="fullDescription">
                        <TextArea
                            rows={4}
                            placeholder="Mô tả chi tiết sản phẩm..."
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={onHandleSubmit}
                        >
                            Tạo mới
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default ProductAdd;
