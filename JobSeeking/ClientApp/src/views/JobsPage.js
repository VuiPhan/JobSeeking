import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";

import styles from "../assets/jss/material-kit-react/views/CompanyPage.js";
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
