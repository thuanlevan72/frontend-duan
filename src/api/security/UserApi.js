import axiosClient from "../AxiosClient";

const UserApi = {
    getAllNoPagition: (params = null) => {
        const url = "/User";
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
    Register: (body) => {
        const url = "/Login/register-user";
        return axiosClient.post(url, body, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    },
    Login: (body) => {
        const url = "/Login/login";
        return axiosClient.post(url, body, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
    },
    ChangePass: (body) => {
        const url = `/Login/change-pass`;
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : ""}`
            }
        });
    }
    ,
    ChangeInfo: (id, body) => {
        const url = `/User/updateUser/${id}`;
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : ""}`
            }
        });
    }
    ,
    ChangeAvartar: (id, body) => {
        const url = `/User/update_avatar/${id}`;
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : ""}`
            }
        });
    },
    getAllUsers: (params = null) => {
        const url = "/User";
        return axiosClient.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : ""}`
            },
            params: {
                ...params
            }

        });
    },
    getUser: (id) => {
        const url = `/User/${id}`;
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

export default UserApi;