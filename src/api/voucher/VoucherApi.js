import axiosClient from "../AxiosClient";

const VoucherApi = {
  UseVoucher: (userId, VoucherCode) => {
    const url = `/voucher/${userId}/${VoucherCode}`;
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
  ApllyVoucher: (userId, VoucherCode) => {
    const url = `/voucher/${userId}/${VoucherCode}`;
    return axiosClient.post(url, {
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

export default VoucherApi;
