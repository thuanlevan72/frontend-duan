import axiosClient from "../AxiosClient";

const ProductApi = {
  getAllNoPagition: (params = null) => {
    const url = "/Product/getallproductfrontend";
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
  CreateProduct: (body) => {
    const url = "/Product";
    return axiosClient.post(url, body, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
  IncreaseViews: async (id) => {
    const url = `/Product/increaseviews/${id}`;
    return await axiosClient.get(url);
  },
  getAllProducts: (params = null) => {
    const url = "/Product";
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
};

export default ProductApi;
