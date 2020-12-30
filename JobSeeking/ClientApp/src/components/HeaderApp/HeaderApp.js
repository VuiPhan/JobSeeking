
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";

import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import Parallax from "../../components/Parallax/Parallax.js";
import SelectGroup from "components/SelectGroup/SelectGroup.js";
import JobsApi from "api/Company/JobsAPI.js";
import { useEffect } from "react";
import { useState } from "react";

const useStyles = makeStyles(styles);
function HeaderApp(props) {
  const { ...rest } = props;
  const classes = useStyles();
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [countJob, setcountJob] = useState();
  useEffect(() => {
    async function fetchMyAPI() {
      const result = await JobsApi.countJob();
      setcountJob(result);
    }
    fetchMyAPI();
  }, []);
  return (
    <div>
      <Header
        color="transparent"
        brand="JOB SEEKING"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}

        {...rest}
      />
      <div style={{ position: 'relative' }}>
        {/* <Parallax small filter image={require("../../assets/img/profile-bg.jpg")} /> */}
        {/* <Parallax small filter image={require("../../assets/img/ImageHome.png")} /> */}
        <Parallax small filter image={require("../../assets/img/Home2.jpg")} />
        <div style={{ display: 'flex' }}>
          <div style={{ height: 160, zIndex: 99, width: 800, position: 'relative', justifyContent: 'center', top: -264, margin: 'auto' }}>
            <h3 style={{ color: "white", paddingBottom: 20 }}>{countJob}+ Việc Làm IT Chất Dành Cho Bạn</h3>
            <SelectGroup></SelectGroup>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HeaderApp
