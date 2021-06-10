import Dashboard from "./AdminDetail/Dashboard";
import RecruiterManagement from "./AdminDetail/RecruiterManagement";
import TemplateEmail_Admin from "./AdminDetail/TemplateEmail_Admin";
import ManagerCategories from "./AdminDetail/ManagerCategories";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-bar-32",
    component: Dashboard,
    layout: "/AdminPage",
  },
  {
    path: "/RecruiterManagement",
    name: "Nhà tuyển dụng",
    icon: "nc-icon nc-single-copy-04",
    component: RecruiterManagement,
    layout: "/AdminPage",
  }
  ,
  {
    path: "/ConfigEmail",
    name: "Thiết lập Email",
    icon: "nc-icon nc-email-85",
    component: TemplateEmail_Admin,
    layout: "/AdminPage",
  }
  ,
  {
    path: "/ManagerCategories",
    name: "Thiết lập danh mục",
    icon: "nc-icon nc-bullet-list-67",
    component: ManagerCategories,
    layout: "/AdminPage",
  }
];
export default routes;
