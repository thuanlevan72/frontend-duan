import React, { useEffect } from "react";
import {
    Breadcrumb,
    Image,
    Space,
    Table,
    Typography,
    Pagination,
    Tag,
    Button
} from "antd";
import { NavLink } from "react-router-dom";
import { BiEdit } from "react-icons/bi";
import { ImBin } from "react-icons/im";
import NewsAPI from "../../../api/news/NewsApi";
import { useState } from "react";
import { format } from "date-fns";
import LoadingSpin from "../../loading/LoadingSpin";

// const currentDate = new Date();
const { Text } = Typography;
const NewList = () => {
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
        pageSize: 10,
        search: "",
    });
    useEffect(() => {
        const getNews = async () => {
            try {
                setLoading(true);
                const { data } = await NewsAPI.GetNews(param);
                setLoading(false);
                setData(data);
            } catch (error) {
                setLoading(false);
            }
        };
        getNews();
    }, [param]);
    const dataSource = data?.data?.map((item, index) => {
        return {
            key: index + 1,
            id: item.newId,
            title: item.title,
            image: item.image,
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
            title: "Tiêu đề",
            dataIndex: "title",
            key: "title",
            align: "center",
        },
        {
            title: "Ảnh bìa",
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
            title: "Ngày tạo",
            dataIndex: "createdAt",
            key: "createdAt",
            align: "center",
            render: (createdAt) => (
                <>{format(new Date(createdAt), "HH:mm:ss dd/MM/yyyy")}</>
            ),
        },
        // {
        //     title: "Ngày cập nhật",
        //     dataIndex: "updatedAt",
        //     key: "updatedAt",
        //     align: "center",
        //     render: (updatedAt) => (
        //         <>{format(new Date(updatedAt), "HH:mm:ss dd/MM/yyyy")}</>
        //     ),
        // },
        {
            title: "Hành động",
            dataIndex: "action",
            key: "action",
            align: "center",
            render: (text, record) => (
                <Space size="middle">
                    <Button className="border border-white">
                        <NavLink to={`/admin/news-edit/${record.id}`}>
                            <BiEdit />
                        </NavLink>
                    </Button>
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
                <Breadcrumb.Item>Danh sách bài viết</Breadcrumb.Item>
            </Breadcrumb>
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
                    showTotal={(total) => `Total ${total} items`}
                />
            </div>
        </>
    );
};

export default NewList;
