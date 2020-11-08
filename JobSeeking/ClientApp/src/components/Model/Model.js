import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import InputField from 'components/CustomField/InputField';
import { FastField, Formik, Form } from 'formik';

import React from 'react';
import '../Model/Model.scss';
import * as yup from 'yup';
import LGCompanyPage from "Language/CompanyPage";
import CompanyAPI from 'api/Company/CompanyAPI';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const res = LGCompanyPage.CompanyPage;

  const handleClose = () => {
    setOpen(false);
  };
  const initialValues = {
    TitleReview: '',
    Improve: '',
    ILike: '',
    Star: ''

  };
  const validationShema = yup.object().shape({
    Email: yup.string().email().required(res.TruongBBNhap),
    Password: yup.string()
      .required(res.TruongBBNhap)
    ,
  })
  const submitData = async (values) => {
    const formData = new FormData();
    formData.append('TitleReview', values.TitleReview);
    formData.append('TitleReview', values.TitleReview);
    formData.append('TitleReview', values.TitleReview);
    formData.append('Improve', values.Improve);
    formData.append('ILike', values.ILike);
    formData.append('Star', values.Star);
    
    let result = await CompanyAPI.addReview(formData);


  }
  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Viết Review
      </Button>
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
            // validationSchema={validationShema}
            onSubmit={values => submitData(values)}>
            {FormikProps => {
              const { values, errors, touched } = FormikProps;
              console.log('valuevalue',values);
              return (
                <Form>
                  <h1>Để lại Review của bạn</h1>
                  <FastField
                    name="TitleReview"
                    component={InputField}
                    label={res.TieuDe}
                    placeholder={res.TieuDe}
                  />

                  <FastField
                    name="ILike"
                    component={InputField}
                    label={res.DieuBanThich}
                    placeholder={res.DieuBanThich}
                  />
                  <FastField
                    name="Improve"
                    component={InputField}
                    label={res.DeNghiCaiThien}
                    placeholder={res.DeNghiCaiThien}
                  />
                  <Button type="submit" variant="outlined" color="primary">Để lại bình luận</Button>
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
