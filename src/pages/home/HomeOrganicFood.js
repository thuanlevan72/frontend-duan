import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import LayoutThree from "../../layouts/LayoutThree";
import HeroSliderFive from "../../wrappers/hero-slider/HeroSliderFive";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import CountDownTwo from "../../wrappers/countdown/CountDownTwo";


const HomeOrganicFood = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>Poly Food | Organic Food Home</title>
        <meta
          name="description"
          content="Organic food home of flone react minimalist eCommerce template."
        />
      </MetaTags>
      <LayoutThree
        headerTop="visible"
        headerContainerClass="container-fluid"
        headerBorderStyle="fluid-border"
        headerPaddingClass="header-padding-2"
      >
        {/* hero slider */}
        <HeroSliderFive spaceLeftClass="ml-70" spaceRightClass="mr-70" />
        {/* feature icon */}
        <FeatureIconFour
          spaceTopClass="pt-10"
          spaceBottomClass="pb-90"
          containerClass="container-fluid"
          gutterClass="padding-10-row-col"
        />
        {/* countdown */}
        <CountDownTwo
          spaceTopClass="pt-80"
          spaceBottomClass="pb-95"
          dateTime="November 13, 2020 12:12:00"
        />
      </LayoutThree>
    </Fragment>
  );
};

export default HomeOrganicFood;
