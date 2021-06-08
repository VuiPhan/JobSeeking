
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from "@material-ui/core/styles";
import { FastField, Formik, Form } from 'formik';
import LGCompanyPage from "Language/CompanyPage";
import InputField from 'components/CustomField/InputField';
import {  FormGroup} from "reactstrap";
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2.js';
import MyToastr from 'components/Toastr/Toastr.js';
import handleGetJson from 'common/ReadJson.js';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import { DialogTitle } from '@material-ui/core';
import GuestAPI from 'api/Guest/GuestAPI';
import Countdown from 'react-countdown';
import { isDebuggerStatement } from 'typescript';

const Completionist = () => <span>Mã OTP đã hết hạn, bạn vui lòng gửi lại OTP mới!</span>;
export default function FormChangePassword(props) {
  const {visible,setVisible,setShowLoginForm} = props;
  const res = LGCompanyPage.CompanyPage;
  const resValidation = handleGetJson("Validation","PersonalPage");
  const minusExprire = 30 * 1000;
  const [isShowTextChangePass, setIsShowTextChangePass] = React.useState(false);
  const [valueMinusExpire, setValueMinusExpire] = React.useState(minusExprire);
  const [valueOfCountdown, setCalueOfCountdown] = React.useState(Date.now() + 50000);
  const [textExprire, setIsTextExprire] = React.useState('');
  
  const initialValues = {
    PasswordCurrent: '',
    PasswordNew: '',
    RePasswordNew: '',
};
const handleCloseFormForget = () =>{
    setVisible(false);
    setShowLoginForm(true);
    setIsShowTextChangePass(false);
  }
  const handleChangePassword = async (data) => {
    const result = await SeekerAPI.changePassword(data.PasswordCurrent,data.PasswordNew);
    if(result.error != ""){
      MyToaStrError('Mật khẩu hiện tại không chính xác, vui lòng kiểm tra lại!');
      return;
    }
    MyToaStrSuccess('Cập nhật mật khẩu thành công!');
    //
    setTimeout(
      function() {
        handleCloseFormForget();
      }
      .bind(this),
      2000
  );
  };
const validationShema = yup.object().shape({
  PasswordNew: yup.string()
  .required(resValidation.TruongBBNhap)
  .min(8, resValidation.MatKhauQN)
  .matches(/[a-zA-Z]/, resValidation.MatKhauInHoa)
  .nullable()
,
RePasswordNew: yup.string()
  .required(resValidation.TruongBBNhap)
  .oneOf([yup.ref('PasswordNew'), null], resValidation.MatKhauKK).nullable(),
})
  // Cần phải dispath một cái action
const SendOTP = async (loginAccount) =>{
    const result = await GuestAPI.forgetPassword(loginAccount);
    if(result.isSendOTP === true){
      setIsShowTextChangePass(true);
      MyToaStrSuccess(result.message);
      return;
    }
    MyToaStrError(result.message);
    return;
}
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    setIsShowTextChangePass(false);
    // Render a completed state
    return <Completionist />;
  } else {
    // Render a countdown
    return <span style={{color:'red',paddingTop:3,paddingBottom:3}}>Mã OTP sẽ hết hạn sau: {hours}:{minutes}:{seconds}</span>;
  }
};
const UpdatePassWordForget = async (values) =>{
  const result = await GuestAPI.updatePassword(values.loginAccount,values.otp,values.PasswordNew);
    if(result.isUpdateSuccess === true){
      setIsShowTextChangePass(true);
      MyToaStrSuccess(result.message);
      handleCloseFormForget();
      return;
    }
    MyToaStrError(result.message);
    return;

}

  return (
    <div style={{ display: "inline" }}>
    
      <Dialog open={visible} onClose={()=>handleCloseFormForget()} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Formik initialValues={initialValues}
                        validationSchema={validationShema}
                         onSubmit={values =>handleChangePassword(values)}>
                        {FormikProps => {
                             const { values, errors, touched } = FormikProps;
                            return (
                              <div>
                              {/* {isShowTextChangePass === true ? 
                                <Countdown
                                                                    date={valueOfCountdown}
                                                                    renderer={renderer}
                                                                  /> : null} */}
                                <Form>
                                    <h1 style={{paddingTop: 0}}>Thay đổi mật khẩu</h1>
                                    <hr></hr>
                                    <FastField
                                        name="loginAccount"
                                        component={InputField}
                                        type='text'
                                        label="Tài khoản đăng nhập"
                                        placeholder="Mời bạn nhập"
                                    />
                                        {isShowTextChangePass === true ?
                                        null:
                                        <Button startIcon={<DoneIcon />} onClick={()=>SendOTP(values.loginAccount)} variant="outlined" color="secondary">Gửi mã OTP</Button>}
                                      {isShowTextChangePass === true ? 
                                    <div>
                                       
                                        <FastField
                                        name="otp"
                                        component={InputField}
                                        type='text'
                                        label="Mời bạn nhập mã OTP"
                                        placeholder="Mời bạn nhập"
                                    />
 <FastField
                                        name="PasswordNew"
                                        component={InputField}
                                        label="Mật khẩu mới"
                                        type='password'
                                        placeholder="Mời bạn nhập mật khẩu mới"
                                    />
                                     <FastField
                                        name="RePasswordNew"
                                        component={InputField}
                                        label="Nhập lại mật khẩu mới"
                                        type='password'
                                        placeholder="Mời bạn nhập lại mật khẩu mới"
                                    />
                                    </div>  : null
                                    }
                                  <hr style={{marginTop:5}}></hr>
                                    <FormGroup>
                                      <div style={{float:'right'}}>
                                      {isShowTextChangePass === true ? <Button startIcon={<DoneIcon />} type='submit' variant="outlined" onClick={() =>UpdatePassWordForget(values)} color="secondary">Xác nhận thay đổi</Button>:null}
                                        <Button  startIcon={<CloseIcon />} style={{marginLeft:10}} onClick={()=>handleCloseFormForget()} variant="outlined" color="primary">Đóng</Button>
                                        </div>
                                    </FormGroup>
                                </Form>
    </div>

                            )
                        }}
                    </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}
