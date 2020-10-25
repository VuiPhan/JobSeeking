import React, { useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Footer from "../components/Footer/Footer.js";
import GridContainer from "../components/Grid/GridContainer.js";
import GridItem from "../components/Grid/GridItem.js";

import styles from "../assets/jss/material-kit-react/views/CompanyPage.js";
import '../../src/assets/css/TitleCompany.scss';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import LGCompanyPage from "Language/CompanyPage";
import ListViewKendo from "components/ListViewKendo/ListViewKendo.js";
import JobsApi from "api/Company/JobsAPI.js";
import { useHistory, useParams } from "react-router-dom";
const useStyles = makeStyles(styles);

export default function JobsPage(props) {
  const classes = useStyles();
  const res = LGCompanyPage.JobPage;
  //LoadLanguageForPage();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  var parse = require('html-react-parser');
  const [data, setData] = useState({companyName:'' ,TimeWorking:'',jobsTitle: '', jobDescriptions: 'a', jobRequirements: 'b', reasonsToJoin: 'c', loveWorkingHere: 'd' });
  const history = useHistory();
  const { jobID } = useParams();
  useEffect(() => {
    async function fetchMyAPI() {
      const result = await JobsApi.get(jobID);
      setData(result[0]);
      console.log(result[0]);
    }
    fetchMyAPI()
  }, []);


  return (
    <div>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div className="containerTitle">
                  <img src={`https://localhost:44351/Images/${data.imageLogo}`} alt="..." />
                  <div>
                    <h1>{data.companyName}</h1>
                    <h5><LocationOnIcon></LocationOnIcon> {data.companyAddress}</h5>
                    <h5><AccessAlarmIcon></AccessAlarmIcon > {data.timeWorking}</h5>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div >
              <h3>{parse(data.jobsTitle)}</h3>
              <h3>
                {res.LyDoNenGiaNhap}
              </h3>
              <div>
                {parse(data.reasonsToJoin)}
              </div>
              <h3>
                {res.MoTaCongViec}
              </h3>
              <div>
                {parse(data.jobDescriptions)}
              </div>

              <h3>
                {res.YeuCauCongViec}
              </h3>
              <div>
                {parse(data.jobRequirements)}

              </div>
              <h3>
                {res.TaiSaoBanYeuThich}
              </h3>
              <div>
                {parse(data.loveWorkingHere)}
              </div>
              <h3>
                {res.ViecLamPhuHop}
              </h3>
              <ListViewKendo>

              </ListViewKendo>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
