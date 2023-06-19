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
};

export default ProductApi;
