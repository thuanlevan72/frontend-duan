import PropTypes from "prop-types";
import React from "react";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div
      className={`welcome-area ${spaceTopClass ? spaceTopClass : ""} ${spaceBottomClass ? spaceBottomClass : ""
        }`}
    >
      <div className="container">
        <div className="welcome-content text-center">
          <h1>Giới thiệu</h1>
        </div>
        <div class="text">
          <p>Poly Food là doanh nghiệp hoạt động về lĩnh vực nhà hàng Thuần chay.</p>
          <p>Chuyên phục vụ ăn tại nơi theo menu </p>
          <p>Cơm suất, cơm gọi món</p>
          <p>Buffet chay vào Rằm và Mùng 1 âm lịch hàng tháng</p>
          <p>Cơm văn phòng</p>
          <p>Đặt cỗ chay, tiệc chay theo yêu cầu từ 01 mâm trở lên.</p>
          <p>Sản xuất và cấp buôn, lẻ thực phẩm thuần chay tinh khiết</p>
          <p>Làm bánh chay như sinh nhật, bánh chưng, bánh flan, kem chay...</p>
          <p>Chúng tôi tự hào là doanh nghiệp đi đầu trong sản xuất thực phẩm chay an toàn, tinh khiết, kinh doanh nhà hàng chay hơn 15 năm qua, các sản phẩm của chúng tôi được làm bởi đầu bếp và đội ngũ nhân viên trường chay lâu năm, am hiểu về dinh dưỡng, thực dưỡng, thẩm mỹ và kinh nghiệm nghề bếp.</p>
          <p>Hãy đến và sử dụng sản phẩm của chúng tôi, chắc chắn bạn đã có sự lựa chọn đúng theo yêu cầu của mình.</p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;
