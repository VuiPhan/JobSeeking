import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import LoginApi from '../../api/System/Login';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);
  const [userName,setuserName] = React.useState('');
  const [password,setpassword] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogin = async () => {
    let user = {userName:userName,pass:password};
    var x  = LoginApi.get(user);
    console.log('xxaaaa',x);
    alert(JSON.stringify({userName,password}))
  };
  const changePassword = (e)=>{
      setpassword(e.target.value);
  }
  const changeUserName = (e)=>{
    setuserName(e.target.value);
}
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
       Đăng nhập
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            value={userName}
            onChange={changeUserName}
            label="Tên tài khoản"
            type="text"
            fullWidth
          />
            <TextField
            autoFocus
            margin="dense"
            id="password"
            value={password}
            onChange={changePassword}
            label="Mật khẩu"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
        <Button onClick={handleLogin} color="primary">
            Đăng nhập
          </Button>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>

        </DialogActions>
      </Dialog>
    </div>
  );
}
