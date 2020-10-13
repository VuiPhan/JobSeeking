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
import Ratting from "../components/Rating/Rating.js";
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
import ListViewKendo from "../components/ListViewKendo/ListViewKendo.js";
import Comments from "../components/Comments/Comments.js";
import '../assets/scss/view/CompanyPage.scss';
import AlertDialogSlide from "../components/Model/Model.js";
const useStyles = makeStyles(styles);

export default function CompanyPage(props) {
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
                  <img src="https://cdn.itviec.com/employers/fpt-software/logo/w170/mir3HT3xtedbECJY5jVeRRgV/fpt-software-logo.png" alt="..." />
                  <div>
                    <h1>FPT Software</h1>
                    <h5><LocationOnIcon></LocationOnIcon> Ho Chi Minh, Ha Noi, Da Nang, Others</h5>
                    <h5><AccessAlarmIcon></AccessAlarmIcon > Thứ 2 - Thứ 6. Từ 8h00 - 18h00</h5>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div >
              <div class='some-page-wrapper'>
                <div class='row'>
                  <div class='column'>
                    <div class='blue-column'>
                      <p>
                        The leading provider of software outsourcing services in Vietnam
                        “ FPT Software is part of FPT Corporation (FPT – HoSE) – the global leading technology, outsourcing and IT services group headquartered in Vietnam with nearly US$2 billion in revenue and more than 13,000 employees. Qualified with CMMI Level 5 & ISO 27001:2013, ASPICE LEVEL 3, FPT Software delivers world-class services in Smart factory, Digital platform, RPA, AI, IoT, Enterprise Mobilization, Cloud, AR/VR, Embedded System, Managed service, Testing, Platform modernization, Business Applications, Application Service, BPO and more services globally from delivery centers across the United States, Japan, Europe, Korea, China, Australia, Vietnam and the Asia Pacific.
                In 2017, FPT Software has been placed in top 10 of the ranking for three consecutive years. Among top 10, FPT Software is the only IT Company. {" "}
                      </p>
                    </div>
                  </div>
                  <div class='column'>
                    <div class='green-column'>
                      <div>
                        Tổng quan
          </div>
                    </div>
                  </div>
                </div>
                <div class='row'>
                  <div>
                    <h1 className="textTuyenDung">FPT Software Tuyển Dụng</h1>
                  </div>
                </div>
              </div>
              <div>
                <ListViewKendo dataName="Jobs"></ListViewKendo>
              </div>
              <div class = "containerReview">
                <div class='row'>
                  <div>
                    <h1 className="textReview">Review đánh giá</h1>
                  </div>

                </div>
                <div class='row'>
                    <div><Ratting value={3}></Ratting></div>
                    <div><p>4.5 sao trên tổng số 10 đánh giá</p></div>
                </div>
               

              </div> 
              <AlertDialogSlide></AlertDialogSlide>
              <Comments dataName="Jobs"></Comments> 
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
