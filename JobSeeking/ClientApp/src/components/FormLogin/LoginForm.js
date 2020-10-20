import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginApi from '../../api/System/Login';
import { LoginForm, Logout, someAction } from 'components/FormLogin/LoginSlice'
import { useDispatch, useSelector } from 'react-redux';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import { FastField, Formik, Form } from 'formik';
import LGCompanyPage from "Language/CompanyPage";
import InputField from 'components/CustomField/InputField';
import { FormGroup} from "reactstrap";
import * as yup from 'yup';

const useStyles = makeStyles(styles);

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [userName, setuserName] = React.useState('');
  const [password, setpassword] = React.useState('');
  const dispatch = useDispatch();
  const LoginInfo = useSelector(state => state.loginInfo)
  const res = LGCompanyPage.CompanyPage;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = async (user) => {
    const action = someAction(user);
    dispatch(action);
    setOpen(false);
  };
  const handleLogout = async (user) => {
    const action = Logout();
    dispatch(action);
  };

  const changePassword = (e) => {
    setpassword(e.target.value);
  }
  const changeUserName = (e) => {
    setuserName(e.target.value);
  }
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
  // Cần phải dispath một cái action
  return (
    <div style={{ display: "inline" }}>

        {LoginInfo.UserLoginDB === '' || typeof LoginInfo.UserLoginDB === 'undefined'
        ?       <Button
        color="transparent"
        className={classes.navLink}
        onClick={handleClickOpen}
      >
        <AccountCircleIcon className={classes.icons} /> Đăng nhập
        </Button>
        :       <Button
        color="transparent"
        className={classes.navLink}
        onClick={handleLogout}
      >
        <AccountCircleIcon className={classes.icons} /> Đăng xuất
        </Button>
      }
    {LoginInfo.UserLoginDB}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent>
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
                                    <FormGroup>
                                        <Button type='submit'>{res.DangNhap}</Button>
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
