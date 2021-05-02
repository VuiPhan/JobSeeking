import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import CommonAPI from 'api/System/CommonAPI';
import Skeleton from 'react-loading-skeleton';
import ConstCommon from 'common/ConstInApp';
import Image1 from '../../assets/img/HeaderCompany/hinh1.jpg';
import Image2 from '../../assets/img/HeaderCompany/hinh2.jpg';
import Image3 from '../../assets/img/HeaderCompany/hinh3.jpg';
function HeaderCompany(props) {
    const {CompanyID,IsCompany} = props;
    const [data, setData] = useState({ companyName: '', TimeWorking: '', jobsTitle: '', jobDescriptions: 'a', jobRequirements: 'b', reasonsToJoin: 'c', loveWorkingHere: 'd' });
    useEffect(() => {
        async function fetchData(){
            const result = await CommonAPI.get(CompanyID,IsCompany);
            setData(result);
        }
        fetchData();
    },[CompanyID])
    return (
        <div>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={12}>
                    <div className="containerTitle">
                        <img src={`${ConstCommon.LinkImage}${data.imageLogo}`} alt="..." />
                        <div style={{paddingLeft: 21}}>
                            <h1 className="CompanyNameTitle">{data.companyName|| <Skeleton />}</h1>
                            <h5><LocationOnIcon  style={{fill: "#FE0000"}}></LocationOnIcon> {data.companyAddress}</h5>
                            <h5><AccessAlarmIcon  style={{fill: "#FF8203"}}></AccessAlarmIcon > {data.timeWorking}</h5>
                        </div>

                    </div>
                    <div className="containerImage">
                        <img src={Image1}></img>
                        <img src={Image2}></img>
                        <img src={Image3}></img>
                    </div>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default HeaderCompany
