import axiosClient from "../AxiosClient";

const ContactApi = {
    postApiContact: (data,params = null) => {
        const url = "/Contact";
        return axiosClient.post(url,data,{
          params
        })
    }
};

export default ContactApi;