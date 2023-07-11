import React from 'react';
import { Row, Col, Breadcrumb, Space, Card, Statistic, Divider } from 'antd';
import { ShoppingCartOutlined, DollarOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';
import CalculateMonthly from './StatisticsManager/CalculateMonthly';
import CalculateOrder from './StatisticsManager/CalculateOrder';
import TopSelling from './StatisticsManager/TopSelling';

const Dashboard = () => {
    const DashboardCard = ({ title, value, icon }) => {
        return (
            <Card>
                <Space direction="horizontal">
                    {icon}
                    <Statistic title={title} value={value} />
                </Space>
            </Card>
        );
    };

    return (
        <>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
                <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
            </Breadcrumb>

            <Row gutter={16}>
                <Col span={4}
                    style={{
                        marginRight: 24,
                        backgroundColor: 'rgba(0, 255, 0, 0.25)',
                        borderRadius: 20
                    }}>
                    <DashboardCard icon={<ShoppingCartOutlined
                        style={{
                            color: "green",
                            backgroundColor: "rgba(0, 255, 0, 0.25)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 12
                        }}
                    />} title="Đơn hàng" value={100} />
                </Col>
                <Col span={4}
                    style={{
                        marginRight: 24,
                        backgroundColor: 'rgba(255, 0, 0, 0.25)',
                        borderRadius: 20
                    }}>
                    <DashboardCard icon={<DollarOutlined
                        style={{
                            color: "red",
                            backgroundColor: "rgba(255, 0, 0, 0.25)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 12
                        }}
                    />} title="Doanh thu" value={5000} />
                </Col>
                <Col span={4}
                    style={{
                        marginRight: 24,
                        backgroundColor: 'rgba(0, 0, 255, 0.25)',
                        borderRadius: 20
                    }}>
                    <DashboardCard icon={<ShoppingOutlined
                        style={{
                            color: "blue",
                            backgroundColor: "rgba(0, 0, 255, 0.25)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 12
                        }}
                    />} title="Sản phẩm" value={50} />
                </Col>
                <Col span={4}
                    style={{
                        backgroundColor: 'rgba(148, 0, 211, 0.25)',
                        borderRadius: 20
                    }}>
                    <DashboardCard icon={<UserOutlined
                        style={{
                            color: "darkviolet",
                            backgroundColor: "rgba(148,0,211, 0.25)",
                            borderRadius: 20,
                            fontSize: 24,
                            padding: 12
                        }}
                    />} title="Khách hàng" value={200} />
                </Col>
            </Row>

            <Row wrap={false} style={{ marginTop: '16px', padding: '24px 0' }}>
                <Col flex={5} style={{ backgroundColor: '#F9FCFD', borderRadius: 20, marginRight: 36, padding: '12px 0' }}>
                    <Divider orientation="left" style={{ fontSize: 24 }}>Biểu đồ đơn đặt hàng</Divider>
                    <CalculateOrder />
                </Col>
                <Col flex={6} style={{ backgroundColor: '#F9FCFD', borderRadius: 20, padding: '12px 0' }}>
                    <Divider orientation="left" style={{ fontSize: 24 }}>Biểu đồ sản phẩm</Divider>
                    <TopSelling />
                </Col>
            </Row>

            <Row style={{ padding: '24px 0' }}>
                <Col span={24} style={{ backgroundColor: '#F9FCFD', marginBottom: '16px ', borderRadius: 20, padding: '12px 0' }}>
                    <Divider orientation="left" style={{ fontSize: 24 }}>Biểu đồ doanh thu</Divider>
                    <CalculateMonthly />
                </Col>
            </Row>
        </>
    );
};

export default Dashboard;