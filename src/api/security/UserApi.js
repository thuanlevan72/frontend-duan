import axiosClient from "../AxiosClient";

const UserApi = {
  getAllNoPagition: (params = null) => {
    const url = "/User";
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
  Register: (body) => {
    const url = "/Login/register-user";
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  Login: (body) => {
    const url = "/Login/login";
    return axiosClient.post(url, body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  ChangePass: (body) => {
    const url = `/Login/change-pass`;
    return axiosClient.post(url, body, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
  ChangeInfo: (id, body) => {
    const url = `/User/updateUser/${id}`;
    return axiosClient.post(url, body, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
  ChangeAvartar: (id, body) => {
    const url = `/User/update_avatar/${id}`;
    return axiosClient.post(url, body, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
  getAllUsers: (params = null) => {
    const url = "/User";
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
  getUser: (id) => {
    const url = `/User/${id}`;
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
  updateUser: (id, body) => {
    const url = `/User/updateUser/${id}`;
    return axiosClient.get(url, body, {
      headers: {
        Authorization: `Bearer ${
          localStorage.getItem("token")
            ? JSON.parse(localStorage.getItem("token"))
            : ""
        }`,
      },
    });
  },
  updateStatusUser: (id) => {
    const url = `/User/change-status/${id}`;
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
  ForgotPassword: (body) => {
    const url = "User/forgot-password";
    return axiosClient.post(url, body);
  },
  ResetPassword: (body) => {
    const url = "User/reset-password";
    return axiosClient.post(url, body);
  },
  CheckToken: (token) => {
    const url = `User/check-token?token=${token}`;
    return axiosClient.post(url);
  },
  // chức này không liên quan đừng đụng đến
  MailPointRequestForm: (body) => {
    const url = `User/sendMail`;
    return axiosClient.post(url, body);
  },
  // chức này không liên quan đừng đụng đến
  EmailAdmissionForm: (body) => {
    const url = `User/sendMail/welcome-to-admission`;
    return axiosClient.post(url, body);
  },
};

export default UserApi;
