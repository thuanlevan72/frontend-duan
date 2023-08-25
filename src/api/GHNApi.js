import axios from "axios";
const GHN_API_BASE_URL =
    "https://online-gateway.ghn.vn/shiip/public-api/master-data/";
const GHNApi = axios.create({
    baseURL: GHN_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Token: "08150c33-42ba-11ee-af43-6ead57e9219a",
    },
});
export default GHNApi;
