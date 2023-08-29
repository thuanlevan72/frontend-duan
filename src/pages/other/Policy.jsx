import PropTypes from "prop-types";
import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const Contact = ({ location }) => {
    const { pathname } = location;
    return (
        <Fragment>
            <MetaTags>
                <title>Poly Food | Chính sách</title>
                <meta name="description" content="Contact of PolyFood." />
            </MetaTags>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + "/"}>
                Trang chủ
            </BreadcrumbsItem>
            <BreadcrumbsItem to={process.env.PUBLIC_URL + pathname}>
                Chính sách
            </BreadcrumbsItem>
            <LayoutOne headerTop="visible">
                <Breadcrumb />
                <div class="col-xs-12 col-sm-12 col-md-12">
                    <div className="page-title">
                        <h1 className="title-head text-uppercase">
                            <a href="#!">Chính sách</a>
                        </h1>
                    </div>
                    <div className="content-page"></div>
                </div>
            </LayoutOne>
        </Fragment>
    );
};

Contact.propTypes = {
    location: PropTypes.object,
};

export default Contact;