import axiosClient from "../AxiosClient";

const UserApi = {
    getAllNoPagition: (params = null) => {
        const url = "/Product/getallproductfrontend";
        return axiosClient.get(url)
    }
};

export default UserApi;