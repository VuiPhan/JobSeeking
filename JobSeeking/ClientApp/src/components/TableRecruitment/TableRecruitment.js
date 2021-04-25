import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Radio, Space } from 'antd';
import { Button, Icon } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CandidateRecruitmentForm from './CandidateRecruitmentForm';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './TableRecruitment.scss';
import { MyToaStrError, MyToaStrSuccess } from 'components/Toastr/Toastr2';
import handleGetJson from 'common/ReadJson.js';
import { confirmAlert } from 'react-confirm-alert';
function TableRecruitment(props) {
  const { NameOfRound, dataSource } = props;
  const [dataRenderTable, setdataRenderTable] = React.useState([]);
   const [res, setRes] = React.useState({});
   const LoadResource = async () =>{
    const resource = await handleGetJson("RecruitmentPage","RecruitmentPage");
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
  }, [dataSource])


  const [visible, setVisible] = React.useState(false);
  const [itemSelected, setitemSelected] = React.useState({fullName:'',dateInterview:'',result:null,descriptions:'',isElect:false});

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
      case 1:
        text = res.Dat;
        break;
      case 2:
        text = res.KhongDat;
        break
      case 3:
        text = res.HuyKQ;
        break
      default:
        text = res.ChuaPV;
    }
    return text;
  }
  const columns = [
    {
      title: res.HoVaTen,
      dataIndex: 'fullName',
      key: 'fullName',
      render: text => <a>{text}</a>,
    }
    ,
    {
      title: res.NgayPV,
      dataIndex: 'dateInterview',
      key: 'dateInterview',
    },
    {
      title: res.KetQua,
      key: 'result',
      dataIndex: 'result',
      render: tags => (
        <span>
          <Tag color={tags == "1" ? "green" : "volcano"} key={tags}>
            {generateResult(tags)}
          </Tag>
        </span>
      ),
    },
    {
      title: res.NhanXet,
      key: 'recID',
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
            const result = await RecruitmentManagerAPI.SendNotificationToApplicant(JobID, RoundInterview);
            if (result.error === "") {
              MyToaStrSuccess(res.DaGuiThongBao);
            }
            else {
              MyToaStrError(res.KhongTonTaiUV);
            }
            return;
          }
        }
      ]
    });
    
  }
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
        columns={columns}
        dataSource={dataRenderTable}
      />
      <CandidateRecruitmentForm item={itemSelected} visible={visible} setVisible={setVisible}></CandidateRecruitmentForm>
    </div>
  )
}

export default TableRecruitment
