import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "../components/Footer/Footer.js";
import styles from "../assets/jss/material-kit-react/views/CompanyPage.js";
import '../../src/assets/css/TitleCompany.scss';
import LGCompanyPage from "Language/CompanyPage";
import JobsApi from "api/Company/JobsAPI.js";
import { useHistory, useParams } from "react-router-dom";
import { Button, Icon } from "@material-ui/core";
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import PeopleIcon from '@material-ui/icons/People';
import DateRangeIcon from '@material-ui/icons/DateRange';
import HeaderCompany from "components/HeaderCompany/HeaderCompany.js";
import ListViewKendo2 from "components/ListViewKendo/ListViewKendo2.js";
import { useDispatch, useSelector } from 'react-redux';
import { ChooseJob } from "components/ListViewKendo/ListViewKendo2Slice.js";
const useStyles = makeStyles(styles);


export default function JobsPage(props) {
  const classes = useStyles();
  const res = LGCompanyPage.JobPage;
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  var parse = require('html-react-parser');
  const [data, setData] = useState({ companyId: null, companyName: '', TimeWorking: '', jobsTitle: '', jobDescriptions: 'a', jobRequirements: 'b', reasonsToJoin: 'c', loveWorkingHere: 'd' });
  const history = useHistory();
  const { jobID } = useParams();
  const dispatch = useDispatch();
  const LoginInfo = useSelector(state => state.loginInfo);
  useEffect(() => {
    async function fetchMyAPI() {
      const result = await JobsApi.get(jobID);
      setData(result[0]);
      debugger;
      if (LoginInfo.companyID == result[0].companyId) {
        const action = ChooseJob({jobID:jobID,IsAccess:true});
        var x = dispatch(action);
      }
      else{
        const action = ChooseJob({jobID:jobID,IsAccess:false});
        var x = dispatch(action);
      }
      
    }
    fetchMyAPI();
   
  }, [jobID]);
  const HandleRedirectPage = (id) => {
    const linkRedired = `/Company/${id}`;
    history.push(linkRedired);
    window.scrollTo(0, 150);
  }
  return (
    <div>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <HeaderCompany CompanyID={jobID} IsCompany={0}></HeaderCompany>
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
                  <PeopleIcon />
                  <p className="detail_side_content"> 300 - 500</p>
                </div>
                <br></br>
                <div className="detail_side">
                  <DateRangeIcon />
                  <p className="detail_side_content"> 5 ngày trước</p>
                </div>
                <div className="CenterButton">
                  <div className="buttonCenter">

                    {LoginInfo.role === "Recruiter" ?
                      <Button variant="outlined" color="secondary">Xem ứng viên</Button>
                      : <div> <Button variant="outlined" color="secondary">Ứng tuyển ngay</Button>
                      </div>
                    }
                    <span className="buttonCenterNotification">10</span>
                  </div>
                  <div className="buttonCenter">
                    <Button onClick={() => HandleRedirectPage(data.companyId)} variant="outlined" color="primary">Về chúng tôi</Button>

                  </div>
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
              {res.CacCongViecTuongTu}
            </h3>
            <ListViewKendo2 dataID={data.companyId}></ListViewKendo2>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
