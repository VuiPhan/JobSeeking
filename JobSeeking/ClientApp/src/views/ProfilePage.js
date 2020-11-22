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
import ClickEditInput from "components/ClickEditInput/ClickEditInput.js";
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
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
  if (CandidateCode) {
    disableForm = true;
  }
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    rePassword: '',
    email: '',
    birthDay: '2020-01-01',
    birthDayString: '2020-01-01',
    phoneNumber: '',
    gender: 1,
    academicLevel: 1,
    selfIntroduce: '',
    aliasesName: '',
    titleJob: ''
  });
  const [selfIntroduce, setselfIntroduce] = useState(data.selfIntroduce);
  const [aliasName, setAliasName] = useState("Bí danh của bạn");
  const [major, setMajor] = useState("Nghành nghề");
  useEffect(() => {
    async function fetchDataView() {
      const result = await SeekerAPI.getByRecruiter(CandidateCode, JobKendo.jobID);
      setData(result);
      setselfIntroduce(result.selfIntroduce);
      setAliasName(result.aliasesName);
      setMajor(result.titleJob);
    }
    async function fetchData() {
      const result = await SeekerAPI.get(LoginInfo.CadidateCode);
      setData(result[0]);
      setselfIntroduce(result[0].selfIntroduce);
      setAliasName(result[0].aliasesName);
      setMajor(result[0].titleJob);
    }
    if (disableForm) {
      fetchDataView();
    }
    if (disableForm == false && LoginInfo.CadidateCode) {
      fetchData();
    }
  }, [CandidateCode, LoginInfo.CadidateCode])


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
                    <Tooltip title="Mời bạn chọn hình đại diện" interactive placement="top" TransitionComponent={Zoom}>
                      <LinkedCameraIcon style={{ fontSize: 40 }} />
                    </Tooltip>


                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}><ClickEditInput disabled={disableForm} text={aliasName} onSetText={text => setAliasName(text)} /></h3>
                    <h6> <ClickEditInput disabled={disableForm} text={major} onSetText={text => setMajor(text)} /></h6>
                    <Tooltip title={data.facebook} interactive placement="top" TransitionComponent={Zoom}>
                      <Button justIcon link className={classes.margin1} href={data.facebook} target="_blank">
                        <FacebookIcon color="primary" fontSize="large" />
                        <a href={data.facebook} target="_blank"></a>
                      </Button>
                    </Tooltip>
                    <Tooltip title={data.linkin} interactive placement="top" TransitionComponent={Zoom}>
                      <Button justIcon link className={classes.margin1} href={data.linkin} target="_blank">
                        <LinkedInIcon color="primary" fontSize="large" />
                        <a href={data.linkin} target="_blank"></a>
                      </Button>
                    </Tooltip>

                    <Tooltip title={data.github} interactive placement="top" TransitionComponent={Zoom}>
                      <Button justIcon link className={classes.margin1} href={data.github} target="_blank">
                        <GitHubIcon style={{ fontSize: 40 }} />
                        <a href={data.github} target="_blank"></a>
                      </Button>
                    </Tooltip>
                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <div className={classes.description}>
              <p>
                <ClickEditInput disabled={disableForm} text={selfIntroduce} onSetText={text => setselfIntroduce(text)} />
              </p>
              <h2>

              </h2>
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
                        <PersonalInformation disableForm={disableForm} data={data}></PersonalInformation>
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
