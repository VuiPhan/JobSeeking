import React, { useState } from 'react';
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
import { FormFeedback, FormGroup, Toast} from "reactstrap";
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { MyToaStr2 } from 'components/Toastr/Toastr2.js';
import { toast } from 'react-toastify';
import MyToastr from 'components/Toastr/Toastr.js';

const useStyles = makeStyles(styles);

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const LoginInfo = useSelector(state => state.loginInfo)
  const res = LGCompanyPage.CompanyPage;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [textError, settextError] = useState('');
  const handleLogin = async (user) => {
    const action = LoginAPIRedux(user);
    const result = await dispatch(action);
    if(!result.payload.UserID){
      MyToaStr2('Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại');
      return;
    }
    setOpen(false);
 
    
  };
  const handleLogout = async (user) => {
    const action = Logout();
    var x = dispatch(action);
  };
  const initialValues = {
    Email: '',
    Password: '',
};
const validationShema = yup.object().shape({
  Email: yup.string().email().required(res.TruongBBNhap),
  Password: yup.string()
      .required(res.TruongBBNhap)
  ,
})
const history = useHistory();
const HandleRedirectPageCompanyRegiter = () =>{
  setOpen(false);
    const linkRedired = `/CompanyRegiter`;
    history.push(linkRedired);
    window.scrollTo(0, 150);
}
const HandleRedirectProfilePage = () =>{
  setOpen(false);
  const linkRedired = `/ProfilePage`;
  history.push(linkRedired);
  window.scrollTo(0, 150);
}
  // Cần phải dispath một cái action
  return (
    
    <div style={{ display: "inline" }}>

        {LoginInfo.UserLoginDB === '' || typeof LoginInfo.UserLoginDB === 'undefined'
        ?       <Button
        color="default"
        className={classes.navLink}
        onClick={handleClickOpen}
      >
        <AccountCircleIcon className={classes.icons} /> Đăng nhập
        </Button>
        :       <Button
        color="default"
        className={classes.navLink}
        onClick={handleLogout}
      >
        <AccountCircleIcon className={classes.icons} /> Đăng xuất
        </Button>
      }
    {LoginInfo.UserLoginDB}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          {/* <LoginForm2></LoginForm2> */}
          <Formik initialValues={initialValues}
                        validationSchema={validationShema}
                         onSubmit={values =>handleLogin(values)}>
                        {FormikProps => {
                            const { value, errors, touched } = FormikProps;

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
                                    <FormFeedback>  {textError}</FormFeedback>
                                    <FormGroup>
                                        <Button type='submit' variant="outlined" color="primary">{res.DangNhap}</Button>
                                        <br/>
                                        <p>Bạn chưa có tài khoản? Đăng ký ngay</p>
                                        <Button onClick={()=>HandleRedirectProfilePage()} variant="outlined" color="secondary">{res.DangKyThanhVien}</Button>

                                        <Button style = {{ marginLeft: 30}} onClick={()=>HandleRedirectPageCompanyRegiter()} variant="outlined" color="secondary">{res.DangKyTD}</Button>
                                    </FormGroup>
                                </Form>
                            )
                        }}
                    </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
