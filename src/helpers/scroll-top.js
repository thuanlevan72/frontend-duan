import { message } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ScrollToTop = props => {
  const [userCheckToken, setUserCheckToken] = useState(localStorage.getItem("token") || "");
  const [messageApi, contextHolder] = message.useMessage();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(()=>{
    const expiration = localStorage.getItem("expiration") || "";
    const user = localStorage.getItem("user") || "";

    if(userCheckToken && expiration && user){
        const currentTime = new Date().getTime();
        if (currentTime > expiration) {
            localStorage.removeItem('token');
            localStorage.removeItem('expiration');
            localStorage.removeItem('user');
            props.messageApi.open({
                type: 'warning',
                content: "hết hạn đăng nhập vui lòng đăng nhập lại",
              });
              setTimeout(() => {
                history.push("/login-register")
              }, 1000);
          }
          
    }
},[userCheckToken])
  return props.children;
};

export default withRouter(ScrollToTop);
