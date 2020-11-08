
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Card, CardTitle, CardImage, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import { Pager } from '@progress/kendo-react-data-tools';
import './styleListView.scss';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LoadJobsApi from 'api/HomePageAPI';

const myHeader = () => {
    return (
        <ListViewHeader style={{ color: 'rgb(160, 160, 160)', fontSize: 14 }} className='pl-4 pb-2 pt-2'>
            Những công việc nỗi bật trong tuần
        </ListViewHeader>
    );
}
const MyItemRender = props => {
    let item = props.dataItem;
    var parse = require('html-react-parser');
    const history = useHistory();
    const HandleRedirectPage = (id) =>{
        debugger;
        const linkRedired = `/Jobs/${id}`;
        history.push(linkRedired);
        window.scrollTo(0, 150);
    }
    return (
        <Card style={{ padding: '20px 24px', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)', }} orientation='horizontal' className='d-flex justify-content-between'>
            <div className='k-vbox k-column'>
                <div style={{ padding: '0 8px', marginRight: '3rem' }}>
                    <CardTitle style={{ fontSize: 18 }}>
                        {item.jobsTitle}
                    </CardTitle>
                    <CardSubtitle style={{ fontSize: 14, marginTop: 0 }}>
                        {item.companyName}
                    </CardSubtitle>
                    <CardSubtitle style={{ fontSize: 12 }}>
                    {parse(item.jobRequirements)}
                    </CardSubtitle>
                </div>
                <CardActions style={{ padding: 0 }}>
                    <button onClick={() =>HandleRedirectPage(item.jobId)} className='k-button k-bare'>Xem chi tiết</button>
                    <button className='k-button k-bare'>Thêm vào yêu thích</button>
                </CardActions>
            </div>
            <CardImage src={`https://gist.github.com/simonssspirit/0db46d4292ea8e335eb18544718e2624/raw/2241c020d6d494eaba0ef61862d92b19ef95cbf4/${item.Image}`} style={{ width: 220, height: 140, maxWidth: 220 }} />
        </Card>
    )
}
function ListViewKendo2(props) {
    const {dataID} = props;
    const [data, setData] = useState( [ {
        "Title": "How to design with love?",
        "Subtitle": "7 tips to fall in love with your job.",
        "Date": "Feb 24,  2020",
        "Image": "2-220x140.png",
        "jobRequirements": "<p><i>Hybrid Technologies là công ty công nghệ phần mềm liên doanh Nhật-Việt, cung cấp các dịch vụ và mô hình làm việc đa dạng như Mô hình Hybrid, Mô hình Ủy thác, hay lĩnh vực Trí tuệ nhân tạo (AI).</i></p>"
    }]);
    useEffect(() => {
        async function fetchMyAPI() {
          const result = await LoadJobsApi.getAll(dataID);
          debugger;
          setData(result);
        }
        fetchMyAPI()
      }, [dataID]);
     
    return (
        <div>
               <div>
                <ListView
                    data={data}
                    item={MyItemRender}
                    style={{ width: "100%" }}
                    header={myHeader}
                />
                <Pager skip={1} take={1} />
            </div>
        </div>
    )
}

export default ListViewKendo2
