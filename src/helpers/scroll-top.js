import { message } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchDataCarts } from "../redux/actions/cartActions";

const ScrollToTop = (props) => {
  const [userCheckToken, setUserCheckToken] = useState(
    localStorage.getItem("token") || ""
  );
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  useEffect(() => {
    const expiration = localStorage.getItem("expiration") || "";
    const user = localStorage.getItem("user") || "";
    dispatch(fetchDataCarts([]));
    if (userCheckToken && expiration && user) {
      const currentTime = new Date().getTime();
      if (currentTime > expiration) {
        localStorage.removeItem("token");
        localStorage.removeItem("expiration");
        localStorage.removeItem("user");
        props.messageApi.open({
          type: "warning",
          content: "Hết hạn đăng nhập",
        });
        setTimeout(() => {
          history.push("/login-register");
        }, 1000);
      }
    }
  }, [localStorage.getItem("token")]);
  return props.children;
};

export default withRouter(ScrollToTop);
