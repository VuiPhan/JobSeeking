import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { Logout, LoginAPIRedux } from 'components/FormLogin/LoginSlice'
import { useDispatch, useSelector } from 'react-redux';
import { FastField, Formik, Form } from 'formik';
import LGCompanyPage from "Language/CompanyPage";
import InputField from 'components/CustomField/InputField';
import { FormGroup } from "reactstrap";
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { MyToaStrError } from 'components/Toastr/Toastr2.js';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import BusinessIcon from '@material-ui/icons/Business';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import FormForgetPassword from '../FormForgetPassword/FormForgetPassword.js';
import '../LoginFormCss.scss';
import ImageSvg from '../../../assets/svg/undraw_Agreement_re_d4dv.svg';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
} from "reactstrap";

function FormLoginCustom(props) {
    const { open, setOpen } = props;
    const res = LGCompanyPage.CompanyPage;
    const [visibleFormForget, setVisibleFormForget] = React.useState(false);

    const dispatch = useDispatch();
    const LoginInfo = useSelector(state => state.loginInfo);
    const handleLogin = async (user) => {
        const action = LoginAPIRedux(user);
        const result = await dispatch(action);
        if (typeof result.payload === 'string') {
            MyToaStrError(result.payload);
            return;
        }
        if (!result.payload.UserID) {
            MyToaStrError('Tài khoản hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại');
            return;
        }
        setOpen(false);


    };
    const history = useHistory();
    const handleLogout = async (user) => {
        if (history.location.pathname === '/ProfilePage' || history.location.pathname.substring(0, 13) == '/ProfilePage/') {

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
    const HandleRedirectPageCompanyRegiter = () => {
        setOpen(false);
        const linkRedired = `/CompanyRegiter`;
        history.push(linkRedired);
        window.scrollTo(0, 650);
    }
    const HandleRedirectProfilePage = () => {
        setOpen(false);
        const linkRedired = `/ProfilePage`;
        history.push(linkRedired);
        window.scrollTo(0, 325);
    }
    // Cần phải dispath một cái action
    const ShowFormForget = () => {
        setOpen(false);
        setVisibleFormForget(true);
    }
    const handleClose = () => {
        setOpen(false);
    };
    const alignButton = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        height: '100%'
    }
    const centerImage = {
        alignItems: 'center',
        marginTop:70
    }
    return (
        <div>
            <FormForgetPassword visible={visibleFormForget} setVisible={setVisibleFormForget} setShowLoginForm={setOpen}></FormForgetPassword>
            <div className={`${open ? "active" : ""} show`}>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <Formik initialValues={initialValues}
                            validationSchema={validationShema}
                            onSubmit={values => handleLogin(values)}>
                            {FormikProps => {
                                return (
                                    <Form>
                                        <Row style={{justifyContent: 'center'}}>
                                            <div >
                                        <h1 >{res.ThongTinDN}</h1>
                                        <hr />
                                        </div>
                                        </Row>
                                        <Row>
                                            <Col md="6" xs="6">
                                                <div style={centerImage}>
                                                <img src={ImageSvg}></img>
                                                </div>
                                            </Col>
                                            <Col md="6" xs="6">
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
                                                <FormGroup>
                                                    <div style={alignButton}>
                                                        <Button startIcon={<ExitToAppIcon />} type='submit' variant="outlined" color="primary">{res.DangNhap}</Button>
                                                    </div>
                                                    <div style={alignButton}>
                                                        <Button startIcon={<VpnKeyIcon />} style={{ marginTop: 10 }} onClick={() => ShowFormForget()} variant="outlined" color="primary">Quên mật khẩu</Button>
                                                    </div>
                                                    <p style={{ marginTop: 30 }}>Bạn chưa có tài khoản? Đăng ký ngay</p>
                                                    <div style={alignButton}>
                                                        <Button startIcon={<GroupAddIcon />} onClick={() => HandleRedirectProfilePage()} variant="outlined" color="secondary">{res.DangKyThanhVien}</Button>
                                                    </div>
                                                    <div style={alignButton}>
                                                        <Button startIcon={<BusinessIcon />} style={{ marginTop: 10 }} onClick={() => HandleRedirectPageCompanyRegiter()} variant="outlined" color="secondary">{res.DangKyTD}</Button>
                                                    </div>



                                                </FormGroup>
                                            </Col>

                                        </Row>
                                    </Form>
                                )
                            }}
                        </Formik>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default FormLoginCustom
