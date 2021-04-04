import React, { useEffect, useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import { Button } from "@material-ui/core";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills";
import RecruitmentProcess from "./RecruitmentProcess";
import RecruitmentOfCandidatesPage from "views/RecruitmentOfCandidates/RecruitmentOfCandidatesPage";
import ListViewCandidate from "components/ListViewCandidate/ListViewCandidate";
import { useSelector } from "react-redux";

const useStyles = makeStyles(null);

export default function RecruitmentManagementPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const SelectedJob = useSelector(state => state.SelectedJob);
  useEffect(() => {
    async function fetchDataView() {
      //const result = await SeekerAPI.getByRecruiter(SelectedJob);
      //setData(result);
    }
    fetchDataView();
  }, [SelectedJob])

  return (
    <div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Quy trình tuyển dụng",
                      tabIcon: Camera,
                      tabContent: (
                       <RecruitmentProcess JobID = {SelectedJob}></RecruitmentProcess>
                      )
                    },
                    {
                      tabButton: "Quá trình tuyển dụng",
                      tabIcon: WorkIcon,
                      tabContent: (
                       <RecruitmentOfCandidatesPage JobID = {SelectedJob}></RecruitmentOfCandidatesPage>
                      )
                    },
                    {
                      tabButton: "Ứng viên tiềm năng",
                      tabIcon: SchoolIcon,
                      tabContent: (

                        <ListViewCandidate></ListViewCandidate>

                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
        </div>
  );
}
