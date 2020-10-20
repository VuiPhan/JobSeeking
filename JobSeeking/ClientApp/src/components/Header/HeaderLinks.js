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
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload} from "@material-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

// core components
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.js";
import Button from "../../components/CustomButtons/Button.js";

import styles from "../../assets/jss/material-kit-react/components/headerLinksStyle.js";
import FormDialog from './../FormLogin/LoginForm';
import { useSelector } from "react-redux";
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  const LoginInfo = useSelector(state => state.loginInfo)
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>  
      </ListItem>
      <ListItem className={classes.listItem}>
    
        <Button
          component={Link} to="/ProfilePage"
          color="transparent"
          className={classes.navLink}
        >
          <AccountCircleIcon className={classes.icons} /> Trang cá nhân
          
        </Button>
        <Button
          component={Link} to="/Company"
          color="transparent"
          className={classes.navLink}
        >
          <AccountCircleIcon className={classes.icons} /> Trang công ty
          
        </Button>
        <Button
          component={Link} to="/Jobs"
          color="transparent"
          className={classes.navLink}
        >
          <AccountCircleIcon className={classes.icons} /> Trang công việc
          
        </Button>
        <Button
          component={Link} to="/PublishedRecruitment"
          color="transparent"
          className={classes.navLink}
        >
          <AccountCircleIcon className={classes.icons} /> Đăng tin tuyển dụng
          
        </Button>
        <FormDialog></FormDialog>
      </ListItem>
      <ListItem className={classes.listItem}>
      </ListItem>
      <ListItem className={classes.listItem}>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-tooltip"
          title="Follow us on instagram"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.instagram.com/CreativeTimOfficial?ref=creativetim"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-instagram"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
