import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import { Button } from 'reactstrap';
import CommonAPI from 'api/System/CommonAPI';
import Skeleton from 'react-loading-skeleton';
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
                        <img src={`https://localhost:44351/Images/${data.imageLogo}`} alt="..." />
                        <div>
                            <h1 className="CompanyNameTitle">{data.companyName|| <Skeleton />}</h1>
                            <h5><LocationOnIcon></LocationOnIcon> {data.companyAddress}</h5>
                            <h5><AccessAlarmIcon></AccessAlarmIcon > {data.timeWorking}</h5>
                        </div>

                    </div>
                    <div className="containerImage">
                        <img src="https://cdn.itviec.com/photos/39011/jd_photo_thumbnail/jd_photo_thumbnail-1537273.jpg?TKHL8117CQAD1rE2g5Gp8G5J"></img>
                       
                        <img src="https://cdn.itviec.com/photos/39012/jd_photo_thumbnail/jd_photo_thumbnail-1537276.jpg?AuQcKevkfh3PeLopGrhReQfZ"></img>
                        <img src="https://cdn.itviec.com/photos/39013/jd_photo_thumbnail/jd_photo_thumbnail-1537274.jpg?pEASJFrheg44uQmxpgkhudc4"></img>

                    </div>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default HeaderCompany