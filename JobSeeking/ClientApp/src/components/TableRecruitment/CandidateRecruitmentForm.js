import React, { useEffect } from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import InputField from 'components/CustomField/InputField';

import DatePickers from 'components/DatetimePicker/DatetimePicker';
import { Modal } from 'antd';
import * as yup from 'yup';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import { GetListRecruitProcess } from 'views/RecruitmentManagement/ListRecruitmentSlicer';
import SelectField from 'components/CustomField/SelectField';
import { GetListCandidateProcess } from 'views/RecruitmentOfCandidates/RecruitmentOfCandidatesSlicer';
//import SwitchLabels from 'components/Checkbox/Checkbox';
import SwitchLabels from "components/Checkbox/Checkbox";
import handleGetJson from 'common/ReadJson';
import DateAndTimePicker from 'components/DatetimePicker/DateAndTimePicker';
import { Button, Tooltip } from 'antd';
import { CloseCircleOutlined,SaveOutlined,SafetyCertificateOutlined,LikeOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
import RecruitmentProfileAPI from 'api/Recruitment/RecruitmentProfile';
import { confirmAlert } from 'react-confirm-alert';

function CandidateRecruitmentForm(props) {
  const { item, visible, setVisible } = props;
  //const item ={isElect:true};
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [visibleTotalIncome, setVisibleTotalIncome] = React.useState(false);
  const history = useHistory();
  const [res, setRes] = React.useState({});
  const validationShema = yup.object().shape({
  totalIncome: yup.number()
  .typeError("Đây phải là 1 số")
  .required("Trường bắt buộc nhập")
  });
  const LoadResource = async () => {
    const resource = await handleGetJson("RecruitmentForm", "RecruitmentPage");
    const resourceCommon = await handleGetJson("Notification", "LanguageInApp");
    const resourceFinal = { ...resource, ...resourceCommon };
    setRes(resourceFinal);
  }
  useEffect(() => {
    LoadResource();
  }, [])
  const [initialValues, setinitialValues] = React.useState();
  useEffect(() => {
      setinitialValues(item);
      if(item.result === 4){
        setVisibleTotalIncome(true);
        return;
      }
      setVisibleTotalIncome(false);
  }, [item])
  const dispatch = useDispatch();
  const SelectedJob = useSelector(state => state.SelectedJobProfile);
  const handleOk = async (data) => {
    const formData = new FormData();
    formData.append('DateInterview', data.dateInterview);
    formData.append('Result', data.result);
    formData.append('Descriptions', data.descriptions);
    formData.append('RecID', initialValues.recID);
    debugger;
    formData.append('TotalIncome', data.totalIncome ? data.totalIncome: 0);
    const result = await RecruitmentManagerAPI.UpdateResultOfCandidate(formData);
    if(result.error !== ""){
      MyToaStrError(result.error);  
      return;
    }
    setVisible(false);
    setConfirmLoading(false);
    const action = GetListCandidateProcess(SelectedJob);
    const result2 = await dispatch(action);
    setinitialValues({});
    MyToaStrSuccess(res.CapNhatThanhCong);
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const changeComboboxWhenElect = (data) =>{
    if(data===4){
      setVisibleTotalIncome(true);
      return;
    }
    setVisibleTotalIncome(false);
  }
  const Marginbutton ={
    marginLeft:6
  };
  const redirectPageCandidate = (data) =>{
    const linkRedired = `/ProfilePage/${data}`;
    history.push(linkRedired);
    window.scrollTo(0, 150);
  }
  const HandlePotentialCandidates = async (CandidateCode) =>{
    const result = await RecruitmentProfileAPI.AddPotentialCandidates(CandidateCode);
    if (result.error === "") {
    MyToaStrSuccess('Đã đưa ứng viên vào danh sách ứng viên tiềm năng');
    }
    else{
      MyToaStrError('Ứng viên đã ở trong ứng viên tiềm năng');
    }
    return;
}
  return (
    <div>
      <Formik initialValues={initialValues}
        validationSchema={validationShema}
        onSubmit={values => console.log(values)}
        enableReinitialize>
        {FormikProps => {
          const { values, errors, touched } = FormikProps;
          return (
            <FormFormik>
              <Modal
                title={res.KQPhongVan}
                visible={visible}
                confirmLoading={confirmLoading}
                footer={[
                  <Tooltip title="Ứng viên tiềm năng">
                  <Button key="1" onClick={() => HandlePotentialCandidates(values.candidateCode)} icon={<LikeOutlined />} style={Marginbutton}></Button>
                  </Tooltip>,
                  <Tooltip title="Đến trang ứng viên">
                  <Button key="2" icon={<SafetyCertificateOutlined />} style={Marginbutton}  onClick={() => redirectPageCandidate(values.candidateCode)}></Button>
                  </Tooltip>,
                  <Button key="3" icon={<SaveOutlined />} type="primary" onClick={() => handleOk(values)} style={Marginbutton}>
                    Lưu
                  </Button>,
                  <Button key="4" icon={<CloseCircleOutlined />} onClick={handleCancel} style={Marginbutton}>
                  Đóng
                </Button>
                ]}
              >
                <FastField
                  name="fullName"
                  component={InputField}
                  label={res.TenUV}
                  disabled={true}
                  placeholder={res.MoiBanNhapTT}
                />
                <FastField
                  name="dateInterview"
                  //component={DatePickers}
                  component={DateAndTimePicker}
                  
                  label={res.NgayDienRa}
                  placeholder=""
                />
                <div style={{ marginTop: 10 }}>
                  <FastField
                    name="result"
                    component={SelectField}
                    HandleOnChange={changeComboboxWhenElect}
                    label={res.KetQua}
                    ListName="Recruit.ResultInterView" />
                </div>
                <FastField
                  name="descriptions"
                  component={InputField}
                  type="textarea"
                  label={res.MoTaThem}
                  placeholder={res.MoiBanNhapTT}
                />
                {visibleTotalIncome? <FastField
                  name="totalIncome"
                  component={InputField}
                  visible={false}
                  label={res.TongLuong}
                  placeholder={res.MoiBanNhapTT}
                /> : null}
              </Modal>
            </FormFormik>
          )
        }}
      </Formik>
    </div>
  )
}
export default CandidateRecruitmentForm
