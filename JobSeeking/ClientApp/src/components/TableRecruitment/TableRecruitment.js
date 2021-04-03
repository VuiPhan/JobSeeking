import React from 'react';
import 'antd/dist/antd.css';
import { Table, Tag, Radio, Space } from 'antd';
import { Button, Icon } from '@material-ui/core';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';


  
function TableRecruitment(props) {
    const {NameOfRound} = props;
    const AddComments = (RecID) =>{
      console.log('RecIDRecID',RecID);
      alert(RecID);
    }
    const columns = [
        {
          title: 'Họ và tên',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Ngày phỏng vấn',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Kết quả',
          key: 'tags',
          dataIndex: 'tags',
          render: tags => (
            <span>
              {tags.map(tag => {
                let color = tag.length > 5 ? 'geekblue' : 'green';
                if (tag === 'Không đạt') {
                  color = 'volcano';
                }
                return (
                  <Tag color={color} key={tag}>
                    {tag.toUpperCase()}
                  </Tag>
                );
              })}
            </span>
          ),
        },
        {
          title: 'Nhận xét',
          key: 'age',
          dataIndex: 'age',
          render: (age) => (
             <ChatBubbleOutlineIcon onClick={()=> AddComments(age)}></ChatBubbleOutlineIcon> 
          ),
        },
      ];
      
      const data = [
        {
          key: '1',
          name: 'Phan Đăng Vui',
          age: '20/03/2020',
          address: 'New York No. 1 Lake Park',
          tags: ['Đạt', 'developer'],
        },
        {
          key: '2',
          name: 'Trần Hoàng Huy',
          age: '20/03/2020',
          address: 'London No. 1 Lake Park',
          tags: ['Không đạt'],
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
          tags: ['cool', 'teacher'],
        },
      ];
    return (
        <div>
          <h4>{NameOfRound}</h4>
        <Table
          columns={columns}
          //pagination={{ position: [this.state.top, this.state.bottom] }}
          dataSource={data}
        />
      </div>
    )
}

export default TableRecruitment
