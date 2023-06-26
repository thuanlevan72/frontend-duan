import axiosClient from "../AxiosClient";

const OrderApi = {
  CreateOrder: (data) => {
    const url = "/Order";
    return axiosClient.post(url, data);
  },
  getAllOrders: (params = null) => {
    const url = "/Order";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
      params: {
        ...params,
      },
    });
  },
  GetOrderForEmail: (email) => {
    const url = `/Order/getDetailForEmail/${email}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
};

export default OrderApi;
