import React, { useEffect } from 'react'
import Sidebar from "../../components/Sidebar/Sidebar";
import routes from "../routes.js";

  import "./CSSFile/css/paper-dashboard.css"; // DO file này làm phông lỗi
  import "./CSSFile/demo/demo.css";
 import "perfect-scrollbar/css/perfect-scrollbar.css";
 import { Route, Switch, useLocation } from "react-router-dom";
 import DemoNavbar from "../../components/Navbars/DemoNavbar.js";
 import Footer from "../../components/FooterAdmin/Footer.js";

function AdminPage(props) {
  const [backgroundColor, setBackgroundColor] = React.useState("black");
  const [activeColor, setActiveColor] = React.useState("info");
  const mainPanel = React.useRef();
  const location = useLocation();

    const handleBgClick = (color) => {
        setBackgroundColor(color);
      };
    return (
        <div className="wrapper">
        <Sidebar
          {...props}
          routes={routes}
          bgColor={backgroundColor}
          activeColor={activeColor}
        />
        <div className="main-panel"   ref={mainPanel}>
          <DemoNavbar {...props} />
          <Switch>
            {routes.map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Switch>
          <Footer fluid />
        </div>
      </div>
    )
}

export default AdminPage
