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
import Header from "../components/Header/Header.js";
import Footer from "../components/Footer/Footer.js";
import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import HeaderLinks from "../components/Header/HeaderLinks.js";
import NavPills from "../components/NavPills/NavPills.js";
import Parallax from "../components/Parallax/Parallax.js";

import profile from "../assets/img/faces/christian.jpg";
import studio1 from "../assets/img/examples/studio-1.jpg";
import studio2 from "../assets/img/examples/studio-2.jpg";
import studio3 from "../assets/img/examples/studio-3.jpg";
import studio4 from "../assets/img/examples/studio-4.jpg";
import studio5 from "../assets/img/examples/studio-5.jpg";
import work1 from "../assets/img/examples/olu-eletu.jpg";
import work2 from "../assets/img/examples/clem-onojeghuo.jpg";
import work3 from "../assets/img/examples/cynthia-del-rio.jpg";
import work4 from "../assets/img/examples/mariya-georgieva.jpg";
import work5 from "../assets/img/examples/clem-onojegaw.jpg";

import styles from "../assets/jss/material-kit-react/views/CompanyPage.js";
import PersonalInformation from "./FormProfile/PersonalInformation.js";
import '../../src/assets/css/TitleCompany.scss';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const useStyles = makeStyles(styles);

export default function JobsPage(props) {
  const classes = useStyles();
  //LoadLanguageForPage();
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
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                  <div className="containerTitle">
                 <img src="https://cdn.itviec.com/employers/fpt-software/logo/w170/mir3HT3xtedbECJY5jVeRRgV/fpt-software-logo.png" alt="..."/>
                 <div>
                     <h1>FPT Software</h1>
                     <h5><LocationOnIcon></LocationOnIcon> Ho Chi Minh, Ha Noi, Da Nang, Others</h5>
                     <h5><AccessAlarmIcon></AccessAlarmIcon > Thứ 2 - Thứ 6. Từ 8h00 - 18h00</h5>
                 </div>
                 </div>
              </GridItem>
            </GridContainer>
            {/* <div className={classes.description}> */}
            <div >
                <div className="containerDetail">
              <p>
              Thông tin công việc
              </p>
              <p>
              Yêu cầu công viếc
              </p>
                <div>
                    Tổng quan
                    The leading provider of software outsourcing services in Vietnam
                </div>


              </div>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
