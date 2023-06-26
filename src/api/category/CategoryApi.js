import axiosClient from "../AxiosClient";

const categoryAPI = {
    getAllNoPagition: (params = null) => {
        const url = "/ProductType";
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
    getAllCategories: (params = null) => {
        const url = "/ProductType";
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
    CreateCategory: (body) => {
        const url = "/ProductType";
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")
                        ? JSON.parse(localStorage.getItem("token"))
                        : ""
                    }`,
            },
        });
    },
};
export default categoryAPI;
