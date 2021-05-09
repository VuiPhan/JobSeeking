/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// core components
import Button from "../../components/CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import FormDialog from './../FormLogin/LoginForm';
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import CustomizedMenus from "components/FeatureMenu/FeatureMenu.js";
import MutipleLevel from "components/MutipleLevel/MutipleLevel.js";
import ReceiptIcon from '@material-ui/icons/Receipt';
import BusinessIcon from '@material-ui/icons/Business';
import MySearchBar from  '../SearchBar/SearchBar';
import MailIcon from '@material-ui/icons/Mail';
import Badge from '@material-ui/core/Badge';
import { Tooltip, Zoom } from "@material-ui/core";
import NotificationOfRecruitForm from "components/NotificationOfRecruit/NotificationOfRecruit.js";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  padding: {
    padding: theme.spacing(0, 2),
  },
}));


export default function HeaderLinks(props) {
  const classes = useStyles();
  const [visible, setVisible] = React.useState(false);

  const LoginInfo = useSelector(state => state.loginInfo);
  const LinkToPageCompany = `/Company/${LoginInfo.companyID}`;
  const showModal = () => {
    setVisible(true);
  };
  return (
    <div style={{display:'flex'}}>
      
      {LoginInfo.role === "Recruiter"? <NotificationOfRecruitForm visible={visible} setVisible={setVisible} widthForm={800}></NotificationOfRecruitForm>: null}
      {LoginInfo.CadidateCode === ""? null: <MySearchBar></MySearchBar>}
    { LoginInfo.role === "User"?
        <Button
          component={Link} to="/ProfilePage"
          color="transparent"
          className={classes.navLink}
        >
          <AccountCircleIcon color="secondary" className={classes.icons} /> Trang cá nhân
        </Button>
        : ""
        }
         { LoginInfo.role === "Recruiter"?
        <Button
          component={Link} to={LinkToPageCompany}
          color="transparent"
          className={classes.navLink}
        >
          <BusinessIcon color="secondary" className={classes.icons} /> Trang công ty
        </Button>
        : ""
        }
        { LoginInfo.role === "Recruiter"?
          <Button
            component={Link} to="/PublishedRecruitment"
            color="transparent"
            className={classes.navLink}
          >
            <ReceiptIcon fontSize="large" color="primary" className={classes.icons} /> Đăng tin tuyển dụng
         </Button>
          :""
        }
        <FormDialog></FormDialog>
        {LoginInfo.role === "Recruiter"? <div>
        <Tooltip title="Thông báo mới" interactive placement="botttom" TransitionComponent={Zoom}>
        <IconButton aria-label="4 pending messages"  onClick={() => showModal()}>
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        </Tooltip>
        </div> : null}
        { LoginInfo.role ? <CustomizedMenus className={classes.navLink}></CustomizedMenus>:null}
    </div>
  );
}
