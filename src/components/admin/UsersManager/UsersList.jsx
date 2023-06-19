import React from "react";
import { useEffect } from "react";
import UserApi from "../../../api/security/UserApi";

const UsersList = () => {
    useEffect(()=>{
        const getDataUser = async ()=>{
             try {
            const response = await UserApi.getAll({}); // đưa dữ liệu lên đăng ký
            console.log(response)
            // Xử lý phản hồi từ API tại đây (ví dụ: hiển thị thông báo thành công, điều hướng đến trang khác, vv)
          } catch (error) {
           console.log(error)           
            // Xử lý lỗi tại đây (ví dụ: hiển thị thông báo lỗi)
          }
        }
        getDataUser();
    },[])
    return <div>UsersList</div>;
};

export default UsersList;
