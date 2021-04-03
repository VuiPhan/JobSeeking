import React from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';

import DatePickers from 'components/DatetimePicker/DatetimePicker';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import RecruitmentProcessForm from './RecruitmentProcessForm';
import ListRecruitmentProcess from './ListRecruitmentProcess';
import './style.scss';

function RecruitmentProcess() {

  const [visible, setVisible] = React.useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const initialValuesCV = { nameOfProcess: '', dayTakePlace: '2020-01-01', contentOfProcess: '' }
  const listCV = [{ recID: 1, nameOfProcess: 'Phỏng vấn qua điện thoại' }, { recID: 2, nameOfProcess: 'Làm bài test' }, { recID: 3, nameOfProcess: 'Phỏng vấn trực tiếp' }]
  return (
    <div>
    <div className="container__Recruitment">
      <div className="centerButton">
        <Button type="primary" onClick={showModal}>
          Thêm quy tình tuyển dụng
      </Button>
      </div>
      <br></br>
      </div>
      
      <div>
        <RecruitmentProcessForm visible={visible} setVisible={setVisible} initialValuesCV={initialValuesCV}></RecruitmentProcessForm>
        <ListRecruitmentProcess data={listCV}></ListRecruitmentProcess>
      </div>
   
    </div>
  )
}

export default RecruitmentProcess
