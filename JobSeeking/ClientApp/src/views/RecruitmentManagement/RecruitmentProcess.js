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
  const [visibleButtonAdd, setVisibleButtonAdd] = React.useState(false);
  const [item, setItem] = React.useState({
    jobID: 1,
    roundName: '',
    dateInterview: '2021-01-01',
    contentInterview: '',
  });
  const [lstRecruitProcess,setLstRecruitProcess] = React.useState([]);
  const showModal = () => {
    setItem({
      jobID: 1,
      roundName: '',
      dateInterview: '2021-01-01',
      contentInterview: '',
    });
    setVisible(true);
  };
  const SelectedJob = useSelector(state => state.SelectedJobProfile);
  const ListRecruitProcess = useSelector(state => state.ListRecruitProcess);
  const dispatch = useDispatch();
  async function fetchDataView() {
    debugger;
    if(SelectedJob){
      setVisibleButtonAdd(true);
    }
    const action = GetListRecruitProcess(SelectedJob);
    const execaction = await dispatch(action);
  }
  useEffect(() => {
    fetchDataView();
  }, [SelectedJob])
  return (
    <div>
    <div className="container__Recruitment">
      <div className="centerButton">
        {visibleButtonAdd ? <Button type="primary" onClick={showModal} visible={visibleButtonAdd}>
          Thêm quy trình tuyển dụng
      </Button> : null}
      </div>
      <br></br>
      </div>
      <div>
        <RecruitmentProcessForm visible={visible} setVisible={setVisible} item={item}></RecruitmentProcessForm>
        <ListRecruitmentProcess data={ListRecruitProcess} setVisible={setVisible} setItem={setItem}></ListRecruitmentProcess>
      </div>
   
    </div>
  )
}

export default RecruitmentProcess
