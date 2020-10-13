import { FormGroup, Input, TextareaAutosize, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import React from 'react';
import { Form, Label } from 'reactstrap';
import '../Model/Model.scss';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Viết Review
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className='containerDialog'
      >
        <DialogTitle id="alert-dialog-slide-title">{"Để lại Review của bạn"}</DialogTitle>
        <DialogContent>
          <Form>
            <FormGroup>
              <Label for='titleID'>Tiêu đề:</Label>
              <Input name="Title" id='titleID' placeholder='Nội dung tổng quan'></Input>
            </FormGroup>
            <FormGroup>
              <Label for='titleID'>Điều bạn thích:</Label>
              <Input name="Title" id='titleID' placeholder='Để lại điều bạn thích'></Input>
            </FormGroup>
            <FormGroup>
              <Label for='titleID'>Điều cần cải thiện:</Label>
              <Input name="Title" type='textarea' id='titleID' placeholder='Để lại điều bạn cho rằng cần phải cải thi'></Input>
            </FormGroup>
          </Form>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Đăng
          </Button>
          <Button onClick={handleClose} color="primary">
            Đóng
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}
