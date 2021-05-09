import React, { useEffect } from 'react'
import { FastField, Formik, Form as FormFormik } from 'formik';
import { Modal } from 'antd';
import * as yup from 'yup';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import { useDispatch, useSelector } from 'react-redux';
import SelectField from 'components/CustomField/SelectField';
import handleGetJson from 'common/ReadJson';
import TemplateEmailAPI from 'api/Recruitment/TemplateEmailAPI';
import DoneIcon from '@material-ui/icons/Done';
import Button from '@material-ui/core/Button';
import { Tooltip } from '@material-ui/core';
import { IsObjectEmpty } from 'common/CommonFunction';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Table, Tag } from 'antd';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import JobsApi from 'api/Company/JobsAPI';
import { useHistory } from 'react-router';
import { SelectedJob } from 'components/ListViewKendo/SelectedJobSlice';
import { ChooseJob } from 'components/ListViewKendo/ListViewKendo2Slice';


function NotificationOfRecruitForm(props) {
  const { visible, setVisible, widthForm } = props;
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [selectionType, setSelectionType] = useState('checkbox');
  const [lstCandidateSelected,setLstCandidateSelected] = React.useState('');
  const [dataRenderTable, setdataRenderTable] = React.useState([]);
  const [res, setRes] = React.useState({});
  const LoginInfo = useSelector(state => state.loginInfo);
  const dispatch = useDispatch();
  const history = useHistory();
  const LoadResource = async () => {
    const resource = await handleGetJson("NotificationOfRecruit", "RecruitmentPage");
    setRes(resource);
  }
  useEffect(() => {
    const data = [
      {key:'1',fullName:'Phan Đăng Vui',jobTitle:'Android Developer (Java, SQL)'},
      {}
    ]
    setdataRenderTable(data);
 
    LoadResource();
  }, [])
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
     setLstCandidateSelected(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.recID == "",
      // Column configuration not to be checked
      name: record.recID
    })
  };
  const handleOk = async (data,errors) => {
    if(IsObjectEmpty(errors)){
      MyToaStrError('');
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
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const AddComments = (key)=>{
    setVisible(false);
    const arr =  key.split(/_/);
    const JobID = arr[1];
    const CandidateCode = arr[0];
    debugger;
    const LinkToProfilePage = `/ProfilePage/${CandidateCode}`;
    const action = ChooseJob({ jobID: 1, IsAccess: true });
    var Exec = dispatch(action);
    history.push(LinkToProfilePage);
    window.scrollTo(0, 150);
  }
  const columns = [
    {
      key: 'recID',
      title: res.HoVaTen,
      dataIndex: 'fullName',
      render: text => <a>{text}</a>,
    },
    {
      key: 'recID',
      title: res.NgayUngTuyen,
      dataIndex: 'dateApply',
    },
    {
      key: 'recID',
      title: res.TenCongViec,
      dataIndex: 'jobsTitle',
      render: text => <a>{text}</a>,
    },
    {
      key: 'recID',
      title: res.TrangThai,
      dataIndex: 'isSeen',
      render: tags => (
        <span>
          <Tag color={tags == true ? "volcano" : "green"} key={tags}>
            {tags == true ? "Đã xem":"Mới"}
          </Tag>
        </span>
      ),
    },
    {
      key: 'recID',
      title: res.XemThongTin,
      dataIndex: 'key',
      render: (key) => (
        <ChatBubbleOutlineIcon onClick={() => AddComments(key)}></ChatBubbleOutlineIcon>
      ),
    },
  ];
  const GetApplicantForNotification = async () => {
    const lstApplicantForNotification = await JobsApi.GetApplicantForNotification();
    console.log('lstApplicantForNotification',lstApplicantForNotification);
    setdataRenderTable(lstApplicantForNotification);
  }
  useEffect(() => {
    GetApplicantForNotification()
  }, [LoginInfo])
  return (
    <div>
        <Modal
                title="Thông báo từ ứng viên"
                visible={visible}
            //    onOk={() => handleOk(values,errors)}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                width={widthForm}
              >
         <Table
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
        columns={columns}
        dataSource={dataRenderTable}
      />
        </Modal>
    </div>
  )
}
export default NotificationOfRecruitForm
