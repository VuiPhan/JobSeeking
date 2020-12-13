import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import InputField from 'components/CustomField/InputField';
import TextAreaField from 'components/CustomField/TextAreaField';
import { FastField, Formik, Form } from 'formik';
import SaveIcon from '@material-ui/icons/Save';


import React from 'react';
import '../Model/Model.scss';
import * as yup from 'yup';
import LGCompanyPage from "Language/CompanyPage";
import CompanyAPI from 'api/Company/CompanyAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { AddDataComment, GetDataCommentRedux } from 'components/ListViewKendo/ListViewKendoSlice';
import { MyToaStrSuccess } from 'components/Toastr/Toastr2';
import MyToastr from 'components/Toastr/Toastr';
import EditIcon from '@material-ui/icons/Edit';
import Ratting from 'components/Rating/Rating';
import { useState } from 'react';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {
  const {onRefresh} = props;
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const res = LGCompanyPage.CompanyPage;
  const LoginInfo = useSelector(state => state.loginInfo);
  const DataComment = useSelector(state => state.DataComment);

  const history = useHistory();
  const { companyID } = useParams();
  const handleClose = () => {
    setOpen(false);
  };
  const [valueStar,setvalueStar]= useState(5);
  const initialValues = {
    TitleReview: '',
    Improve: '',
    ILike: '',
    Star: 3

  };
  const validationShema = yup.object().shape({
    TitleReview: yup.string()
      .required(res.TruongBBNhap)
    ,
    Improve: yup.string()
    .required(res.TruongBBNhap)
  ,
  ILike: yup.string()
  .required(res.TruongBBNhap)
,
  })
  const dispatch = useDispatch();
  const submitData = async (values) => {
    const formData = new FormData();
    formData.append('TitleReview', values.TitleReview);
    formData.append('Improve', values.Improve);
    formData.append('ILike', values.ILike);
    formData.append('Star', valueStar);
    formData.append('UserID', LoginInfo.UserID);
    formData.append('CompanyID', companyID);
    let result = await CompanyAPI.addReview(formData);
    MyToaStrSuccess('Cảm ơn bạn đã để lại review công ty');
    const action = GetDataCommentRedux(companyID);
    const resultdata = await dispatch(action);
    handleClose();
    onRefresh();
  }
  return (
    <div>
      <div style={{display:'flex'}}>
        {LoginInfo.CadidateCode ? <Button startIcon={<EditIcon/>} style={{marginLeft:'auto',marginBottom:10}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Viết Review
      </Button>:null}
      </div>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
          className='containerDialog'
        >
          <DialogContent>
            <Formik initialValues={initialValues}
               validationSchema={validationShema}
              onSubmit={values => submitData(values)}>
              {FormikProps => {
                const { values, errors, touched } = FormikProps;
                return (
                  <Form>
                    <h1 style={{paddingTop:0}}>Để lại Review của bạn</h1>
                    <FastField
                      name="TitleReview"
                      component={InputField}
                      label={res.TieuDe}
                      placeholder="Tiêu đề: Tóm tắt đánh giá của bạn.(Sếp tốt hoặc Nhân viên thân thiện"
                    />
                    <MyToastr></MyToastr>
                    <FastField
                      name="ILike"
                      component={TextAreaField}
                      label={res.DieuBanThich}
                      placeholder="Điều gì làm công ty này nổi bật? Ví dụ: Bãi đậu xe rộng rãi. Văn phòng đẹp tất cả đều được trang bị hàng Apple (Macbook, iMac)"
                    />
                    <FastField
                      name="Improve"
                      component={TextAreaField}
                      label={res.DeNghiCaiThien}
                      placeholder="Bạn nghĩ công ty cần cải thiện điều gì? Ví dụ: Khi có dự án thì OT hơi nhiều, áp lực, nên cần cải thiện khâu estimation. Họp và báo cáo nhiều gây mất thời gian, nên giảm các việc này."
                    />
                    <h6>Đánh giá tổng quát:</h6>
                    <Ratting value={valueStar} ChangeStar={setvalueStar} disable={true} size={50}></Ratting>
                    <div style={{display:'flex'}}>
                    <Button style={{marginLeft:'auto'}} startIcon={<SaveIcon/>} type="submit" variant="outlined" color="secondary">Để lại bình luận</Button>
                    </div>
                    
                  </Form>
                )
              }}
            </Formik>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
