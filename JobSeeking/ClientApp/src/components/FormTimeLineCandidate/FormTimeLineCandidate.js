import React, { useEffect } from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';
import { Modal } from 'antd';
import * as yup from 'yup';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import SelectField from 'components/CustomField/SelectField';
import handleGetJson from 'common/ReadJson';
import TemplateEmailAPI from 'api/Recruitment/TemplateEmailAPI';
import MyCKEditor from "components/CKEditor/CKEditor";
import Text from 'antd/lib/typography/Text';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import ReactSelectStatic from 'components/ReactSelectStatic/ReactSelectStatic';
import { Tooltip } from '@material-ui/core';
import { IsObjectEmpty } from 'common/CommonFunction';
import { Steps } from 'antd';
import SeekerAPI from 'api/JobSeeker/SeekerAPI';

const { Step } = Steps;

function FormTimeLineCandidate(props) {
  const { visible, setVisible, widthForm } = props;
  //const item ={isElect:true};
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const LoginInfo = useSelector(state => state.loginInfo);


  const [res, setRes] = React.useState({});
  const LoadResource = async () => {
    const resource = await handleGetJson("AppPage", "AppPage");
    setRes(resource);
  }
  const [lstTemplateEmail, setLstTemplateEmail] = React.useState([]);
  const [initialValues, setinitialValues] = React.useState({});
  const validationShema = yup.object().shape({
    subject: yup.string()
      .required(res.TruongBBNhap)
      .nullable()
    ,
    contentOfEmail: yup.string()
      .required(res.TruongBBNhap)
  });
  const GetTemplateEmail = async () => {
    const lstTemplate = await TemplateEmailAPI.getTemplateEmail();
    setinitialValues(lstTemplate[0]);
    setLstTemplateEmail(lstTemplate);
  }
  const GetTimelineCandidate = async () => {
      alert('vui');
    const timelineCandidateAPI = await SeekerAPI.GetTimelineCandidate();
  }
  useEffect(() => {
    LoadResource();
    GetTemplateEmail();
    GetTimelineCandidate();
  }, [])

//   useEffect(() => {
//     GetTimelineCandidate();
//   }, [LoginInfo])
  const UpdateItemWhenChangeTemplate = (TemplateID) => {
    debugger;
    const dataSelected = lstTemplateEmail.find(ele => ele.templateID === TemplateID);
    setinitialValues(dataSelected);
  }
  const dispatch = useDispatch();
  const SelectedJob = useSelector(state => state.SelectedJobProfile);
  const handleOk = async (data,errors) => {
    if(IsObjectEmpty(errors)){
      MyToaStrError(res.VuiLongKiemTraLaiThongTin);
      return;
    }
    const formData = new FormData();
    formData.append('RecID', data.recID == null ? 0 : data.recID);
    formData.append('TemplateID', data.templateID);
    formData.append('Subject', data.subject);
    formData.append('ContentOfEmail', data.contentOfEmail);
    const result = await TemplateEmailAPI.post(formData);
    setVisible(false);
    setConfirmLoading(false);
    MyToaStrSuccess(res.CapNhatThanhCong);
    await GetTemplateEmail();
  };
  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Formik initialValues={initialValues}
        validationSchema={validationShema}
        enableReinitialize>
        {FormikProps => {
          const { values, errors, touched } = FormikProps;
          console.log('errors',errors);
          return (
            <FormFormik>
              <Modal
                title={res.ThongTinThem}
                visible={visible}
                onOk={() => handleOk(values,errors)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={1000}
              >
                <div style={{ marginTop: 0 }}>
                <Steps >
    <Step title="Hoàn thành" description="Thông tin cá nhân" />
    <Step title="Hãy hoàn tất" description="Thông tin công việc" />
    <Step title="Hãy hoàn tất" description="Học vấn" />
    <Step title="Hãy hoàn tất"  status="finish" description="Quá trình làm việc" />
    <Step title="Hãy hoàn tất" status="finish" description="Thông tin CV" />
  </Steps>
                </div>
              </Modal>
            </FormFormik>
          )
        }}
      </Formik>
    </div>
  )
}
export default FormTimeLineCandidate
