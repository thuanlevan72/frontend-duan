import axiosClient from "../AxiosClient";

const OrderApi = {
  CreateOrder: (data) => {
    const url = "/Order";
    return axiosClient.post(url, data);
  },
  getDetailOrder: (id) => {
    const url = `/Order/getDetail/${id}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : ""
          }`,
      },
    });
  },
  CreateUrlVnPay: (amount) => {
    const url = "/Order/orderPayVn";
    return axiosClient.post(
      url,
      {},
      {
        params: {
          amount,
        },
      }
    );
  },
  updateOrderStatus: (params = null) => {
    const url = "/Order/updateStatusOrder";
    return axiosClient.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
            }`,
        },
        params,
      }
    );
  },
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
  GetWaitingorder: (params = null) => {
    const url = "/Order/getwaitingorder";
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
  GetCanceled: (params = null) => {
    const url = "Order/orderIsCanceled";
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
  GetCanceled: (params = null) => {
    const url = "Order/orderIsCanceled";
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
  GetBeingDelivered: (params = null) => {
    const url = "Order/getordersAreBeingDelivered";
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
  isPurchased: (userId, ProductId) => {
    const url = `Order/IsUserPurchasedProduct/${userId}/${ProductId}`;
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")
          ? JSON.parse(localStorage.getItem("token"))
          : ""
          }`,
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
  GetOrderForUserId: (id, param) => {
    const url = `/Order/getDetailForEmail/${id}?page=${param.page}&pageSize=${param.pageSize}`;
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
