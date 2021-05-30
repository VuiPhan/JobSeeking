import Dashboard from "./AdminDetail/Dashboard";
import RecruiterManagement from "./AdminDetail/RecruiterManagement";
import TemplateEmail_Admin from "./AdminDetail/TemplateEmail_Admin";

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
    component: TemplateEmail_Admin,
    layout: "/AdminPage",
  }
];
export default routes;
