import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Radio, Space,Divider } from 'antd';
import { Button, Icon } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CandidateRecruitmentForm from './CandidateRecruitmentForm';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './TableRecruitment.scss';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import handleGetJson from 'common/ReadJson.js';
import { confirmAlert } from 'react-confirm-alert';
import { useState } from 'react';
function TableRecruitment(props) {
  const { NameOfRound, dataSource } = props;
  const [dataRenderTable, setdataRenderTable] = React.useState([]);
  const [res, setRes] = React.useState({});
  const [lstCandidateSelected,setLstCandidateSelected] = React.useState('');
  const passInterview  = "2";
  const isElect  = "4";
  const LoadResource = async () => {
    const resource = await handleGetJson("RecruitmentPage", "RecruitmentPage");
    setRes(resource);
  }
  useEffect(() => {
    LoadResource();
  }, [dataSource])
  useEffect(() => {
    var newArray = dataSource.filter(function (el) {
      return el.recID !== null
    });
    setdataRenderTable(newArray);
    console.log('newArray',newArray);
  }, [dataSource])


  const [visible, setVisible] = React.useState(false);
  const [itemSelected, setitemSelected] = React.useState({ fullName: '', dateInterview: '', result: null, descriptions: '', isElect: false });

  const showModal = () => {
    setVisible(true);
  };
  const AddComments = (RecID) => {
    let dataSelected = dataSource.find(ele => ele.recID === RecID);
    setitemSelected(dataSelected);
    setVisible(true);
  }
  const generateResult = (data) => {
    let text = "";
    switch (data) {
      case 2:
        text = res.Dat;
        break;
      case 3:
        text = res.KhongDat;
        break
      case 4:
        text = res.TrungTuyen;
        break
      case 5:
        text = res.KhongPV;
        break
      default:
        text = res.ChuaPV;
    }
    return text;
  }
  const columns = [
    {
      key: 'recID',
      title: res.HoVaTen,
      dataIndex: 'fullName',
      render: text => <a>{text}</a>,
    }
    ,
    {
      key: 'recID',
      title: res.NgayPV,
      dataIndex: 'dateInterview',
      render: text => <a>{text.substring(0, 10)}</a>,
    },
    {
      key: 'recID',
      title: res.KetQua,
      dataIndex: 'result',
      render: tags => (
        <span>
          <Tag color={(tags == passInterview || tags == isElect)? "green" : "volcano"} key={tags}>
            {generateResult(tags)}
          </Tag>
        </span>
      ),
    },
    {
      key: 'recID',
      title: res.NhanXet,
      dataIndex: 'recID',
      render: (recID) => (
        <ChatBubbleOutlineIcon onClick={() => AddComments(recID)}></ChatBubbleOutlineIcon>
      ),
    },
  ];

  const NotificationToCandidates = async (JobID, RoundInterview) => {
    confirmAlert({
      title: 'Thông báo cho ứng viên',
      message: 'Hệ thống sẽ gửi email thông báo kết quả đến các ứng viên đã phỏng vấn theo Email đã được soạn sẵn.',
      buttons: [
        {
          label: 'Đóng',
          onClick: () => { }
        },
        {
          label: 'Thông báo cho ứng viên',
          onClick: async () => {
            if(lstCandidateSelected ===""){
              MyToaStrError(res.VuiLongChonUngVien);
              return;
            }
            const result = await RecruitmentManagerAPI.SendNotificationToApplicant(JobID, RoundInterview,lstCandidateSelected);
            if (result.error === "") {
              MyToaStrSuccess(res.DaGuiThongBao);
            }
            else {
              MyToaStrError(res.KhongThanhCong);
            }
            return;
          }
        }
      ]
    });

  }
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
     setLstCandidateSelected(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.recID == "",
      // Column configuration not to be checked
      name: record.recID
    })
  };
  const [selectionType, setSelectionType] = useState('checkbox');
  return (
    <div>
      <div className="header__TableRecruitment">
        <div className="title_Recruit">
          <h4>{dataSource[0].roundName}</h4>
        </div>
        <div className="button_Recruit">
          <Button startIcon={<MailOutlineIcon />} onClick={() => { NotificationToCandidates(dataSource[0].jobID, dataSource[0].roundInterview) }} color="secondary">{res.TBKetQua}</Button>
        </div>
      </div>
      <Table
      rowSelection={{
        type: selectionType,
        ...rowSelection,
      }}
        columns={columns}
        dataSource={dataRenderTable}
        pagination={{ defaultPageSize: 5, showSizeChanger: true, pageSizeOptions: ['5', '10', '15','20']}}
      />
      <CandidateRecruitmentForm item={itemSelected} visible={visible} setVisible={setVisible}></CandidateRecruitmentForm>
    </div>
  )
}

export default TableRecruitment
