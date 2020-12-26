import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../../components/Footer/Footer.js";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import { useParams } from "react-router-dom";
import ListViewKendoForSearch from "components/ListViewKendo/ListViewKendoForSearch.js";
import ListViewKendoForApply from "components/ListViewKendo/ListViewKendoForApply.js";


const useStyles = makeStyles(styles);

export default function ApplyPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const { Tag,tagID } = useParams();
  console.log('Tag,tagID',Tag,tagID);
  return (
    <div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <div className={classes.description}>
            </div>
            <ListViewKendoForApply dataID = {-1}></ListViewKendoForApply>
          </div>
   
        </div>
      </div>
      <Footer />
    </div>
  );
}
