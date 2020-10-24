
import React from 'react';
import { ListView, ListViewHeader } from '@progress/kendo-react-listview';
import { Card, CardTitle} from '@progress/kendo-react-layout';
import { Pager } from '@progress/kendo-react-data-tools';

import articles from '../ListViewKendo/articles.json';
import LoadJobsAPI from '../../api/HomePageAPI'
import Ratting from '../Rating/Rating';
import '../../assets/scss/view/CompanyPage.scss';

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
                    <h1 className='HeaderContent'>{item.Title}</h1>
                    <Ratting value={item.star} size={25}></Ratting>
                    <h1 className='headerReview' >Điều tôi thích</h1>
                    <CardTitle className='paragraph'>
                        {item.ContentLike}
                        {item.ContentLike}
                        {item.ContentLike}
                        {item.ContentLike}
                    </CardTitle>
                    <h1 className='headerReview '>Đề nghị cải thiện</h1>
                    <CardTitle className='paragraph'>
                        {item.ContentImprove}
                    </CardTitle>
                </div>
            </div>
        </Card>
    )
}

class Comments extends React.Component {
    constructor(props){
        super();
        var dataArtical = [ {
            "Title": "How to design with love?",
            "ContentLike": "7 tips to fall in love with your job.7 tips to fall in love with your job.7 tips to fall in love with your job.7 tips to fall in love with your job.",
            "ContentImprove": "7 tips to fall in love with your job.",
            "Date": "Feb 24,  2020",
            "Image": "2-220x140.png",
            "star":4
        },
        {
            "Title": "How to design with love?",
            "ContentLike": "7 tips to fall in love with your job.",
            "ContentImprove": "7 tips to fall in love with your job.",
            "Date": "Feb 24,  2020",
            "Image": "2-220x140.png",
            "star":3
        }
    ];
        this.state = {data:dataArtical,skip: 0,
            take: 5};
    }
    async componentDidMount(){
        var x = await LoadJobsAPI.getAll();
        this.setState({data:x});

    }
    handlePageChange = (e) => {
        this.setState({
            skip: e.skip,
            take: e.take
        });
    }
    render() {
        const { skip, take } = this.state;

        return (
            <div>
                <ListView
                    data={this.state.data.slice(skip, skip + take)}
                    item={MyItemRender}
                    style={{ width: "100%" }}
                    header={myHeader}
                />
                <Pager skip={skip} take={take} onPageChange={this.handlePageChange} total={articles.length} />
            </div>
        );
    }
}
export default Comments;
