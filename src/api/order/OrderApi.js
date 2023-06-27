import axiosClient from "../AxiosClient";

const OrderApi = {
  CreateOrder: (data) => {
    const url = "/Order";
    return axiosClient.post(url, data);
  },
  updateOrderStatus: (params = null) => {
    const url = "/Order/updateStatusOrder";
    return axiosClient.post(url, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : ""
          }`,
      },
      params
    });
  }
  ,
  getAllOrders: (params = null) => {
    const url = "/Order";
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
  getOrderStatus: () => {
    const url = "/OrderStatus";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : ""
          }`,
      },
    });
  },
  GetOrderForCode: async (code) => {
    const url = `/Order/${code}`;
    return await axiosClient.get(url, {});
  },
  GetOrderForEmail: (email) => {
    const url = `/Order/getDetailForEmail/${email}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : ""
          }`,
      },
    });
  },
};

export default OrderApi;
