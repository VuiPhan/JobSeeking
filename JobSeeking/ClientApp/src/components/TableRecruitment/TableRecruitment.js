import React from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Radio, Space } from 'antd';
import { Button, Icon } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';


  
function TableRecruitment(props) {
    const {NameOfRound,dataSource} = props;
  console.log('dataSource.ListCandidate',dataSource.ListCandidate);
    const AddComments = (RecID) =>{
      console.log('RecIDRecID',RecID);
      alert(RecID);
    }
    const columns = [
        {
          title: 'Họ và tên',
          dataIndex: 'fullName',
          key: 'fullName',
          render: text => <a>{text}</a>,
        }
        // ,
        // {
        //   title: 'Ngày phỏng vấn',
        //   dataIndex: 'age',
        //   key: 'age',
        // },
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
        // {
        //   title: 'Nhận xét',
        //   key: 'age',
        //   dataIndex: 'age',
        //   render: (age) => (
        //      <ChatBubbleOutlineIcon onClick={()=> AddComments(age)}></ChatBubbleOutlineIcon> 
        //   ),
        // },
      ];
    return (
        <div>
          <h4>{dataSource[0].roundName}</h4>
        <Table
          columns={columns}
          //pagination={{ position: [this.state.top, this.state.bottom] }}
          dataSource={dataSource}
        />
      </div>
    )
}

export default TableRecruitment
