
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Card, CardTitle, CardImage, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '@material-ui/lab/Pagination';
import { Button } from '@material-ui/core';
import ConstCommon from 'common/ConstInApp';
import RecruitmentManagerAPI from 'api/Recruitment/RecruitmentManager';
import { ChooseJob } from 'components/ListViewKendo/ListViewKendo2Slice';
//const IsAccess = useSelector(state => state.JobKendo);

const myHeader = () => {
    return (
        <ListViewHeader style={{  fontSize: 20,fontWeight:"bold",color: "#dfa579" ,borderBottomStyle: "groove"}} className='pl-4 pb-2 pt-2'>
            Ứng viên
        </ListViewHeader>
    );
}
const MyItemRender = props => {
    let item = props.dataItem;

    const history = useHistory();
    const HandleRedirectPage = (id) =>{
        const linkRedired = `/ProfilePage/${id}`;
        history.push(linkRedired);
        window.scrollTo(0, 150);
    }
    var parse = require('html-react-parser');

    return (
        <Card style={{ border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)'}} orientation='horizontal' className='d-flex justify-content-between'>
            <div className='k-vbox k-column'>
                <div >
                    <CardTitle style={{ fontSize: 18,fontWeight:"bold" }}>
                    {parse(item.fullName)}
                    </CardTitle>
                    <CardSubtitle style={{ fontSize: 12, marginTop: 0 }}>
                        {item.titleJob}
                    </CardSubtitle>
                </div>
                <br></br>
                <CardActions style={{ padding: 0 }}>
                    <Button onClick={()=>HandleRedirectPage(item.candidateCode)} 
                                variant="outlined" color="secondary">Xem chi tiết</Button>
                </CardActions>
            </div>
            <CardImage src={`${ConstCommon.LinkImage}${item.pathAvatar}`} style={{ width: 100, height: 100, maxWidth: 220 }} />
        </Card>
    )
}
function ListViewPotential(props) {
    const [data, setData] = useState( [ {
        "recID": "2",
        "candidateCode": "2",
        "pathAvatar": "2",
        "fullName": "Phan Đăng Vui",
        "titleJob":""
    },
    ]);
    const [page, setpage] = useState(1);
    // Số phần tử lấy.
    const [take, settake] = useState(2);
    // Phần tử bắt đầu lấy
    const [begin, setbegin] = useState(0);
    const dispatch = useDispatch();
    const handlePageChange = (e) => {
        setpage(parseInt(e.target.innerText));
        setbegin((parseInt(e.target.innerText)-1)*take);
    }
    useEffect(() => {
        async function fetchMyAPI() {
          const result = await RecruitmentManagerAPI.GetCandidatePotential();
          setData(result);
          const action = ChooseJob({ jobID: 1, IsAccess: true });
          var x = dispatch(action);
        }
        fetchMyAPI()
        
      }, []);
     
    return (
        <div>
               <div>
                <ListView
                    data={data.slice(begin,begin+take)}
                    item={MyItemRender}
                    style={{ width: "100%" }}
                    header={myHeader}
                />
                <Pagination style={{marginTop:3}} count={Math.round(data.length/take)} hideNextButton = {false} hidePrevButton={false} page={page} onChange={handlePageChange}  variant="outlined" color="secondary" />
            </div>
        </div>
    )
}
export default ListViewPotential
