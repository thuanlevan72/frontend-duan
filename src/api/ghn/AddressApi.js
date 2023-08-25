import GHNApi from "../GHNApi";

const AddressApi = {
    getProvinceData: () => {
        const url = "/province";
        return GHNApi.get(url);
    },
    getDistrictByProvince: (provinceId) => {
        const url = "/district";
        return GHNApi.get(url, {
            params: {
                province_id: provinceId
            }
        });
    },
    getWardsByDistrict: (districtId) => {
        const url = "/ward";
        return GHNApi.get(url, {
            params:{
                district_id: districtId,
            }
        });
    },
};
export default AddressApi;
