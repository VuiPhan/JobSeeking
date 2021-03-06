import React, { useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import WorkIcon from '@material-ui/icons/Work';
import SchoolIcon from '@material-ui/icons/School';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import NavPills from "components/NavPills/NavPills";
import RecruitmentProcess from "./RecruitmentProcess";
import RecruitmentOfCandidatesPage from "views/RecruitmentOfCandidates/RecruitmentOfCandidatesPage";
import ListViewCandidate from "components/ListViewCandidate/ListViewCandidate";
import { useSelector } from "react-redux";
import MyToastr from "components/Toastr/Toastr";
import handleGetJson from "common/ReadJson";
import { Button } from "@material-ui/core";
import ListViewPotential from "components/ListViewPotential/ListViewPotential";

const useStyles = makeStyles(null);

export default function RecruitmentManagementPage(props) {
  const classes = useStyles();
  const SelectedJob = useSelector(state => state.SelectedJob);
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
                        <ListViewPotential></ListViewPotential>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
        </div>
  );
}
