import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import ApartmentIcon from '@material-ui/icons/Apartment';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import Favorite from "@material-ui/icons/Favorite";
import ReceiptIcon from '@material-ui/icons/Receipt';
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
import { useParams } from "react-router-dom";
import SeekerAPI from "api/JobSeeker/SeekerAPI.js";
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import { Grid, TextField, Tooltip, Zoom } from "@material-ui/core";
import ClickEditInput from "components/ClickEditInput/ClickEditInput.js";
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import { LoginAPIRedux } from "components/FormLogin/LoginSlice.js";
import ConstCommon from "common/ConstInApp.js";
import CVPage from "./FormProfile/CVPage.js";
import { MyToaStrError,MyToaStrSuccess } from "components/Toastr/Toastr2.js";
import MyToastr from "components/Toastr/Toastr.js";
import WorkInfomation from "./FormProfile/WorkInfomation.js";
import { DrawerForm } from "./FormProfile/Qualifications.js";
import DrawerWorkProcess from "./FormProfile/WorkProgress.js";
import DrawerEducation from "./FormProfile/Education.js";
const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
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
    titleJob: '',
    isAcceptWork:true
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
  

  const SubmitDataFinal = async (values) => {
    
    const formData = new FormData();
    formData.append('Facebook', FaceBook);
    formData.append('Github', GitHub);
    formData.append('Linkin', LinkIn);
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
    formData.append('IsAcceptWork', values.isAcceptWork);

    // Trường hợp không muốn lại update lại hình. 
    if(valuesImage.imageFile){
      formData.append('ImageFile', valuesImage.imageFile);
      formData.append('ImageName', valuesImage.imageFile.name);
    }
    // Kiểm tra xem là đã có CandidateCode chưa, nếu có rồi thì sẽ là Update còn không thì đó sẽ là tạo mới
    if(!LoginInfo.CadidateCode){
      // Sẽ tạo mới
      let result = await SeekerAPI.post(formData);
      if (result.error === "") {
        MyToaStrSuccess('Tạo tài khoản thành công! Hãy đến bước tiếp theo');
        let dataLogin = { Email: values.email, Password: values.password }
        const action = LoginAPIRedux(dataLogin);
        dispatch(action);
      }
      else{
        MyToaStrError('Địa chỉ Email đã tồn tại. Vui lòng sử dụng một địa chỉ Email khác');
      }
    }
    else{
      // Sẽ đi cập nhật
      formData.append('CandidateCode', LoginInfo.CadidateCode);
      let result = await SeekerAPI.post(formData);
      if (result.error === "") {
        // Cập nhật thành công 

        MyToaStrSuccess('Lưu thông tin thành công');
      }
      else{

        MyToaStrError('Cập nhật thất bại, Vui lòng thử lại');

      }
    }
   
  }
  return (
    <div>
      <MyToastr></MyToastr>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={9}>
                <div className={classes.profile}>
                  <div>
                    <img src={valuesImage.imageSrc.slice(-4) !== "null" ? valuesImage.imageSrc : profile} style={{ height: 160, width: 160 }} alt="..." className={imageClasses} />

                    {disableForm ? "":<label htmlFor="myInput" style={{ position: 'absolute', marginTop: 31, marginLeft: -26, color: 'black' }}>
                      <LinkedCameraIcon style={{ fontSize: 30, cursor: 'pointer' }} />
                    </label>}
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
                          <LinkedInIcon color="primary" style={{ fontSize: 30 }} />
                        </Grid>
                        <Grid item>
                          <TextField id="input-with-icon-grid" value={LinkIn} onChange={e => setLinkIn(e.target.value)} label="LinkedIn" />
                        </Grid>
                      </Grid>
                      <Grid container spacing={1} alignItems="flex-end">
                        <Grid item>
                          <GitHubIcon  style={{ fontSize: 30 }} />
                        </Grid>
                        <Grid item>
                          <TextField id="input-with-icon-grid" value={GitHub} onChange={e => setGitHub(e.target.value)} label="GitHub" />
                        </Grid>
                      </Grid>
                    </div>
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

              <GridItem xs={12} sm={12} md={10} className={classes.navWrapper}>
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
                      tabButton: "Thông tin công việc",
                      tabIcon: WorkIcon,
                      tabContent: (
                        <WorkInfomation></WorkInfomation>
                      )
                    },
                    {
                      tabButton: "Chuyên ngành đào tạo",
                      tabIcon: SchoolIcon,
                      tabContent: (

                        <DrawerEducation></DrawerEducation>
                      )
                    },
                    {
                      tabButton: "Bằng cấp & Chứng chỉ",
                      tabIcon: Favorite,
                      tabContent: (
                        <DrawerForm></DrawerForm>
                      )
                    },
                    {
                      tabButton: "Quá trình làm việc",
                      tabIcon: ApartmentIcon,
                      tabContent: (
                        <DrawerWorkProcess></DrawerWorkProcess>
                      )
                    },

                    {
                      tabButton: "CV",
                      tabIcon: ReceiptIcon,
                      tabContent: (
                        <CVPage></CVPage>
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
