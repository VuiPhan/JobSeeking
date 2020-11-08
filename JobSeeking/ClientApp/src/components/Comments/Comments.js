
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Card, CardTitle, CardImage, CardSubtitle, CardActions } from '@progress/kendo-react-layout';
import { Pager } from '@progress/kendo-react-data-tools';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import LoadJobsApi from 'api/HomePageAPI';
import Ratting from 'components/Rating/Rating';
import CompanyAPI from 'api/Company/CompanyAPI';


const myHeader = () => {
    return (
        <ListViewHeader style={{ color: 'rgb(160, 160, 160)', fontSize: 14 }} className='pl-4 pb-2 pt-2'>
            Những Review đánh giá
        </ListViewHeader>
    );
}

const MyItemRender = props => {
    let item = props.dataItem;
    return (
        <Card style={{ padding: '20px 24px', border: 'none', borderBottom: '1px solid rgba(0,0,0,0.12)', }} orientation='horizontal' className='d-flex justify-content-between'>
            <div className='k-vbox k-column company-container'>
                <div style={{ padding: '0 8px', marginRight: '3rem' }}>
                    <h1 className='HeaderContent'>{item.titleReview}</h1>
                    <Ratting key={item.recID} value={item.star} size={25}></Ratting>
                    <h1 className='headerReview' >Điều tôi thích</h1>
                    <CardTitle className='paragraph'>
                        {item.iLike}
                    </CardTitle>
                    <h1 className='headerReview '>Đề nghị cải thiện</h1>
                    <CardTitle className='paragraph'>
                        {item.improve}
                    </CardTitle>
                </div>
            </div>
        </Card>
    )
}
function Comments(props) {
    const {dataID} = props;
    const [data, setData] = useState( [ {
        "titleReview": "How to design with love?",
        "iLike": "7 tips to fall in love with your job.7 tips to fall in love with your job.7 tips to fall in love with your job.7 tips to fall in love with your job.",
        "improve": "7 tips to fall in love with your job.",
        "Date": "Feb 24,  2020",
        "Image": "2-220x140.png",
    },
    {
        "titleReview": "How to design with love?",
        "ContentLike": "7 tips to fall in love with your job.",
        "ContentImprove": "7 tips to fall in love with your job.",
        "Date": "Feb 24,  2020",
        "Image": "2-220x140.png",
    }
]);
    const [skip, setskip] = useState(0);
    const [take, settake] = useState(2);
    const handlePageChange = (e) => {
        setskip(e.skip);
        settake(e.take);
    }
    useEffect(() => {
        async function fetchMyAPI() {
          const result = await CompanyAPI.getReview(dataID);
          debugger;
          setData(result);
        }
        fetchMyAPI()
      }, [dataID]);
     
    return (
        <div>
               <div>
                <ListView
                    data={data.slice(skip, skip + take)}
                    item={MyItemRender}
                    style={{ width: "100%" }}
                    header={myHeader}
                />
                <Pager skip={skip} take={take}  onPageChange={handlePageChange} total={data.length} />
            </div>
        </div>
    )
}
export default Comments;
