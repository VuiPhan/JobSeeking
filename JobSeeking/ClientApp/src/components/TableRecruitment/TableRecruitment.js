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
    let candidateCode = RecID;
    let dataSelected =  dataSource.find(ele =>ele.candidateCode ==candidateCode);
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
      dataIndex: 'roundInterview',
      key: 'roundInterview',
    }
    // {
    //   title: 'Kết quả',
    //   key: 'tags',
    //   dataIndex: 'tags',
    //   render: tags => (
    //     <span>
    //       {tags.map(tag => {
    //         let color = tag.length > 5 ? 'geekblue' : 'green';
    //         if (tag === 'Không đạt') {
    //           color = 'volcano';
    //         }
    //         return (
    //           <Tag color={color} key={tag}>
    //             {tag.toUpperCase()}
    //           </Tag>
    //         );
    //       })}
    //     </span>
    //   ),
    // },
    ,
    {
      title: 'Nhận xét',
      key: 'candidateCode',
      dataIndex: 'candidateCode',
      render: (candidateCode) => (
        <ChatBubbleOutlineIcon onClick={() => AddComments(candidateCode)}></ChatBubbleOutlineIcon>
      ),
    },
  ];

  return (
    <div>
      <h4>{dataSource[0].roundName}</h4>
      <Table
        columns={columns}
        //pagination={{ position: [this.state.top, this.state.bottom] }}
        dataSource={dataSource}
      />
      <CandidateRecruitmentForm item={itemSelected} visible={visible} setVisible={setVisible}></CandidateRecruitmentForm>

    </div>
  )
}

export default TableRecruitment
