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
import { Link, useHistory, useParams } from "react-router-dom";
import SeekerAPI from "api/JobSeeker/SeekerAPI.js";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Grid, TextField, Tooltip, Zoom } from "@material-ui/core";
import ClickEditInput from "components/ClickEditInput/ClickEditInput.js";
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import { AccountCircle } from "@material-ui/icons";
import { LoginAPIRedux } from "components/FormLogin/LoginSlice.js";
import ConstCommon from "common/ConstInApp.js";
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
  const dispatch = useDispatch();
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const LoginInfo = useSelector(state => state.loginInfo);
  const JobKendo = useSelector(state => state.JobKendo);
  const initialValuesImage = {
    imageName: '',
    imageSrc: profile,
    imageFile: null
  };
  const [valuesImage, setValuesImage] = useState(initialValuesImage);

  const initialValuesCV = {
    CVName: '',
    CVFile: null
  };
  const [valuesCV, setValuesCV] = useState(initialValuesCV);




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
    birthDayString: '2020-01-01',
    phoneNumber: '',
    gender: 1,
    academicLevel: 1,
    selfIntroduce: '',
    aliasesName: '',
    titleJob: ''
  });
  const [selfIntroduce, setselfIntroduce] = useState('Hello');
  const [aliasName, setAliasName] = useState('Harry Pham');
  const [major, setMajor] = useState('Dev-OPS');
  const [FaceBook, setFaceBook] = useState('');
  const [GitHub, setGitHub] = useState('');
  const [LinkIn, setLinkIn] = useState('');
  useEffect(() => {
    async function fetchDataView() {
      const result = await SeekerAPI.getByRecruiter(CandidateCode, JobKendo.jobID);
      setData(result);
      setselfIntroduce(result.selfIntroduce);
      setAliasName(result.aliasesName);
      setMajor(result.titleJob);
      setFaceBook(result.facebook);
      setGitHub(result.github);
      setLinkIn(result.linkin);
      let initialValuesImage = {
        imageName: '',
        imageSrc: `${ConstCommon.LinkImage}${result.pathAvatar}`,
        imageFile: null
      };
      setValuesImage(initialValuesImage);
    }

    async function fetchData() {
      const result = await SeekerAPI.get(LoginInfo.CadidateCode);
      setData(result[0]);
      setselfIntroduce(result[0].selfIntroduce);
      let initialValuesImage = {
        imageName: '',
        imageSrc: `${ConstCommon.LinkImage}${result[0].pathAvatar}`,
        imageFile: null
      };
      setValuesImage(initialValuesImage);
      setAliasName(result[0].aliasesName);
      setMajor(result[0].titleJob);
      setFaceBook(result[0].facebook);
      setGitHub(result[0].github);
      setLinkIn(result[0].linkin);
    }
    if (disableForm) {
      fetchDataView();
    }
    if (disableForm == false && LoginInfo.CadidateCode) {
      fetchData();
    }
  }, [CandidateCode, LoginInfo.CadidateCode])


  const showPreview = e => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
        setValuesImage({
          ...valuesImage,
          imageFile: imageFile,
          imageSrc: x.target.result
        })
      };
      reader.readAsDataURL(imageFile);
    }
  }
  
  const HandleCV = e => {
    if (e.target.files && e.target.files[0]) {
      let CVFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = x => {
        setValuesCV({
          ...valuesCV,
          CVFile: CVFile,
          CVSrc: x.target.result
        })
      };
      reader.readAsDataURL(CVFile);
    }
  }
  const SubmitDataFinal = async (values) => {
    const formData = new FormData();
    debugger
    formData.append('Facebook',FaceBook);
    formData.append('Github', GitHub);
    formData.append('Linkin',LinkIn);
    formData.append('SelfIntroduce', selfIntroduce);
    formData.append('AliasesName', aliasName);
    formData.append('TitleJob', major);

    formData.append('LastName', values.lastName);
    formData.append('FirstName', values.firstName);
    formData.append('Password', values.password);
    formData.append('Email', values.email);
    formData.append('BirthDay', values.birthDayString);
    formData.append('PhoneNumber', values.phoneNumber);
    formData.append('Gender', values.gender);
    formData.append('AcademicLevel', values.academicLevel);
    formData.append('ImageFile', valuesImage.imageFile);
    formData.append('ImageName', valuesImage.imageFile.name);

    debugger;
    formData.append('CVFile', valuesCV.CVFile);
    formData.append('CVName', valuesCV.CVFile.name);
    let result = await SeekerAPI.post(formData);
    if (result.error === "") {
      let dataLogin = { Email: values.email, Password: values.password }
      const action = LoginAPIRedux(dataLogin);
      dispatch(action);
    }
  }
  return (
    <div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={9}>
                <div className={classes.profile}>
                  <div>
                    <img src={valuesImage.imageSrc} style={{ height: 160, width: 160 }} alt="..." className={imageClasses} />

                    <label htmlFor="myInput" style={{ position: 'absolute', marginTop: 31, marginLeft: -26, color: 'black' }}>
                      <LinkedCameraIcon style={{ fontSize: 30, cursor: 'pointer' }} />
                    </label>
                    <input
                      id="myInput"
                      style={{ display: 'none' }}
                      type={"file"}
                      onChange={showPreview}
                    />
                  </div>


                  <div className={classes.name}>
                    <h3 className={classes.title}><ClickEditInput disabled={disableForm} text={aliasName} placeholder="Bí danh của bạn" onSetText={text => setAliasName(text)} /></h3>
                    <h6> <ClickEditInput disabled={disableForm} text={major} onSetText={text => setMajor(text)} /></h6>
                    <Tooltip title={data.facebook} interactive placement="top" TransitionComponent={Zoom}>
                      <Button justIcon link className={classes.margin1} href={data.facebook} target="_blank" rel="noopener noreferrer">
                        <FacebookIcon color="primary" fontSize="large" />
                        {/* <a href={data.facebook} target="_blank" rel="noopener noreferrer"></a> */}
                        
                      </Button>
                    </Tooltip>
                    <Tooltip title={data.linkin} interactive placement="top" TransitionComponent={Zoom}>
                      <Button justIcon link className={classes.margin1} href={data.linkin} target="_blank" rel="noopener noreferrer">
                        <LinkedInIcon color="primary" fontSize="large" />
                        <a href={data.linkin} target="_blank" rel="noopener noreferrer"></a>
                      </Button>
                    </Tooltip>

                    <Tooltip title={data.github} interactive placement="top" TransitionComponent={Zoom}>
                      <Button justIcon link className={classes.margin1} href={data.github} target="_blank" rel="noopener noreferrer">
                        <GitHubIcon style={{ fontSize: 40 }} />
                        <a href={data.github} target="_blank" rel="noopener noreferrer"></a>
                      </Button>
                    </Tooltip>
                  </div>
                  <div>
                    <div style={{ display: 'flex' }}>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <FacebookIcon color="primary" style={{ fontSize: 30 }} />
                        </Grid>
                        <Grid item>
                          <TextField id="input-with-icon-grid" value={FaceBook} onChange={e => setFaceBook(e.target.value)} label="Facebook" />
                        </Grid>
                      </Grid>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <LinkedInIcon color="primary"  onChange={e => setLinkIn(e.target.value)} style={{ fontSize: 30 }} />
                        </Grid>
                        <Grid item>
                          <TextField id="input-with-icon-grid" label="LinkedIn" />
                        </Grid>
                      </Grid>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <GitHubIcon  onChange={e => setGitHub(e.target.value)} style={{ fontSize: 30 }} />
                        </Grid>
                        <Grid item>
                          <TextField id="input-with-icon-grid" label="GitHub" />
                        </Grid>
                      </Grid>
                    </div>
                  </div>
                </div>
              </GridItem>
            </GridContainer>

            <a href="http://localhost:44351/Images/20-K%E1%BB%B8-N%C4%82NG202246275.pdf" download>VuiVui</a>

            <a href='http://localhost:44351/Images/Screenshot202506402.png' download target="_blank">Click to download</a>
            <Link to="http://localhost:44351/Images/20-K%E1%BB%B8-N%C4%82NG202246275.pdf" target="_blank" download>Download</Link>
            <label htmlFor="myInputCV" style={{ position: 'absolute', marginTop: 31, marginLeft: -26, color: 'black' }}>
                      <LinkedCameraIcon style={{ fontSize: 30, cursor: 'pointer' }} />
                    </label>
                  <input
                      id="myInputCV"
                      style={{ display: 'none' }}
                      type={"file"}
                      onChange={HandleCV}
                    />
             






            <div className={classes.description}>
              <p>
                <ClickEditInput disabled={disableForm} text={selfIntroduce} onSetText={text => setselfIntroduce(text)} />
              </p>
              <h2>
              </h2>
            </div>
            <GridContainer justify="center">
          
              <GridItem xs={12} sm={12} md={9} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Thông tin cá nhân",
                      tabIcon: Camera,
                      tabContent: (
                        <PersonalInformation SubmitDataFinal={SubmitDataFinal} disableForm={disableForm} data={data}></PersonalInformation>
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
