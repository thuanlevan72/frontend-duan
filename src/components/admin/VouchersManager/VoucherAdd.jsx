import React, { useState } from "react";
import {
    Breadcrumb,
    Button,
    Form,
    Input,
} from "antd";
import Title from "antd/es/typography/Title";
import LoadingSpin from "../../loading/LoadingSpin";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useToasts } from "react-toast-notifications";
import VoucherApi from "../../../api/voucher/VoucherApi";
import { format } from "date-fns";

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: "* ${label} không được để trống",
    types: {
        number: "* ${label} không đúng định dạng số",
    },
};
const VoucherAdd = () => {
    const { addToast } = useToasts();
    const history = useHistory();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const onHandleSubmit = () => {
        form.validateFields().then(async (item) => {
            const formDataApi = new FormData();
            const formData = {
                voucherName: item.voucherName,
                valuevoucher: item.valuevoucher,
                countVoucher: item.countVoucher,
            };
            formDataApi.append("voucherName", formData.voucherName);
            formDataApi.append("valuevoucher", formData.valuevoucher);
            formDataApi.append("countVoucher", formData.countVoucher);
            await VoucherApi.CreateVoucher(formDataApi);
            addToast("Thêm mới mã giảm giá thành công!", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 1000,
            });
            history.push(`/admin/vouchers`);
        });
    };
    return (
        <>
            <Breadcrumb
                style={{
                    margin: "16px 0",
                }}
            >
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Tạo mã giảm giá</Breadcrumb.Item>
            </Breadcrumb>
            <div className="mt-3">
                <Title level={4} className="text-uppercase text-center">
                    Thêm mã giảm giá
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
                        label="Tên mã giảm giá"
                        name="voucherName"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Tên mã giảm giá"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập tên mã giảm giá..."
                        />
                    </Form.Item>
                    <Form.Item
                        label="Giá trị"
                        name="valuevoucher"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Giá gốc mã giảm giá"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập giá mã giảm giá..."
                            type="number"
                        />
                    </Form.Item>
                    <Form.Item
                        label="Số lượng"
                        name="countVoucher"
                        labelCol={{ span: 3, offset: 1 }}
                        tooltip="Tổng số lượng mã giảm giá"
                        rules={[{ required: true }]}
                    >
                        <Input
                            style={{ height: 30 }}
                            placeholder="Nhập số lượng mã giảm giá..."
                            type="number"
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 16, offset: 4 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={onHandleSubmit}
                            block
                        >
                            Thêm mới mã giảm giá
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default VoucherAdd;
