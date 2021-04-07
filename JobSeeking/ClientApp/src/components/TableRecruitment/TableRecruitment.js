import React from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Radio, Space } from 'antd';
import { Button, Icon } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import CandidateRecruitmentForm from './CandidateRecruitmentForm';



function TableRecruitment(props) {
  const { NameOfRound, dataSource } = props;

  const [visible, setVisible] = React.useState(false);
  const [itemSelected, setitemSelected] = React.useState({});
  
  const showModal = () => {
    setVisible(true);
  };
  const AddComments = (RecID) => {
    let dataSelected =  dataSource.find(ele =>ele.recID ==RecID);
    setitemSelected(dataSelected);
    setVisible(true);
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
          {tags == "1" ? "Đạt" : "Không đạt"}
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
      <h4>{dataSource[0].roundName}</h4>
      <Table
        columns={columns}
        dataSource={dataSource}
      />
      <CandidateRecruitmentForm item={itemSelected} visible={visible} setVisible={setVisible}></CandidateRecruitmentForm>
    </div>
  )
}

export default TableRecruitment
