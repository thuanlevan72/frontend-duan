import React, { useEffect } from "react";
import { Breadcrumb, Image, Space, Table, Typography, Pagination, Tag } from "antd";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import categoryAPI from "../../../api/category/CategoryApi";
import { useState } from "react";
import { format } from 'date-fns';
import LoadingSpin from "../../loading/LoadingSpin";

// const currentDate = new Date();
const { Text } = Typography;
const CategoryList = () => {
    // const [categories, setCategories] = useState();
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
    const [param, setParam] = useState({
        page: 1,
        pageSize: 5,
        search: "",
    });
    useEffect(() => {
        const getCategories = async () => {
            try {
                setLoading(true);
                const { data } = await categoryAPI.getAllCategories(param);
                setLoading(false)
                setData(data);
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        };
        getCategories();
    }, [param]);
    console.log(data);
    const dataSource = data?.data?.map((item, index) => {
        return {
            key: index + 1,
            id: item.productTypeId,
            nameProductType: item.nameProductType,
            imageTypeProduct: item.imageTypeProduct,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
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
            render: (nameProductType) => (<Tag color="#f50">{nameProductType}</Tag>)
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
                <>
                    {format(new Date(createdAt), 'HH:mm:ss dd/MM/yyyy')}
                </>
            ),
        },
        {
            title: "Ngày cập nhật",
            dataIndex: "updatedAt",
            key: "updatedAt",
            align: "center",
            render: (updatedAt) => (
                <>
                    {format(new Date(updatedAt), 'HH:mm:ss dd/MM/yyyy')}
                </>
            ),
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
                <Breadcrumb.Item>Danh sách danh mục</Breadcrumb.Item>
            </Breadcrumb>
            <div>
                {loading && (<div><LoadingSpin /></div>)}
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

export default CategoryList;
