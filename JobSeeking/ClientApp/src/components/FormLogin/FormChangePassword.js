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
import { FormFeedback, FormGroup} from "reactstrap";
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2.js';
import MyToastr from 'components/Toastr/Toastr.js';
import CustomizedMenus from 'components/FeatureMenu/FeatureMenu.js';
import handleGetJson from 'common/ReadJson.js';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles(styles);

export default function FormChangePassword() {
  const [open, setOpen] = React.useState(true);
  debugger;
  const classes = useStyles();
  const dispatch = useDispatch();
  const LoginInfo = useSelector(state => state.loginInfo);
  const res = LGCompanyPage.CompanyPage;
  const resValidation = handleGetJson("Validation");
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const initialValues = {
    PasswordCurrent: '',
    PasswordNew: '',
    RePasswordNew: '',
};
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
        setOpen(false); 
      }
      .bind(this),
      2000
  );
  };
  const history = useHistory();
 
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
  return (
    <div style={{ display: "inline" }}>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
          <Formik initialValues={initialValues}
                        validationSchema={validationShema}
                         onSubmit={values =>handleChangePassword(values)}>
                        {FormikProps => {
                            return (
                                <Form>
                                    <h1>Thay đổi mật khẩu</h1>
                                    <FastField
                                        name="PasswordCurrent"
                                        component={InputField}
                                        type='password'
                                        label="Mật khẩu hiện tại"
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
                                  <MyToastr></MyToastr>
                                    <FormGroup>
                                      <div style={{float:'right'}}>
                                        <Button startIcon={<DoneIcon />} type='submit' variant="outlined" color="secondary">Xác nhận thay đổi</Button>
                                        <Button  startIcon={<CloseIcon />} style={{marginLeft:10}} onClick={()=>handleClose()} variant="outlined" color="primary">Đóng</Button>
                                        </div>
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
