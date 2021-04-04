import React, { useEffect } from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';

import DatePickers from 'components/DatetimePicker/DatetimePicker';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';
import RecruitmentProcessForm from './RecruitmentProcessForm';
import ListRecruitmentProcess from './ListRecruitmentProcess';
import './style.scss';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { useDispatch, useSelector } from 'react-redux';
import { GetListRecruitProcess } from './ListRecruitmentSlicer';

function RecruitmentProcess(props) {
  const {JobID} = props;

  const [visible, setVisible] = React.useState(false);
  const [lstRecruitProcess,setLstRecruitProcess] = React.useState([]);
  const showModal = () => {
    setVisible(true);
  };
  const SelectedJob = useSelector(state => state.SelectedJobProfile);
  const ListRecruitProcess = useSelector(state => state.ListRecruitProcess);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchDataView() {
      // const result = await RecruitmentManagerAPI.GetRoundRecruit(SelectedJob);
      // setLstRecruitProcess(result);
      const action = GetListRecruitProcess(SelectedJob);
      const execaction = await dispatch(action);
    }
    fetchDataView();
  }, [SelectedJob])
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
        <RecruitmentProcessForm visible={visible} setVisible={setVisible}></RecruitmentProcessForm>
        <ListRecruitmentProcess data={ListRecruitProcess}></ListRecruitmentProcess>
      </div>
   
    </div>
  )
}

export default RecruitmentProcess
