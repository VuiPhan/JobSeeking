import TableRecruitment from 'components/TableRecruitment/TableRecruitment'
import React, { useEffect } from 'react'
import { useState } from 'react';
import RecruitmentManagerAPI from '../../api/Recruitment/RecruitmentManager';
function RecruitmentOfCandidatesPage() {
  const [lstCandidateOfProcess,setlstCandidateOfProcess]  = useState([])
     const fetchDataWorkProcess = async () => {
        // const action = GetWorkProcess(CandidateCode);
        // const result = await dispatch(action);
        const data = await RecruitmentManagerAPI.GetCandidateOfRoundRecruit(1058);
        console.log('datadata',data);
        setlstCandidateOfProcess(data);
    };
    useEffect(() => {
        fetchDataWorkProcess();
    }, [])

    const data = [
    {RoundName:'Vui nè',
     ListCandidate:[{
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
      },]
    },
    {RoundName:'Vẻ nè',
     ListCandidate:[{
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
      },]
    }
      ];
    return (
        <div>
            {lstCandidateOfProcess.map((item,index) => {
                console.log('objectitemitem',item);
             return ( <TableRecruitment key={index} dataSource={item}></TableRecruitment>)
            })}
            
        </div>
    )
}

export default RecruitmentOfCandidatesPage

