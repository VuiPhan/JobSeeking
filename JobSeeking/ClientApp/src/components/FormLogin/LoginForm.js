import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import {Logout, LoginAPIRedux } from 'components/FormLogin/LoginSlice'
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import { FastField, Formik, Form } from 'formik';
import LGCompanyPage from "Language/CompanyPage";
import InputField from 'components/CustomField/InputField';
import { FormFeedback, FormGroup} from "reactstrap";
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { MyToaStrError } from 'components/Toastr/Toastr2.js';
import MyToastr from 'components/Toastr/Toastr.js';
import CustomizedMenus from 'components/FeatureMenu/FeatureMenu.js';
import SettingsPowerIcon from '@material-ui/icons/SettingsPower';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BusinessIcon from '@material-ui/icons/Business';
import FormTimeLineCandidate from 'components/FormTimeLineCandidate/FormTimeLineCandidate.js';
import FormForgetPassword from './FormForgetPassword/FormForgetPassword.js';

const useStyles = makeStyles(styles);

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [visibleFormForget, setVisibleFormForget] = React.useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();
  const LoginInfo = useSelector(state => state.loginInfo);
  const res = LGCompanyPage.CompanyPage;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async (user) => {
    const action = LoginAPIRedux(user);
    const result = await dispatch(action);
    debugger;
    if(typeof result.payload === 'string'){
      MyToaStrError(result.payload);
      return;
    }
    if(!result.payload.UserID){
      MyToaStrError('Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại');
      return;
    }
    setOpen(false);
 
    
  };
  const history = useHistory();
  const handleLogout = async (user) => {
    if(history.location.pathname === '/ProfilePage' || history.location.pathname.substring(0, 13) == '/ProfilePage/'){
      
      history.push('/');
    }
    const action = Logout();
    dispatch(action);
  };
  const initialValues = {
    Email: '',
    Password: '',
};
const validationShema = yup.object().shape({
  Email: yup.string().email("Đây phải là một địa chỉ Email").required(res.TruongBBNhap),
  Password: yup.string()
      .required(res.TruongBBNhap)
  ,
})
const HandleRedirectPageCompanyRegiter = () =>{
  setOpen(false);
    const linkRedired = `/CompanyRegiter`;
    history.push(linkRedired);
    window.scrollTo(0, 650);
}
const HandleRedirectProfilePage = () =>{
  setOpen(false);
  const linkRedired = `/ProfilePage`;
  history.push(linkRedired);
  window.scrollTo(0, 325);
}
  // Cần phải dispath một cái action
const ShowFormForget = () =>{
  setOpen(false);
  setVisibleFormForget(true);
}
  
  return (
    <div>
    <div style={{ display: "inline" }}>
  <FormForgetPassword visible={visibleFormForget} setVisible={setVisibleFormForget} setShowLoginForm={setOpen}></FormForgetPassword>

        {LoginInfo.UserLoginDB === '' || typeof LoginInfo.UserLoginDB === 'undefined'
        ?       <Button
        color="default"
        className={classes.navLink}
        onClick={handleClickOpen}
      >
        <AccountCircleIcon color="secondary" className={classes.icons} /> Đăng nhập & đăng ký
        </Button>
        :       <Button
        color="default"
        className={classes.navLink}
        onClick={handleLogout}
      >
        <SettingsPowerIcon className={classes.icons} /> Đăng xuất
        </Button>
        
      }
      
    {LoginInfo.UserLoginDB}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

        <DialogContent>
          <Formik initialValues={initialValues}
                        validationSchema={validationShema}
                         onSubmit={values =>handleLogin(values)}>
                        {FormikProps => {
                            return (
                                <Form>
                                    <h1>{res.ThongTinDN}</h1>
                                    <FastField
                                        name="Email"
                                        component={InputField}
                                        label={res.DiaChiEmail}
                                        placeholder={res.MoiBanNhapDiaChiEmail}
                                    />

                                    <FastField
                                        name="Password"
                                        component={InputField}
                                        label={res.MatKhau}
                                        type='password'
                                        placeholder={res.MoiBanNhapMatKhau}
                                    />
                                  <MyToastr></MyToastr>
                                    <FormGroup>
                                        <Button style={{marginTop:10}} startIcon={<ExitToAppIcon />} type='submit' variant="outlined" color="primary">{res.DangNhap}</Button>
                                        <br/>
                                        <Button style={{marginTop:10}} startIcon={<ExitToAppIcon />} onClick={()=>ShowFormForget()} variant="outlined" color="primary">Quên mật khẩu</Button>
                                        <br/>
                                        <p style={{marginTop:30}}>Bạn chưa có tài khoản? Đăng ký ngay</p>
                                        <Button startIcon={<GroupAddIcon />} onClick={()=>HandleRedirectProfilePage()} variant="outlined" color="secondary">{res.DangKyThanhVien}</Button>

                                        <Button startIcon={<BusinessIcon />} style = {{ marginLeft: 30}} onClick={()=>HandleRedirectPageCompanyRegiter()} variant="outlined" color="secondary">{res.DangKyTD}</Button>
                                    </FormGroup>
                                </Form>
                            )
                        }}
                    </Formik>
        </DialogContent>
      </Dialog>
    </div>
    </div>
  );
}
