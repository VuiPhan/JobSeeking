import React, { useState, useEffect } from "react";
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
import LGCompanyPage from "Language/CompanyPage";
import ListViewKendo from "components/ListViewKendo/ListViewKendo.js";
import JobsApi from "api/Company/JobsAPI.js";
import { useHistory, useParams } from "react-router-dom";
import { Button, Icon } from "@material-ui/core";
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import PeopleIcon from '@material-ui/icons/People';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { useSelector } from "react-redux";
import ShowCadidate from "components/ShowCandidate/ShowCandidate";
const useStyles = makeStyles(styles);


export default function JobsPage(props) {
  const classes = useStyles();
  const res = LGCompanyPage.JobPage;
  //LoadLanguageForPage();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  var parse = require('html-react-parser');
  const [data, setData] = useState({ companyName: '', TimeWorking: '', jobsTitle: '', jobDescriptions: 'a', jobRequirements: 'b', reasonsToJoin: 'c', loveWorkingHere: 'd' });
  const history = useHistory();
  const { jobID } = useParams();
  useEffect(() => {
    async function fetchMyAPI() {
      const result = await JobsApi.get(jobID);
      setData(result[0]);
      console.log(result[0]);
    }
    fetchMyAPI()
  }, [jobID]);
  const LoginInfo = useSelector(state => state.loginInfo)
debugger;
  return (
    <div>

      <div className={classNames(classes.main, classes.mainRaised)}>

        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className="containerTitle">
                  <img src={`https://localhost:44351/Images/${data.imageLogo}`} alt="..." />
                  <div>
                    <h1 className="CompanyNameTitle">{data.companyName}</h1>
                    <h5><LocationOnIcon></LocationOnIcon> {data.companyAddress}</h5>
                    <h5><AccessAlarmIcon></AccessAlarmIcon > {data.timeWorking}</h5>
                  </div>

                </div>
                <div className="containerImage">
                  <img src="https://cdn.itviec.com/photos/39011/jd_photo_thumbnail/jd_photo_thumbnail-1537273.jpg?TKHL8117CQAD1rE2g5Gp8G5J"></img>
                  <img src="https://cdn.itviec.com/photos/39012/jd_photo_thumbnail/jd_photo_thumbnail-1537276.jpg?AuQcKevkfh3PeLopGrhReQfZ"></img>
                  <img src="https://cdn.itviec.com/photos/39013/jd_photo_thumbnail/jd_photo_thumbnail-1537274.jpg?pEASJFrheg44uQmxpgkhudc4"></img>
                </div>
              </GridItem>
            </GridContainer>
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
                
                { LoginInfo.role === "Recruiter" ?
                 <Button variant="outlined" color="secondary">Xem ứng viên</Button>
          :     <Button variant="outlined" color="secondary">Ứng tuyển ngay</Button>
                
        }
              <span className="buttonCenterNotification">10</span>
                </div>
             
               


              </div>
              <div className="main">
                <h3 className="TitleWork">{parse(data.jobsTitle)}</h3>
                <h3>
                  {res.LyDoNenGiaNhap}
                </h3>
                <div>
                  {parse(data.reasonsToJoin)}
                </div>
                <h3>
                  {res.MoTaCongViec}
                </h3>
                <div>
                  {parse(data.jobDescriptions)}
                </div>

                <h3>
                  {res.YeuCauCongViec}
                </h3>
                <div>
                  {parse(data.jobRequirements)}

                </div>
                <h3>
                  {res.TaiSaoBanYeuThich}
                </h3>
                <div>
                  {parse(data.loveWorkingHere)}
                </div>

              </div>


            </div>
            <h3>
              {res.ViecLamPhuHop}
            </h3>
            <ListViewKendo></ListViewKendo>
          </div>
        </div>
      <ShowCadidate></ShowCadidate>

      </div>

      <Footer />
    </div>
  );
}
