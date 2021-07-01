import React, { useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import TemplateEmailForm from 'components/TemplateEmail/TemplateEmailForm';
import FormTimeLineCandidate from 'components/FormTimeLineCandidate/FormTimeLineCandidate';
import LoadJobsApi from 'api/HomePageAPI';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { UpdateLoading } from 'api/app/LoadingSlicer';

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
  const [isShowFormChangePass, setIsShowFormChangePass] = useState(false);
  const openFormChangePassword = () => {
    setIsShowFormChangePass(true);
    setAnchorEl(null);

  }
  const closeFormChangePassword = () =>{
    setIsShowFormChangePass(false);
  }
  const history = useHistory();
  const RedirectPageApply = () => {
    setAnchorEl(null);
    const linkRedired = `/ApplyJob`;
    history.push(linkRedired);
    window.scrollTo(0, 450);
  }
  const dispatch = useDispatch();

  const RedirectPageRecruitmentManagement = () => {
    dispatch(UpdateLoading(true));
    setTimeout(() => {
      dispatch(UpdateLoading(false));
    }, 1000)
    setAnchorEl(null);
    const linkRedired = `/RecruitmentManagement`;
    history.push(linkRedired);
    window.scrollTo(0, 450);
  }
  const RedirectPageEditCompany = () => {
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
  const [visibleTimeline, setVisibleTimeline] = React.useState(false);
  const LoadDataSource = async () =>{
    if(LoginInfo.CadidateCode !== "" && typeof LoginInfo.CadidateCode !== "undefined"){
      const data = await LoadJobsApi.getInfoToShowTimeline();
      if(data.isShowTimeline == true){
        setVisibleTimeline(true);
      }
    }
    else{
      setVisibleTimeline(false);
    }
  }
  const OpenNotification = async () =>{
    const result = await SeekerAPI.updateStatusViewTimeLine(true);
    if(result.error === ""){
      MyToaStrSuccess("Cập nhật thành công")
      setVisible(false);
      return;
    }
    MyToaStrError("Có lỗi xảy ra");
  }
  useEffect(() => {
    LoadDataSource();
  }, [LoginInfo])
  return (
    <div style={{ display: 'contents' }}>
      <TemplateEmailForm visible={visible} setVisible={setVisible} widthForm={1000}></TemplateEmailForm>
      <FormChangePassword isShowFormChangePass={isShowFormChangePass} setIsShowFormChangePass={setIsShowFormChangePass} />
      <FormTimeLineCandidate visible={visibleTimeline} setVisible={setVisibleTimeline}></FormTimeLineCandidate>

      <div style={{marginTop:8}}>
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
          {LoginInfo.role === "User" ?
            <StyledMenuItem onClick={() => RedirectPageApply()}>
              <ListItemIcon>
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Đã ứng tuyển" />
            </StyledMenuItem> : null}
            {LoginInfo.role === "User" ?
            <StyledMenuItem onClick={() => OpenNotification()}>
              <ListItemIcon>
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Bật thông báo" />
            </StyledMenuItem> : null}
          {LoginInfo.role === "Recruiter" ?
            <StyledMenuItem onClick={() => RedirectPageRecruitmentManagement()}>
              <ListItemIcon>
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Tuyển dụng" />
            </StyledMenuItem> : null}
          {LoginInfo.role === "Recruiter" ?
            <StyledMenuItem onClick={() => showModal()}>
              <ListItemIcon>
                <SendIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText primary="Thiết lập Email" />
            </StyledMenuItem> : null}
          {/* { LoginInfo.role === "Recruiter" ?
        <StyledMenuItem onClick={()=>RedirectPageEditCompany()}>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Chỉnh sửa thông tin công ty" />
        </StyledMenuItem>:null} */}

          <StyledMenuItem onClick={() => openFormChangePassword()} >
            <ListItemIcon>
              <VpnKeyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Đổi mật khẩu" />
          </StyledMenuItem>
        </StyledMenu>
        <TemplateEmailForm visible={visible} setVisible={setVisible} widthForm={1000}></TemplateEmailForm>
      </div>
    </div>
  );
}