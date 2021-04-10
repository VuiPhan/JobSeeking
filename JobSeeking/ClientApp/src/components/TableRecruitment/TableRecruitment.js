import React, { useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Radio, Space } from 'antd';
import { Button, Icon } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CandidateRecruitmentForm from './CandidateRecruitmentForm';

import MailOutlineIcon from '@material-ui/icons/MailOutline';
import './TableRecruitment.scss';
function TableRecruitment(props) {
  const { NameOfRound, dataSource } = props;
  // Filter data source with name null
  // var dataRenderTable =  dataSource.find(ele =>ele.recID !== null);
  const [dataRenderTable, setdataRenderTable] = React.useState([]);
  
  useEffect(() => {
var newArray = dataSource.filter(function (el) {
  return el.recID!== null
});
setdataRenderTable(newArray);

}, [dataSource])


  const [visible, setVisible] = React.useState(false);
  const [itemSelected, setitemSelected] = React.useState({});
  
  const showModal = () => {
    setVisible(true);
  };
  const AddComments = (RecID) => {
    let dataSelected =  dataSource.find(ele =>ele.recID === RecID);
    setitemSelected(dataSelected);
    setVisible(true);
  }
  const generateResult = (data)=>{
    let text = "";
    switch(data){
      case 1:
        text = "Đạt";
        break;
      case 2:
        text = "Không đạt";
        break
        case 3:
          text = "Hủy kết quả";
          break
      default:
        text = "Chưa phỏng vấn";
    }
    return text;
  }
  const columns = [
    {
      title: 'Họ và tên',
      dataIndex: 'fullName',
      key: 'fullName',
      render: text => <a>{text}</a>,
    }
    ,
    {
      title: 'Ngày phỏng vấn',
      dataIndex: 'dateInterview',
      key: 'dateInterview',
    },
    {
      title: 'Kết quả',
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
      title: 'Nhận xét',
      key: 'recID',
      dataIndex: 'recID',
      render: (recID) => (
        <ChatBubbleOutlineIcon onClick={() => AddComments(recID)}></ChatBubbleOutlineIcon>
      ),
    },
  ];

  return (
    <div>
      <div className="header__TableRecruitment">
        <div className="title_Recruit">
      <h4>{dataSource[0].roundName}</h4>
      </div>
      <div className="button_Recruit">
      <Button startIcon={<MailOutlineIcon />} color="secondary">Thông báo kết quả</Button>
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
