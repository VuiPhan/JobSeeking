import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchData } from './components/FetchData';
import HomePage from './views/HomePage';
import { Counter } from './components/Counter';
import ProfilePage from './views/ProfilePage';
import CompanyPage from './views/CompanyPage';
import './custom.css';
import JobsPage from './views/JobsPage';
import CompanyRegiter from 'views/Register/CompanyRegister/CompanyRegiter';
import PublishedRecruitment from 'views/Company/PublishedRecruitment';
import PrivateRoute from 'components/Router/PrivateRoute';
import ShowCadidate from 'components/ShowCandidate/ShowCandidate';
import PrivateRouteForViewList from 'components/Router/PrivateRouteForViewList';


export default class App extends Component {
  static displayName = App.name;
  render () {
    return (
        <Layout>
        <Route exact path='/' component={HomePage} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/ProfilePage' component={ProfilePage} exact/>
        <Route path='/ProfilePage/:CandidateCode' component={ProfilePage} exact />
        <Route path='/Company/:companyID' component={CompanyPage} />
        <Route path='/Jobs/:jobID' component={JobsPage} />
        <Route path='/CompanyRegiter' component={CompanyRegiter} />
        <PrivateRoute component={PublishedRecruitment} path="/PublishedRecruitment" exact />
        <PrivateRouteForViewList path= {["/Jobs/:jobID", "/ProfilePage/:CandidateCode"]} component={ShowCadidate} />
      </Layout>
    );
  }
}
