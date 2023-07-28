import PropTypes from "prop-types";
import React from "react";
import { multilanguage } from "redux-multilanguage";
import { connect } from "react-redux";
import { setCurrency } from "../../redux/actions/currencyActions";
import LanguageCurrencyChanger from "./sub-components/LanguageCurrencyChanger";

const HeaderTop = ({
    currency,
    setCurrency,
    currentLanguageCode,
    dispatch,
    borderStyle,
}) => {
    return (
        <div
            className={`header-top-wap ${
                borderStyle === "fluid-border" ? "border-bottom" : ""
            }`}
        >
            <LanguageCurrencyChanger
                currency={currency}
                setCurrency={setCurrency}
                currentLanguageCode={currentLanguageCode}
                dispatch={dispatch}
            />
            <div className="header-offer">
                <p>
                  <i class="fa fa-money"></i> Giá cả ưu đãi hấp dẫn
                </p>
            </div>
            <div className="header-offer">
                <p>
                  <i class="fa fa-star"></i> Sản phẩm đa dạng đạt tiêu chuẩn có kiểm định
                </p>
            </div>
            <div className="header-offer">
                <p>
                  <i class="fa fa-plane"></i> Giao hàng toàn quốc & nhanh chóng
                </p>
            </div>
        </div>
    );
};

HeaderTop.propTypes = {
    borderStyle: PropTypes.string,
    setCurrency: PropTypes.func,
    currency: PropTypes.object,
    currentLanguageCode: PropTypes.string,
    dispatch: PropTypes.func,
};

const mapStateToProps = (state) => {
    return {
        currency: state.currencyData,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrency: (currencyName) => {
            dispatch(setCurrency(currencyName));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(multilanguage(HeaderTop));
