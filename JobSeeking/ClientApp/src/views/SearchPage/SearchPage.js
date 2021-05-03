import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../../components/Footer/Footer.js";
import styles from "../../assets/jss/material-kit-react/views/profilePage.js";
import { useParams } from "react-router-dom";
import ListViewKendoForSearchKeyword from "components/KendoSearchKeywork/ListViewKendoForSearchKeyword.js";


const useStyles = makeStyles(styles);

export default function SearchPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  const { Tag,tagID } = useParams();
  return (
    <div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <div className={classes.description}>
            </div>
            <ListViewKendoForSearchKeyword dataID = {-1}></ListViewKendoForSearchKeyword>
          </div>
   
        </div>
      </div>
      <Footer />
    </div>
  );
}
