import axiosClient from "../AxiosClient";

const OrderApi = {
    CreateOrder: (data) => {
        const url = "/Order";
        return axiosClient.post(url,data);
    },
};

export default OrderApi;
