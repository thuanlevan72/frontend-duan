import React, { useEffect } from "react";
import {
    Breadcrumb,
    Space,
    Table,
    Typography,
    Pagination,
    Modal,
    Descriptions,
    Image,
    Popconfirm,
} from "antd";
import { FaRegEye } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import { useState } from "react";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";
import VoucherApi from "../../../api/voucher/VoucherApi";
import { useToasts } from "react-toast-notifications";

const { Text } = Typography;
const VoucherList = () => {
    const { addToast } = useToasts();
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataCurrent, setDataCurrent] = useState([]);
    const [currentUsed, setCurrentUsed] = useState([]);
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
    const [param, setParam] = useState({
        page: 1,
        pageSize: 10,
        search: "",
    });
    useEffect(() => {
        const getVouchers = async () => {
            try {
                setLoading(true);
                const { data } = await VoucherApi.getAllVouchers(param);
                setLoading(false);
                setData(data);
                setIsModalOpen(false);
            } catch (error) {
                setLoading(false);
                setIsModalOpen(false);
            }
        };
        getVouchers();
    }, [param]);
    // Remove voucher
    const handleOk = async (id) => {
        try {
            await VoucherApi.removeVoucher(id);
            const { data } = await VoucherApi.getAllVouchers(param);
            setData(data);
            addToast("Xóa mã giảm giá thành công!", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 1500,
            });
        } catch (error) {
            console.log(error);
        }
    };
    const handleCancel = () => {
        addToast("Hủy xóa", {
            appearance: "error",
            autoDismiss: true,
            autoDismissTimeout: 1000,
        });
    };
    const showModal = (id) => {
        const dataVoucher = data?.data?.find((x) => x.voucherId === id);
        setDataCurrent([
            {
                voucherId: dataVoucher.voucherId,
                voucherName: dataVoucher.voucherName,
                countVoucher: dataVoucher.countVoucher,
                voucherCode: dataVoucher.voucherCode,
            },
        ]);
        setCurrentUsed(
            dataVoucher.voucherUsers.map((item, index) => {
                return {
                    voucherUserId: index + 1,
                    userName: item.user.userName,
                    avatar: item.user.account.avartar,
                    phone: item.user.phone,
                    address: item.user.address,
                    email: item.user.email,
                };
            })
        );
        setIsModalOpen(true);
    };
    const handleOkModal = () => {
        setIsModalOpen(false);
    };
    const handleCancelModal = () => {
        setIsModalOpen(false);
    };
    const dataSource = data?.data?.map((item, index) => {
        return {
            key: index + 1,
            id: item.voucherId,
            title: item.voucherName,
            code: item.voucherCode,
            percent: item.valuevoucher,
            quantity: item.countVoucher,
            createdAt: item.createdAt,
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
            title: "Tên mã giảm giá",
            dataIndex: "title",
            key: "title",
            align: "center",
        },
        {
            title: "Mã giảm giá",
            dataIndex: "code",
            key: "code",
            align: "center",
        },
        {
            title: "Giảm giá (%)",
            dataIndex: "percent",
            key: "percent",
            align: "center",
        },
        {
            title: "Số lượng",
            dataIndex: "quantity",
            key: "quantity",
            align: "center",
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
            dataIndex: "id",
            key: "id",
            align: "center",
            render: (id) => (
                <Space size="middle">
                    <Text type="danger">
                        <FaRegEye
                            className="text-info"
                            onClick={() => showModal(id)}
                        />
                    </Text>
                    <Popconfirm
                        title="Bạn có chắc chắn xóa?"
                        onConfirm={() => {
                            handleOk(id);
                        }}
                        onCancel={handleCancel}
                        className="border border-white"
                        okText="Có"
                        cancelText="Hủy"
                    >
                        <ImBin className="text-danger" />
                    </Popconfirm>
                </Space>
            ),
        },
    ];
    const columnUser = [
        {
            title: "STT",
            dataIndex: "voucherUserId",
            key: "voucherUserId",
            align: "center",
        },
        {
            title: "Người đã sử dụng",
            dataIndex: "userName",
            key: "userName",
            align: "center",
        },
        {
            title: "Hình đại diện",
            dataIndex: "avatar",
            key: "avatar",
            align: "center",
            render: (avatar) => (
                <Image
                    src={avatar}
                    alt={"image"}
                    width={100}
                    height={100}
                    className="object-fit-cover border rounded-circle border border-success"
                />
            ),
        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone",
            align: "center",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            align: "center",
        },
        {
            title: "Địa chỉ",
            dataIndex: "address",
            key: "address",
            align: "center",
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
                <Breadcrumb.Item>Danh sách mã giảm giá</Breadcrumb.Item>
            </Breadcrumb>
            <Modal
                open={isModalOpen}
                width={1100}
                onOk={handleOkModal}
                onCancel={handleCancelModal}
            >
                <Descriptions title="Chi tiết mã giảm giá">
                    <Descriptions.Item label="Tên mã giảm giá">
                        {dataCurrent.length > 0 && dataCurrent[0].voucherName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Mã giảm giá">
                        {dataCurrent.length > 0 && dataCurrent[0].voucherCode}
                    </Descriptions.Item>
                    <Descriptions.Item label="Số lượng">
                        {dataCurrent.length > 0 && dataCurrent[0].countVoucher}
                    </Descriptions.Item>
                    <Descriptions.Item label="Ngày tạo">
                        {format(
                            new Date(
                                dataSource.length > 0 && dataSource[0].createdAt
                            ),
                            "dd/MM/yyyy"
                        )}
                    </Descriptions.Item>
                </Descriptions>
                <Table columns={columnUser} dataSource={currentUsed} />
            </Modal>
            <div>
                {loading && (
                    <div>
                        <LoadingSpin />
                    </div>
                )}
                <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                />
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
                    showTotal={(total) => `Tổng ${total} mã giảm giá`}
                />
            </div>
        </>
    );
};

export default VoucherList;
