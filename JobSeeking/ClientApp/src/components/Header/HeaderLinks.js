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
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const LoginInfo = useSelector(state => state.loginInfo);
  const LinkToPageCompany = `/Company/${LoginInfo.companyID}`;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
      </ListItem>
      <ListItem className={classes.listItem}>
      { LoginInfo.role === "User"?
        <Button
          component={Link} to="/ProfilePage"
          color="transparent"
          className={classes.navLink}
        >
          <AccountCircleIcon className={classes.icons} /> Trang cá nhân
        </Button>
        : ""
        }
         { LoginInfo.role === "Recruiter"?
        <Button
          component={Link} to={LinkToPageCompany}
          color="transparent"
          className={classes.navLink}
        >
          <AccountCircleIcon className={classes.icons} /> Trang công ty
        </Button>
        : ""
        }
        { LoginInfo.role === "Recruiter"?
          <Button
            component={Link} to="/PublishedRecruitment"
            color="transparent"
            className={classes.navLink}
          >
            <AccountCircleIcon className={classes.icons} /> Đăng tin tuyển dụng
         </Button>
          :""
        }
        <FormDialog></FormDialog>
        <CustomizedMenus className={classes.navLink}></CustomizedMenus>
      </ListItem>
    </List>
  );
}
