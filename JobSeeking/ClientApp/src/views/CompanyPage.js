import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import Ratting from "../components/Rating/Rating.js";

import styles from "../assets/jss/material-kit-react/views/CompanyPage.js";
import '../../src/assets/css/TitleCompany.scss';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import ListViewKendo from "../components/ListViewKendo/ListViewKendo.js";
import Comments from "../components/Comments/Comments.js";
import '../assets/scss/view/CompanyPage.scss';
import AlertDialogSlide from "../components/Model/Model.js";
import HeaderCompany from "components/HeaderCompany/HeaderCompany.js";
import { Button, Icon } from "@material-ui/core";
import DateRangeIcon from '@material-ui/icons/DateRange';
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import PeopleIcon from '@material-ui/icons/People';
import { useSelector } from "react-redux";
const useStyles = makeStyles(styles);

export default function CompanyPage(props) {
  const classes = useStyles();
  const [data, setData] = useState({ companyName: '', TimeWorking: '', jobsTitle: '', jobDescriptions: 'a', jobRequirements: 'b', reasonsToJoin: 'c', loveWorkingHere: 'd' });
  //LoadLanguageForPage();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const LoginInfo = useSelector(state => state.loginInfo)
  return (
    <div>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <HeaderCompany CompanyID={1} IsCompany={1}></HeaderCompany>
            <div >
              <div class='some-page-wrapper'>
                    <div className="row">
              <div className="side">
                <div className="detail_side">
                  <AccessAlarm />
                  <p className="detail_side_content">Không có OT</p>
                </div>
                <div className="detail_side">
                <MonetizationOnIcon color="secondary" />
                  <p className="detail_side_content"> Mức lương: 700 - 1300$</p>
                </div>

                <div className="detail_side">
                <LocationCityIcon color="secondary" />
                  <p className="detail_side_content"> Ho Chi Minh</p>
                </div>
                <br></br>

                <div className="detail_side">
                <Brightness7Icon />
                  <p className="detail_side_content"> Sản phẩm</p>
                </div>
                <br></br>
                <div className="detail_side">
                <PeopleIcon  />
                  <p className="detail_side_content"> 300 - 500</p>
                </div>
                <br></br>
                <div className="detail_side">
                <DateRangeIcon  />
                  <p className="detail_side_content"> 5 ngày trước</p>
                </div>
                <div className="buttonCenter">
              <span className="buttonCenterNotification">10</span>
                </div>
              </div>
              <div className="main">
                <h3 className="TitleWork"></h3>
                <h3>
                </h3>
                <div>
                </div>
                <h3>
                </h3>
                <div>
                </div>

                <h3>
                </h3>
                <div>

                </div>
                <h3>
                </h3>
                <div>
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
              <div class="containerReview">
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
