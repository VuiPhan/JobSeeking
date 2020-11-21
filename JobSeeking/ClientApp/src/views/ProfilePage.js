import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Footer from "../components/Footer/Footer.js";
import Button from "../components/CustomButtons/Button.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";
import NavPills from "../components/NavPills/NavPills.js";

import profile from "../assets/img/faces/christian.jpg";
import styles from "../assets/jss/material-kit-react/views/profilePage.js";
import PersonalInformation from "./FormProfile/PersonalInformation.js";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import SeekerAPI from "api/JobSeeker/SeekerAPI.js";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Tooltip, Zoom } from "@material-ui/core";
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  //LoadLanguageForPage();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const dispatch = useDispatch();
  const LoginInfo = useSelector(state => state.loginInfo);
  const JobKendo = useSelector(state => state.JobKendo);
  const history = useHistory();
  const { CandidateCode } = useParams();
  var disableForm = false;
  if(CandidateCode){
      disableForm=true;
  }
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    rePassword: '',
    email: '',
    birthDay: '2020-01-01',
    birthDayString:'2020-01-01',
    phoneNumber: '',
    gender: 1,
    academicLevel: 1
});

  useEffect(() => {
    async function fetchDataView(){
        debugger;
        const result = await SeekerAPI.getByRecruiter(CandidateCode,JobKendo.jobID);
        setData(result);
    }
    async function fetchData(){
        const result = await SeekerAPI.get(LoginInfo.CadidateCode);
        setData(result[0]);
    }
    if(disableForm){
        fetchDataView();
    }
    else{
        fetchData();
    }
},[CandidateCode])

  return (
    
    <div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Christian Louboutin</h3>
                    <h6>DESIGNER</h6>
                    <Tooltip  title="https://www.facebook.com/VuiPhanIT" interactive placement="top" TransitionComponent={Zoom}>
                    <Button justIcon link className={classes.margin1} href="https://www.facebook.com/VuiPhanIT" target="_blank">
                        <FacebookIcon  color="primary" fontSize="large"/>
                        <a href="https://www.facebook.com/VuiPhanIT" target="_blank"></a>
                    </Button>
                    </Tooltip>
                    <Tooltip  title="https://www.facebook.com/VuiPhanIT" interactive placement="top" TransitionComponent={Zoom}>
                    <Button justIcon link className={classes.margin1} href="https://www.facebook.com/VuiPhanIT" target="_blank">
                    <LinkedInIcon  color="primary" fontSize="large"/>
                        <a href="https://www.facebook.com/VuiPhanIT" target="_blank"></a>
                    </Button>
                    </Tooltip>

                    <Tooltip  title="https://www.facebook.com/VuiPhanIT" interactive placement="top" TransitionComponent={Zoom}>
                    <Button justIcon link className={classes.margin1} href="https://www.facebook.com/VuiPhanIT" target="_blank">
                    <GitHubIcon style={{ fontSize: 40 }} />
                        <a href="https://www.facebook.com/VuiPhanIT" target="_blank"></a>
                    </Button>
                    </Tooltip>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                An artist of considerable range, Chet Faker — the name taken by
                Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs
                and records all of his own music, giving it a warm, intimate
                feel with a solid groove structure.{" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Thông tin cá nhân",
                      tabIcon: Camera,
                      tabContent: (
                        <PersonalInformation disableForm = {disableForm} data={data}></PersonalInformation>
                      )
                    },
                    {
                      tabButton: "Chuyên ngành đào tạo",
                      tabIcon: Palette,
                      tabContent: (
                       
                        <Button></Button>
                      )
                    },
                    {
                      tabButton: "Chứng chỉ",
                      tabIcon: Favorite,
                      tabContent: (
                        <Button></Button>
                      )
                    },
                    {
                      tabButton: "Quá trình làm việc",
                      tabIcon: Favorite,
                      tabContent: (
                        <Button></Button>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
