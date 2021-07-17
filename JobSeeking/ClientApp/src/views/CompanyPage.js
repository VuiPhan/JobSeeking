import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../components/Footer/Footer.js";
import Ratting from "../components/Rating/Rating.js";

import styles from "../assets/jss/material-kit-react/views/CompanyPage.js";
import '../../src/assets/css/TitleCompany.scss';
import Comments from "../components/Comments/Comments.js";
import '../assets/scss/view/CompanyPage.scss';
import AlertDialogSlide from "../components/Model/Model.js";
import HeaderCompany from "components/HeaderCompany/HeaderCompany.js";
import { AccessAlarm } from '@material-ui/icons';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import PeopleIcon from '@material-ui/icons/People';
import { useDispatch, useSelector } from "react-redux";
import CompanyAPI from "api/Company/CompanyAPI.js";
import { useHistory, useParams } from "react-router-dom";
import ListViewKendo2 from "components/ListViewKendo/ListViewKendo2.js";
import { UpdateLoading } from "api/app/LoadingSlicer.js";
const useStyles = makeStyles(styles);

export default function CompanyPage(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();

  const [data, setData] = useState({companyName: '', introduceCompany: '', TimeWorking: '', jobsTitle: '', jobDescriptions: 'a', jobRequirements: 'b', reasonsToJoin: 'c', loveWorkingHere: 'd' });
  const LoginInfo = useSelector(state => state.loginInfo);
  const { companyID } = useParams();
  async function fetchMyAPI() {
    dispatch(UpdateLoading(true));
    const result = await CompanyAPI.get(companyID);
    if(!result.companyID){
      history.push('/ErrorPage');
      return;
    }
    setData(result);
    setTimeout(() => {
      dispatch(UpdateLoading(false));
    }, 1000)
  }
  useEffect(() => {

    fetchMyAPI()
  }, [companyID]);
  var parse = require('html-react-parser');
  return (
    <div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <HeaderCompany CompanyID={companyID} IsCompany={1}></HeaderCompany>
            <div >
              <div className='some-page-wrapper'>
                <div className="row">
                  <div className="side">
                    <div className="detail_side">
                      <AccessAlarm style={{fill: "#0A0904"}}/>
                      <p className="detail_side_content">Không có OT</p>
                    </div>
                    <br></br>

                    <div className="detail_side">
                      <LocationCityIcon color="secondary" />
                      <p className="detail_side_content"> {data.locationProvince}</p>
                    </div>
                    <br></br>

                    <div className="detail_side">
                      <Brightness7Icon style={{fill: "#FEE440"}} />
                      <p className="detail_side_content"> {data.companyType}</p>
                    </div>
                    <br></br>
                    <div className="detail_side">
                      <PeopleIcon style={{fill: "#FF34AC"}} />
                      <p className="detail_side_content"> {data.scalePeople}</p>
                    </div>
                    <br></br>
                  </div>
                  <div className="main">
                    {parse(data.introduceCompany)}
                  </div>
                </div>
                <div className='row'  style={{marginLeft:0}}>
                  <div>
                    <h1 className="textTuyenDung"> {data.companyName} Tuyển Dụng</h1>
                  </div>
                </div>
              </div>
              <div>
                <ListViewKendo2 dataID = {companyID}></ListViewKendo2>
              </div>
              <div className="containerReview">
                <div className='row'>
                  <div>
                    <h1 className="textReview">Review đánh giá</h1>
                  </div>
                </div>
                <div className='row'>
                  {data.avgStar ? <div><Ratting value={parseInt(data.avgStar)}></Ratting></div>:null}
                  <div style={{    marginTop: 'auto',paddingLeft: 10,fontFamily: 'Lobster'}}><p style={{fontSize:22,color:'#FF505C'}}>{data.avgStar} sao trên tổng số {data.numberReview} đánh giá</p></div>
                </div>
              </div>
              <AlertDialogSlide onRefresh = {fetchMyAPI}></AlertDialogSlide>
              <Comments dataID = {companyID}></Comments>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
