import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../components/Footer/Footer.js";
import styles from "../assets/jss/material-kit-react/views/profilePage.js";
import ListViewKendo2 from "components/ListViewKendo/ListViewKendo2.js";
import CompanyList from "components/ListViewCompany/CompanyList.js";

const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>

      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <h3 style={{ paddingLeft: 30, paddingTop: 36,fontFamily: "Alfa Slab One",
  fontSize: 30,
  color: '#fb8500' }}>Nhà Tuyển Dụng Hàng Đầu</h3>
            <CompanyList></CompanyList>
            <div style={{ marginTop: 40 }}>
              <ListViewKendo2 dataID={-1}></ListViewKendo2>

            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}
