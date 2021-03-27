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

const useStyles = makeStyles(null);

export default function RecruitmentManagementPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
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
                       <RecruitmentProcess></RecruitmentProcess>
                      )
                    },
                    {
                      tabButton: "Quá trình tuyển dụng",
                      tabIcon: WorkIcon,
                      tabContent: (
                       <Button></Button>
                      )
                    },
                    {
                      tabButton: "Ứng viên tiềm năng",
                      tabIcon: SchoolIcon,
                      tabContent: (

                        <Button></Button>

                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
        </div>
  );
}
