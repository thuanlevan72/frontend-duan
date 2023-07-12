import axiosClient from "../AxiosClient";

const StatisticsApi = {
  GetTopSellingProducts: (params = null) => {
    const url = "/Statistics/TopSellingProducts";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : ""
          }`,
      },
      params: {
        ...params,
      },
    });
  },
  GetCalculateMonthlyRevenue: (params = null) => {
    const url = "/Statistics/CalculateMonthlyRevenue";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : ""
          }`,
      },
      params: {
        ...params,
      },
    });
  },
  GetCalculateOrderStatusData: (params = null) => {
    debugger
    const url = "/Statistics/CalculateOrderStatusData";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : ""
          }`,
      },
      params: {
        ...params,
      },
    });
  },
  GetStatisticsData: (params = null) => {
    const url = "/Statistics/StatisticsData";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : ""
          }`,
      },
      params: {
        ...params,
      },
    });
  },
};

export default StatisticsApi;
