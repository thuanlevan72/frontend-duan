import axiosClient from "../AxiosClient";

const categoryAPI = {
    getAllCategories: (params = null) => {
        const url = "/ProductType";
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
export default categoryAPI;
