import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SendIcon from '@material-ui/icons/Send';
import ListIcon from '@material-ui/icons/List';
import FormChangePassword from 'components/FormLogin/FormChangePassword';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TemplateEmailForm from 'components/TemplateEmail/TemplateEmailForm';
const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const [isShowFormChangePass,setIsShowFormChangePass] = useState(false);
  const openFormChangePassword = () =>{
    setIsShowFormChangePass(true);
    setAnchorEl(null);
    
  }
  const history = useHistory();
  const RedirectPageApply = () =>{
    setAnchorEl(null);
      const linkRedired = `/ApplyJob`;
      history.push(linkRedired);
      window.scrollTo(0, 450);
  }
  const RedirectPageRecruitmentManagement = () =>{
    setAnchorEl(null);
      const linkRedired = `/RecruitmentManagement`;
      history.push(linkRedired);
      window.scrollTo(0, 450);
  }
  const RedirectPageEditCompany = () =>{
    setAnchorEl(null);
      const linkRedired = `/EditCompany`;
      history.push(linkRedired);
      window.scrollTo(0, 450);
  }
  const LoginInfo = useSelector(state => state.loginInfo);
  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
  };
  return (
    <div style={{display: 'contents'}}>
      {isShowFormChangePass?<FormChangePassword/>:null}
      <Button
            color="transparent"
            onClick={handleClick}
          ><ListIcon color="secondary" /></Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
         { LoginInfo.role === "User" ?
        <StyledMenuItem onClick={()=>RedirectPageApply()}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Đã ứng tuyển" />
        </StyledMenuItem>:null}
        { LoginInfo.role === "Recruiter" ?
        <StyledMenuItem onClick={()=>RedirectPageRecruitmentManagement()}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Tuyển dụng" />
        </StyledMenuItem>:null}
        { LoginInfo.role === "Recruiter" ?
        <StyledMenuItem onClick={()=>showModal()}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Thiết lập Email" />
        </StyledMenuItem>:null}
        {/* { LoginInfo.role === "Recruiter" ?
        <StyledMenuItem onClick={()=>RedirectPageEditCompany()}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Chỉnh sửa thông tin công ty" />
        </StyledMenuItem>:null} */}

        <StyledMenuItem onClick={()=>openFormChangePassword()} >
          <ListItemIcon>
            <VpnKeyIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Đổi mật khẩu" />
        </StyledMenuItem>
      </StyledMenu>
      <TemplateEmailForm visible={visible} setVisible={setVisible}></TemplateEmailForm>
    </div>
  );
}