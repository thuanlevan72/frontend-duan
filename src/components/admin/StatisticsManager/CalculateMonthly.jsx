import React, { useEffect, useState } from "react";
import { DualAxes } from "@ant-design/plots";
import StatisticsApi from "../../../api/statistic/StatisticsApi";
import { Alert, DatePicker } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // Import locale for Vietnamese language
const { RangePicker } = DatePicker;
const CalculateMonthly = () => {
  const [selectedDate, setSelectedDate] = useState({
    startDate: dayjs().subtract(6, "month"),
    endDate: dayjs(),
  });
  const [startDate, setStartDate] = useState(dayjs().subtract(6, "month"));
  const [endDate, setEndDate] = useState(dayjs());
  const [data, setData] = useState([
    {
      MonthYear: "1991/2/2",
      Revenue: 3,
      OrderCount: 10,
    },
    {
      MonthYear: "1992",
      Revenue: 4,
      OrderCount: 4,
    },
    {
      MonthYear: "1993",
      Revenue: 3.5,
      OrderCount: 5,
    },
    {
      MonthYear: "1994",
      Revenue: 5,
      OrderCount: 5,
    },
  ]);
  const handleDateChange = (dates) => {
    if (Array.isArray(dates) && dates.length === 2) {
      const startDate = dates[0].format("YYYY/MM/DD");
      const endDate = dates[1].format("YYYY/MM/DD");
      setSelectedDate({
        startDate,
        endDate,
      });
      // Thực hiện các xử lý khác với khoảng ngày đã chọn
    }
  };
  useEffect(async () => {
    try {
      const res = await StatisticsApi.GetCalculateMonthlyRevenue(selectedDate);
      setData(res);
    } catch (error) {
      //   SetLoading(false);
    }
  }, [selectedDate]);

  const config = {
    data: [data, data],
    xField: "MonthYear",
    yField: ["OrderCount", "Revenue"],
    geometryOptions: [
      {
        geometry: "column",
      },
      {
        geometry: "line",
        lineStyle: {
          lineWidth: 2,
        },
      },
    ],
    yAxis: {
      Revenue: {
        label: {
          formatter: (value) => `${value} VND`,
        },
      },
      OrderCount: {
        label: {
          formatter: (value) => `${value} Đơn Hàng`,
        },
      },
    },
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: "10px",
        }}>
        {" "}
        <RangePicker
          value={[startDate, endDate]}
          onChange={handleDateChange}
          allowClear={false}
        />
      </div>
      {data && data.length > 0 ? (
        <DualAxes {...config} />
      ) : (
        <Alert message="DỮ liệu không tồn tại" type="warning" />
      )}
    </>
  );
};

export default CalculateMonthly;
