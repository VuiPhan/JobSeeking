import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Camera from "@material-ui/icons/Camera";
import ApartmentIcon from '@material-ui/icons/Apartment';
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import Favorite from "@material-ui/icons/Favorite";
import ReceiptIcon from '@material-ui/icons/Receipt';
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
import { Grid, TextField, Tooltip, Zoom } from "@material-ui/core";
import ClickEditInput from "components/ClickEditInput/ClickEditInput.js";
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import { LoginAPIRedux } from "components/FormLogin/LoginSlice.js";
import ConstCommon from "common/ConstInApp.js";
import CVPage from "./FormProfile/CVPage.js";
import { MyToaStrError, MyToaStrSuccess } from "components/Toastr/Toastr2.js";
import MyToastr from "components/Toastr/Toastr.js";
import WorkInfomation from "./FormProfile/WorkInfomation.js";
import DrawerWorkProcess from "./FormProfile/WorkProgress.js";
import DrawerEducation from "./FormProfile/Education.js";
import { Spin, Space } from 'antd';
import DrawerCertificate from "./FormProfile/Certificate.js";
import handleGetJson from "common/ReadJson.js";
import StatisticalCard from "components/StatisticalCard/StatisticalCard.js";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import { CheckIsOwnProfile } from "api/app/appSlicer.js";
import { UpdateLoading } from "api/app/LoadingSlicer.js";
import FormConfirmCreateAccount from "./Forms/FormConfirmCreateAccount.js";
const useStyles = makeStyles(styles);
export default function ProfilePage(props) {
  const classes = useStyles();
  const LoginInfo = useSelector(state => state.loginInfo);
  const AppSlice = useSelector(state => state.AppSlice);
  const [visible, setVisible] = React.useState(false);

  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const dispatch = useDispatch();
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const JobKendo = useSelector(state => state.JobKendo);
  const initialValuesImage = {
    imageName: '',
    imageSrc: profile,
    imageFile: null
  };
  const [valuesImage, setValuesImage] = useState(initialValuesImage);
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
    isAcceptWork: true
  });
  const [selfIntroduce, setselfIntroduce] = useState('Hello');
  const [viewStatiscal, setviewStatiscal] = useState('loading...');
  const [aliasName, setAliasName] = useState('Harry Pham');
  const [major, setMajor] = useState('Dev-OPS');
  const [FaceBook, setFaceBook] = useState('');
  const [GitHub, setGitHub] = useState('');
  const [LinkIn, setLinkIn] = useState('');
  const [formDataState, setFormDataState] = useState({});
  const history = useHistory();

  useEffect(() => {
    async function fetchDataView() {
      dispatch(UpdateLoading(true));
      if(LoginInfo.role !== ConstCommon.RoleRecruiter){
        history.push('/ErrorPage');
        return;
      }
      const result = await SeekerAPI.getByRecruiter(CandidateCode, 1); // Ngày 14/07: bỏ cái này ra luôn => Cho mặc định truyền 1
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
      const resultStatistical = await SeekerAPI.applicantGetViewProfile();
      setviewStatiscal(resultStatistical[0])
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
    async function updateOwnProfile() {
      if(CandidateCode === LoginInfo.CadidateCode || typeof CandidateCode === "undefined"){
        const action = CheckIsOwnProfile(true);
        const execaction = await dispatch(action);
      }
    }
    updateOwnProfile();
    setTimeout(() => {
      dispatch(UpdateLoading(false));
    }, 1000)
  }, [CandidateCode, LoginInfo.CadidateCode])

  async function updateViewProfile() {
    if (LoginInfo.role === ConstCommon.RoleRecruiter) {
      const UpdateStatiscalViewProfile = await SeekerAPI.UpdateStatiscalViewProfile(CandidateCode);
    }
  }
  useEffect(() => {
    updateViewProfile();
  }, [CandidateCode])

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
  const [loginInfoRegister, setLoginInfoRegister] = useState({email:'',password:''});

  const RegisterCandidate = async () =>{
    let result = await SeekerAPI.post(formDataState);
    if (result.error === "") {
      MyToaStrSuccess('Tạo tài khoản thành công! Hãy đến bước tiếp theo');
      let dataLogin = { Email: loginInfoRegister.email, Password: loginInfoRegister.password }
      const action = LoginAPIRedux(dataLogin);
      dispatch(action);
    }
    else {
      MyToaStrError('Địa chỉ Email đã tồn tại. Vui lòng sử dụng một địa chỉ Email khác');
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
    if (valuesImage.imageFile) {
      formData.append('ImageFile', valuesImage.imageFile);
      formData.append('ImageName', valuesImage.imageFile.name);
    }
    // Kiểm tra xem là đã có CandidateCode chưa, nếu có rồi thì sẽ là Update còn không thì đó sẽ là tạo mới
    if (!LoginInfo.CadidateCode) {
      // Sẽ tạo mới
      setVisible(true);
      setFormDataState(formData);
      setLoginInfoRegister({email:values.email,password:values.password})
      return
    }
    else {
      // Sẽ đi cập nhật
      formData.append('CandidateCode', LoginInfo.CadidateCode);
      let result = await SeekerAPI.post(formData);
      if (result.error === "") {
        // Cập nhật thành công 

        MyToaStrSuccess('Lưu thông tin thành công');
      }
      else {

        MyToaStrError('Cập nhật thất bại, Vui lòng thử lại');

      }
    }

  }

  return (
    <div>
      <FormConfirmCreateAccount RegisterCandidate={RegisterCandidate} visible={visible} setVisible={setVisible}></FormConfirmCreateAccount>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={9}>
                <div className={classes.profile}>
                  <div>
                    <img src={valuesImage.imageSrc.slice(-4) !== "null" ? valuesImage.imageSrc : profile} style={{ height: 160, width: 160 }} alt="..." className={imageClasses} />

                    {disableForm ? "" : <label htmlFor="myInput" style={{ position: 'absolute', marginTop: 31, marginLeft: -26, color: 'black' }}>
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
                          <GitHubIcon style={{ fontSize: 30 }} />
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
            {CandidateCode !== undefined ? null :

              <div>
                <div style={{ paddingLeft: 50, paddingTop: 10 }}>
                  <h6>Thông kê số lượt xem từ nhà tuyển dụng</h6>
                  <p>Phần này chỉ hiển thị với riêng bạn</p>
                </div>
                <div style={{ display: 'flex', padding: 20, justifyContent: 'space-evenly' }}>
                  {/* <Col lg="12" md="12" sm="12"> */}
                    <Row>
                      <Col md="4" xs="12">
                        <StatisticalCard cardName="tuần" countValue={viewStatiscal.viewInWeek}></StatisticalCard>
                      </Col>
                      <Col md="4" xs="12">
                        <StatisticalCard cardName="tháng" countValue={viewStatiscal.viewInMonths}></StatisticalCard>
                      </Col>
                      <Col md="4" xs="12">
                        <StatisticalCard cardName="năm" countValue={viewStatiscal.viewInYears}></StatisticalCard>
                      </Col>
                    </Row>
                  {/* </Col> */}
                </div>
              </div>}
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
                      tabButton: "Chứng chỉ",
                      tabIcon: Favorite,
                      tabContent: (
                        <DrawerCertificate></DrawerCertificate>
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
