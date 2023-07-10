import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { animateScroll } from "react-scroll";
import Logo from "../../components/header/Logo";

const FooterTwo = ({
  backgroundColorClass,
  copyrightColorClass,
  spaceLeftClass,
  spaceRightClass,
  footerTopBackgroundColorClass,
  footerTopSpaceTopClass,
  footerTopSpaceBottomClass,
  footerLogo,
  backgroundImage
}) => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };
  return (
    <footer
      className={`footer-area ${backgroundColorClass ? backgroundColorClass : ""
        } ${spaceLeftClass ? spaceLeftClass : ""} ${spaceRightClass ? spaceRightClass : ""
        } ${backgroundImage ? "bg-img" : ""}`}
      style={{
        backgroundImage: ` ${backgroundImage
          ? `url(${process.env.PUBLIC_URL + backgroundImage})`
          : `url()`
          }`
      }}
    >
      <div
        className={`footer-top text-center ${footerTopBackgroundColorClass ? footerTopBackgroundColorClass : ""
          } ${footerTopSpaceTopClass ? footerTopSpaceTopClass : ""}  ${footerTopSpaceBottomClass ? footerTopSpaceBottomClass : ""
          }`}
      >
        <div className="container">
          <div className="footer-logo">
            <Link to={process.env.PUBLIC_URL}>
              <img
                alt=""
                style={{ maxWidth: "250px" }}
                src={"/assets/img/logo/GSlogo.png"}
              />

            </Link>
          </div>
          <p>
            Chúng tôi tự hào là doanh nghiệp đi đầu trong sản xuất thực phẩm chay an toàn, tinh khiết, kinh doanh nhà hàng chay hơn 15 năm qua, các sản phẩm của chúng tôi được làm bởi đầu bếp và đội ngũ nhân viên trường chay lâu năm, am hiểu về dinh dưỡng, thực dưỡng, thẩm mỹ và kinh nghiệm nghề bếp.
          </p>
          <div className="footer-social">
            <ul>
              <li>
                <a href="//www.facebook.com">
                  <i className="fa fa-facebook" />
                </a>
              </li>
              <li>
                <a href="//www.dribbble.com">
                  <i className="fa fa-dribbble" />
                </a>
              </li>
              <li>
                <a href="//www.pinterest.com">
                  <i className="fa fa-pinterest-p" />
                </a>
              </li>
              <li>
                <a href="//www.twitter.com">
                  <i className="fa fa-twitter" />
                </a>
              </li>
              <li>
                <a href="//www.linkedin.com">
                  <i className="fa fa-linkedin" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="footer-bottom text-center">
        <div className="container">
          <div
            className={`copyright-2 ${copyrightColorClass ? copyrightColorClass : ""
              }`}
          >
            <p>
              © 2020{" "}
              <a
                href="//www.hasthemes.com"
                rel="noopener noreferrer"
                target="_blank"
              >
                Flone
              </a>
              . All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
      <button
        className={`scroll-top ${scroll > top ? "show" : ""}`}
        onClick={() => scrollToTop()}
      >
        <i className="fa fa-angle-double-up"></i>
      </button>
    </footer>
  );
};

FooterTwo.propTypes = {
  backgroundColorClass: PropTypes.string,
  copyrightColorClass: PropTypes.string,
  footerLogo: PropTypes.string,
  backgroundImage: PropTypes.string,
  footerTopBackgroundColorClass: PropTypes.string,
  footerTopSpaceBottomClass: PropTypes.string,
  footerTopSpaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string
};

export default FooterTwo;
