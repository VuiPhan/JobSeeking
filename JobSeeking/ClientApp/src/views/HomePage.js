import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "../components/Footer/Footer.js";
import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import profile from "../assets/img/faces/christian.jpg";


import styles from "../assets/jss/material-kit-react/views/profilePage.js";
import ListViewKendo from "../components/ListViewKendo/ListViewKendo.js";
import ListViewKendo2 from "components/ListViewKendo/ListViewKendo2.js";
import SelectGroup from "components/SelectGroup/SelectGroup.js";
import CompanyList from "components/ListViewCompany/CompanyList.js";
import Skeleton from "react-loading-skeleton";


const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <h3 style={{ paddingLeft: 30, paddingTop: 36 }}>Nhà Tuyển Dụng Hàng Đầu</h3>
            <CompanyList></CompanyList>
            <div style={{ marginTop: 40 }}>
              <ListViewKendo2 dataID={-1}></ListViewKendo2>

            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
