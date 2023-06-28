import React, { useEffect, useState } from "react";
import {
    Breadcrumb,
    Button,
    Col,
    Form,
    Input,
    Row,
    Select,
    Upload,
} from "antd";
import Title from "antd/es/typography/Title";
import categoryAPI from "../../../api/category/CategoryApi";
import LoadingSpin from "../../loading/LoadingSpin";
import ProductApi from "../../../api/product/ProductApi";
import {
    useParams,
    useHistory,
} from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
const { TextArea } = Input;

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: "* ${label} không được để trống",
    types: {
        number: "* ${label} không đúng định dạng số",
    },
};
const ProductEdit = () => {
    const { addToast } = useToasts();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState("");
    const [form] = Form.useForm();
    const { id } = useParams();
    useEffect(() => {
        const getProductDetail = async (id) => {
            const { data } = await ProductApi.getProductDetail(id);
            setPreview(data.avartarImageProduct);
            form.setFieldsValue(data);
        };
        getProductDetail(id);
    }, [form, id]);
    // upload image
    const [fileList, setFileList] = useState([]);
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
        // View local photos
        const filePreview = URL.createObjectURL(file);
        setPreview(filePreview);
    };
    const onHandleSubmit = () => {
        form.validateFields().then(async (item) => {
            const formData = {
                NameProduct: item.nameProduct,
                Price: item.price,
                Quantity: item.quantity,
                Discount: item.discount,
                ProductTypeId: item.productTypeId,
                Status: item.status,
                AvartarImageProduct: fileList[0] || preview,
                shortDescription: item.shortDescription,
                fullDescription: item.fullDescription,
            };
            const formDataApi = new FormData();
            setLoading(true);
            formDataApi.append("nameProduct", formData.NameProduct);
            formDataApi.append("price", formData.Price);
            formDataApi.append("quantity", formData.Quantity);
            formDataApi.append("discount", formData.Discount);
            formDataApi.append("productTypeId", formData.ProductTypeId);
            formDataApi.append("status", formData.Status);
            formDataApi.append(
                "avartarImageProduct",
                formData.AvartarImageProduct
            );
            formDataApi.append("shortDescription", formData.shortDescription);
            formDataApi.append("fullDescription", formData.fullDescription);
            try {
                await ProductApi.updateProduct(id, formDataApi);
                setLoading(false);
                addToast("Cập nhật sản phẩm thành công!", {
                    appearance: "success",
                });
                history.push(`/admin/products`);
            } catch (error) {
                addToast("Cập nhật sản phẩm thất bại!", {
                    appearance: "error",
                });
            }
        });
    };
    const [categories, setCategories] = useState();
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
        } catch (error) {}
    };
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Cập nhật sản phẩm</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-3">
                <Title level={4} className="text-uppercase text-center">
                    Cập nhật sản phẩm
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
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    form={form}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        label="Tên sản phẩm"
                        name="nameProduct"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Tên sản phẩm"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập tên sản phẩm..."
                        />
                    </Form.Item>
                    <Form.Item
                        label="Giá sản phẩm"
                        name="price"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Giá gốc sản phẩm"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập giá sản phẩm..."
                            type="number"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="quantity"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Tổng số lượng sản phẩm"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập số lượng sản phẩm..."
                            type="number"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Giảm giá"
                        name="discount"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="% Giảm giá sản phẩm"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập giảm giá..."
                        />
                    </Form.Item>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Danh mục"
                                name="productTypeId"
                                labelCol={{ span: 4, offset: 4 }}
                                rules={[{ required: true }]}
                            >
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
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Trạng thái"
                                name="status"
                                style={{ width: "calc(100% - 131px)" }}
                                labelCol={{ span: 0, offset: 0 }}
                                rules={[{ required: true }]}
                            >
                                <Select placeholder="Chọn trạng thái">
                                    <Select.Option key="1" value="1">
                                        Hiển thị
                                    </Select.Option>
                                    <Select.Option key="0" value="0">
                                        Ẩn
                                    </Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Hình ảnh"
                        tooltip="Ảnh sản phẩm xem trước"
                        name="avartarImageProduct"
                        labelCol={{ span: 3, offset: 1 }}
                        rules={[{ required: true }]}
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
                            {
                                <img
                                    src={preview}
                                    alt={preview}
                                    width={96}
                                    className="rounded"
                                />
                            }
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Mô tả ngắn"
                        name="shortDescription"
                        labelCol={{ span: 3, offset: 1 }}
                        rules={[{ required: true }]}
                    >
                        <TextArea
                            rows={2}
                            placeholder="Mô tả ngắn sản phẩm..."
                        />
                    </Form.Item>
                    <Form.Item
                        label="Mô tả dài"
                        name="fullDescription"
                        labelCol={{ span: 3, offset: 1 }}
                        rules={[{ required: true }]}
                    >
                        <TextArea
                            rows={4}
                            placeholder="Mô tả chi tiết sản phẩm..."
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={onHandleSubmit}
                            block
                        >
                            Cập nhật sản phẩm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default ProductEdit;
