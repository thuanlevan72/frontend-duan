import axiosClient from "../AxiosClient";

const ProductReviewApi = {
  getReviewForproduct: (params) => {
    const url = `/ProductReview/getforproduct`;
    return axiosClient.get(url, {
      params: {
        ...params,
      },
    });
  },
  SeenMess: (body) => {
    const url = `/ProductReview`;
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
};

export default ProductReviewApi;
