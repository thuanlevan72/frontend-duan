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
    getAll: (params = null) => {
        const url = "/Contact";
        return axiosClient.get(url, {
            params: {
                ...params
            }
        });
    }
};

export default UserApi;