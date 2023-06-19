import axiosClient from "../AxiosClient";

const ProductApi = {
    getAllNoPagition: (params = null) => {
        const url = "/Product/getallproductfrontend";
        return axiosClient.get(url)
    }
};

export default ProductApi;