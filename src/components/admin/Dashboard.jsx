import React, { useEffect, useState } from "react";
import { Row, Col, Breadcrumb, Space, Card, Statistic, Divider } from "antd";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import CalculateMonthly from "./StatisticsManager/CalculateMonthly";
import CalculateOrder from "./StatisticsManager/CalculateOrder";
import TopSelling from "./StatisticsManager/TopSelling";
import LoadingSpin from "../loading/LoadingSpin";
import StatisticsApi from "../../api/statistic/StatisticsApi";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  useEffect(async () => {
    try {
      setLoading(true);
      const res = await StatisticsApi.GetStatisticsData();
      setLoading(false);
      setData(res);
    } catch (error) {
      setLoading(false);
    }
  }, []);
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
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Bảng điều khiển</Breadcrumb.Item>
        <Breadcrumb.Item>Thống kê</Breadcrumb.Item>
      </Breadcrumb>

      <Row gutter={16} justify="space-between">
        <Col
          span={5}
          style={{
            marginRight: 24,
            backgroundColor: "rgba(0, 255, 0, 0.25)",
            borderRadius: 20,
          }}>
          <DashboardCard
            icon={
              <ShoppingCartOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0, 255, 0, 0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 12,
                }}
              />
            }
            title="Đơn hàng"
            value={data.orderCount || 100}
          />
        </Col>
        <Col
          span={5}
          style={{
            marginRight: 24,
            backgroundColor: "rgba(0, 0, 255, 0.25)",
            borderRadius: 20,
          }}>
          <DashboardCard
            icon={
              <ShoppingOutlined
                style={{
                  color: "blue",
                  backgroundColor: "rgba(0, 0, 255, 0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 12,
                }}
              />
            }
            title="Sản phẩm"
            value={data.productCount || 100}
          />
        </Col>
        <Col
          span={5}
          style={{
            backgroundColor: "rgba(148, 0, 211, 0.25)",
            borderRadius: 20,
            marginRight: 24,
          }}>
          <DashboardCard
            icon={
              <UserOutlined
                style={{
                  color: "darkviolet",
                  backgroundColor: "rgba(148,0,211, 0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 12,
                }}
              />
            }
            title="Khách hàng"
            value={data.userCount || 100}
          />
        </Col>
        <Col
          span={5}
          style={{
            backgroundColor: "rgba(255, 0, 0, 0.25)",
            borderRadius: 20,
          }}>
          <DashboardCard
            icon={
              <DollarOutlined
                style={{
                  color: "red",
                  backgroundColor: "rgba(255, 0, 0, 0.25)",
                  borderRadius: 20,
                  fontSize: 24,
                  padding: 12,
                }}
              />
            }
            title="Doanh thu"
            value={data.revenue || 100}
          />
        </Col>
      </Row>
      {loading && (
        <div>
          <LoadingSpin />
        </div>
      )}
      <Row style={{ marginTop: "16px", padding: "24px 0" }}>
        <Col
          span={12}
          style={{
            backgroundColor: "#F9FCFD",
            borderRadius: 20,
            padding: "12px 0",
          }}>
          <Divider orientation="left" style={{ fontSize: 24 }}>
            Biểu đồ đơn đặt hàng
          </Divider>
          <CalculateOrder />
        </Col>
        <Col
          span={12}
          style={{
            backgroundColor: "#F9FCFD",
            borderRadius: 20,
            padding: "12px 0",
          }}>
          <Divider orientation="left" style={{ fontSize: 24 }}>
            Biểu đồ sản phẩm
          </Divider>
          <TopSelling SetLoading={setLoading} />
        </Col>
      </Row>

      <Row style={{ padding: "24px 0" }}>
        <Col
          span={24}
          style={{
            backgroundColor: "#F9FCFD",
            marginBottom: "16px ",
            borderRadius: 20,
            padding: "12px 0",
          }}>
          <Divider orientation="left" style={{ fontSize: 24 }}>
            Biểu đồ doanh thu
          </Divider>
          <CalculateMonthly />
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
