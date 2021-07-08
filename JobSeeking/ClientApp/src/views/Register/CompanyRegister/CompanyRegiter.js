import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "components/Footer/Footer.js";
import styles from "assets/jss/material-kit-react/views/CompanyPage.js";
import 'assets/css/TitleCompany.scss';
import 'assets/scss/view/CompanyPage.scss';
import 'assets/scss/view/CompanyRegister.scss';
import { FormGroup, Label } from "reactstrap";
import { Formik, Form, FastField } from "formik";
import InputField from "components/CustomField/InputField";
import * as yup from 'yup';
import RegisterCompanyApi from "api/Company/RegisterCompany";
import LGCompanyPage from "Language/CompanyPage";
import MyCKEditor from "components/CKEditor/CKEditor";
import HeaderCompany from "components/HeaderCompany/HeaderCompany";
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import { Button, Tooltip, Zoom } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MyToaStrError, MyToaStrSuccess } from "components/Toastr/Toastr2";
import { LoginAPIRedux } from "components/FormLogin/LoginSlice";
import MyToastr from "components/Toastr/Toastr";
import SelectField from "components/CustomField/SelectField";
import SaveIcon from '@material-ui/icons/Save';
import MutipleCombobox from "components/CustomField/MutipleCombobox";
import TelegramIcon from '@material-ui/icons/Telegram';

const useStyles = makeStyles(styles);
export default function CompanyPage(props) {
    const classes = useStyles();
    const res = LGCompanyPage.CompanyPage;
    const { ...rest } = props;
    const imageClasses = classNames(
        classes.imgRaised,
        classes.imgRoundedCircle,
        classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    const initialValues = {
        FullName: '',
        Email: '',
        PhoneNumber: '',
        Password: '',
        ConfirmPassword: '',
        CompanyName: '',
        TimeWorking: '',
        CompanyAddress: '',
        InfomationCompany: '',
        CompanyType:1,
        OTMode:1,
        ScalePeople:'500-800',
        LocationProvince:''
    };
    const validationShema = yup.object().shape({
        FullName: yup.string().required(res.TruongBBNhap),
        Email: yup.string().email().required(res.TruongBBNhap),
        Password: yup.string()
            .required(res.TruongBBNhap)
            .min(8, res.MatKhauQN)
            .matches(/[a-zA-Z]/, res.MatKhauInHoa)
        ,
        ConfirmPassword: yup.string()
            .required(res.TruongBBNhap)
            .oneOf([yup.ref('Password'), null], res.MatKhauKK),
        CompanyName: yup.string().required(res.TruongBBNhap),
        TimeWorking: yup.string().required(res.TruongBBNhap),
    })
    const initialValuesImage = {
        imageName: '',
        imageSrc: '',
        imageFile: null
    };
    const [values, setValues] = useState(initialValuesImage);
    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }
    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile: imageFile,
                    imageSrc: x.target.result
                })
            };
            reader.readAsDataURL(imageFile);
        }
    }
    const LoginInfo = useSelector(state => state.loginInfo);
    const history = useHistory();
    const dispatch = useDispatch();
    const HandleRedirectPageCompany = () =>{
        const LinkToPageCompany = `/Company/${LoginInfo.companyID}`;
        history.push(LinkToPageCompany);
        window.scrollTo(0, 150);
    }
    const HandleSubmitData = async (valuesForm) => {
        const formData = new FormData();
        formData.append('FullName', valuesForm.FullName);
        formData.append('Email', valuesForm.Email);
        formData.append('PhoneNumber', valuesForm.PhoneNumber);
        formData.append('Password', valuesForm.Password);
        formData.append('CompanyName', valuesForm.CompanyName);
        formData.append('TimeWorking', valuesForm.TimeWorking);
        formData.append('IntroduceCompany', valuesForm.InfomationCompany);
        formData.append('CompanyAddress', valuesForm.CompanyAddress);
        formData.append('LocationProvince', valuesForm.LocationProvince);
        
        formData.append('CompanyType', valuesForm.CompanyType);
        formData.append('OTMode', valuesForm.OTMode);
        formData.append('ScalePeople', valuesForm.ScalePeople);
        formData.append('imageFile', values.imageFile);
        formData.append('imageName', values.imageName);
        let result = await RegisterCompanyApi.post(formData);
        if (result.error == "") {
            MyToaStrSuccess('Đăng ký tài khoản thành công! Tài khoản của tuyển dụng đang trong trạng thái chờ hệ thống kiểm duyệt!');
            history.push("/");
            window.scrollTo(0, 150);
            //let dataLogin = { Email: valuesForm.Email, Password: valuesForm.Password }
            //const action = LoginAPIRedux(dataLogin);
           // dispatch(action);
          }
        else{
            MyToaStrError('Địa chỉ Email đã tồn tại. Vui lòng sử dụng một địa chỉ Email khác!');
        }
    }
   
    const [data, setData] = useState({ companyName: '', TimeWorking: '', jobsTitle: '', jobDescriptions: 'a', jobRequirements: 'b', reasonsToJoin: 'c', loveWorkingHere: 'd' });
    return (
        <div>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <div>
                    <div className={classes.container}>
                        <HeaderCompany data={data}></HeaderCompany>
                    </div>
                </div>
                <div className='ContainerForm'>
                    <Formik initialValues={initialValues}
                        validationSchema={validationShema}
                        onSubmit={values => HandleSubmitData(values)}>
                        {FormikProps => {
                            const { value, errors, touched } = FormikProps;
                            return (
                                <Form>
                                    <h1>{res.ThongTinDN}</h1>
                                    <FastField
                                        name="FullName"
                                        component={InputField}
                                        label={res.HoVaTen}
                                        placeholder={res.HoVaTen}
                                    />
                                    <FastField
                                        name="Email"
                                        component={InputField}
                                        label={res.DiaChiEmail}
                                        placeholder={res.DiaChiEmail}
                                    />

                                    <FastField
                                        name="Password"
                                        component={InputField}
                                        label={res.MatKhau}
                                        type='password'
                                        placeholder={res.MatKhau}
                                    />

                                    <FastField
                                        name="ConfirmPassword"
                                        component={InputField}
                                        label={res.NLMatKhau}
                                        type='password'
                                        placeholder={res.NLMatKhau}
                                    />

                                    <h1>{res.TTCongTy}</h1>

                                    <FastField
                                        name="CompanyName"
                                        component={InputField}
                                        label={res.TenCongTy}
                                        placeholder={res.TenCongTy}
                                    />
                                    <FastField
                                        name="TimeWorking"
                                        component={InputField}
                                        label={res.TGLamViec}
                                        placeholder={res.TGLamViec}
                                    />
                                    <FastField
                                        name="CompanyAddress"
                                        component={InputField}
                                        label={res.DiaChi}
                                        placeholder={res.DiaChi}
                                    />
                                      <FastField
                                        name="LocationProvince"
                                        component={MutipleCombobox}
                                        label="Tỉnh thành"
                                        placeholder="Tỉnh thành"
                                        ListName="UTELS_GetProvince"
                                    />
                                    <FastField
                                        name="CompanyType"
                                        component={SelectField}
                                        label="Loại công ty"
                                        placeholder="Loại công ty"
                                        ListName="CompanyType"
                                    />
                                     <FastField
                                        name="OTMode"
                                        component={SelectField}
                                        label="Chế độ OT"
                                        placeholder="Chế độ OT"
                                        ListName="CheDoOT"
                                    />
                                     <FastField
                                        name="ScalePeople"
                                        component={InputField}
                                        label="Quy mô nhân viên"
                                        placeholder="500-800"
                                    />

                                    <Label> Thông tin công ty</Label>
                                    <FastField
                                        name="InfomationCompany"
                                        component={MyCKEditor}
                                        label="Thông tin công ty"
                                        placeholder="Thông tin công ty"
                                    />
                                    <FormGroup>
                                        <Label for='FirstName'>{res.LogoCongTy}</Label>
                                    </FormGroup>

                                    <FormGroup>
                                        {/* <input type='file' onChange={showPreview} accept='image/*'></input> */}
                                        <div>
                                            <label htmlFor="myInput">
                                                {/* <Tooltip title="Mời bạn chọn hình đại diện" interactive placement="top" TransitionComponent={Zoom}> */}
                                                    {/* <Button justIcon> */}
                                                        <LinkedCameraIcon style={{ fontSize: 40,cursor:'pointer'}} />
                                                    {/* </Button> */}
                                                {/* </Tooltip> */}
                                                {/* <Icon style={{ fontSize: '20px' }} type="camera" /> */}
                                            </label>
                                            <input
                                                id="myInput"
                                                style={{ display: 'none' }}
                                                type={"file"}
                                                onChange={showPreview}
                                            />
                                        </div>


                                    </FormGroup>

                                    <FormGroup>
                                        <img className='imageLogoCompany' src={values.imageSrc}></img>
                                    </FormGroup>
                                    <FormGroup>
                                    <div style={{display:'flex'}}>
                                    <Button style={{marginLeft: 'auto'}} variant="outlined" type='submit' color="secondary" startIcon={<SaveIcon />} >{LoginInfo.companyID ?"Cập nhật":res.DangKy}</Button>
                                   {LoginInfo.companyID ?<Button style={{marginLeft: 5}} onClick={()=>{HandleRedirectPageCompany()}} variant="outlined" type='submit' color="primary" startIcon={<TelegramIcon />} >Đi đến trang công ty</Button> : null} 
                                        </div>
                                    </FormGroup>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>
            </div>
            <Footer />
        </div>
    );
}
