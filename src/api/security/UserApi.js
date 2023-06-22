import axiosClient from "../AxiosClient";

const UserApi = {
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
    ChangeAvartar: (id,body) =>{
        const url =`/User/update_avatar/${id}`;
        return axiosClient.post(url, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : ""}`
            }
        });
    }
    ,
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
    }
};

export default UserApi;