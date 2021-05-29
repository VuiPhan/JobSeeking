import Dashboard from "./AdminDetail/Dashboard";
import RecruiterManagement from "./AdminDetail/RecruiterManagement";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/AdminPage",
  },
  {
    path: "/RecruiterManagement",
    name: "Nhà tuyển dụng",
    icon: "nc-icon nc-bank",
    component: RecruiterManagement,
    layout: "/AdminPage",
  }
  ,
  {
    path: "/ConfigEmail",
    name: "Thiết lập Email",
    icon: "nc-icon nc-bank",
    component: RecruiterManagement,
    layout: "/AdminPage",
  }
];
export default routes;
