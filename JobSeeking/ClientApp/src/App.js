import React, { Component } from 'react';
import { Route } from 'react-router';
import  Layout  from './components/Layout';
import { FetchData } from './components/FetchData';
import HomePage from './views/HomePage';
import ProfilePage from './views/ProfilePage';
import CompanyPage from './views/CompanyPage';
import './custom.css';
import JobsPage from './views/JobsPage';
import CompanyRegiter from 'views/Register/CompanyRegister/CompanyRegiter';
import PublishedRecruitment from 'views/Company/PublishedRecruitment';
import PrivateRoute from 'components/Router/PrivateRoute';
import ShowCadidate from 'components/ShowCandidate/ShowCandidate';
import PrivateRouteForViewList from 'components/Router/PrivateRouteForViewList';
import TagPage from 'views/TagPage/TagPage';
import ApplyPage from 'views/ApplyPage/ApplyPage';
import ToolbarCandidate from 'components/ToolbarCandidate/ToolbarCandidate';
import RecruitmentManagement from 'components/RecruitmentManagementPage/RecruitmentManagement';
import MyToastr from 'components/Toastr/Toastr';
import SearchPage from 'views/SearchPage/SearchPage';
import AdminPage from 'views/AdminPage/AdminPage';
import { NavMenu } from './components/NavMenu';
import PrivateRouteRecruiter from 'components/Router/PrivateRouteRecruiter';
import PrivateRouteAdmin from 'components/Router/PrivateRouteAdmin';


export default class App extends Component {
  static displayName = App.name;
  render () {
    return (
      <div>
      <div>
        <MyToastr></MyToastr>
        <Layout>
        <Route exact path='/' component={HomePage} />
        <PrivateRoute path='/RecruitmentManagement' component={RecruitmentManagement} exact />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/ProfilePage' component={ProfilePage} exact/>
        <Route path='/ProfilePage/:CandidateCode' component={ProfilePage} exact />
        <Route path='/Company/:companyID' component={CompanyPage} />
        <Route path='/Tag' component={TagPage} />
        <Route path='/SearchPage' component={SearchPage} />
        <Route path='/ApplyJob' component={ApplyPage} />
        <Route path='/Jobs/:jobID' component={JobsPage} />
        <Route path='/CompanyRegiter' component={CompanyRegiter} />
        <Route path='/EditCompany' component={CompanyRegiter} />
        <PrivateRouteRecruiter component={PublishedRecruitment} path="/PublishedRecruitment" exact />
        <PrivateRouteRecruiter path='/PublishedRecruitment/:jobID' component={PublishedRecruitment} exact />
        <PrivateRouteForViewList path= {["/Jobs/:jobID", "/ProfilePage/:CandidateCode"]} component={ShowCadidate} />
        
      </Layout>
      <PrivateRouteAdmin path='/AdminPage' component={AdminPage} />
      <PrivateRouteForViewList path= {["/ProfilePage/:CandidateCode"]} component={ToolbarCandidate} />
      </div>
      </div>
    );
  }
}
