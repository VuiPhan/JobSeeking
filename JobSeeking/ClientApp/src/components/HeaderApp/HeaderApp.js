
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../../components/Header/Header.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";

import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import Parallax from "../../components/Parallax/Parallax.js";

const useStyles = makeStyles(styles);
function HeaderApp(props) {
    const { ...rest } = props;
    const classes = useStyles();
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
      );
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
          <Parallax small filter image={require("../../assets/img/profile-bg.jpg")} />
        </div>
    )
}

export default HeaderApp
