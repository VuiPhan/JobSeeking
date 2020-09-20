import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import HomePage from './views/HomePage';
import { Counter } from './components/Counter';
import ProfilePage from './views/ProfilePage';
import CompanyPage from './views/CompanyPage';
import './custom.css';
import JobsPage from './views/JobsPage';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
        <Route exact path='/' component={HomePage} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/ProfilePage' component={ProfilePage} />
        <Route path='/Company' component={CompanyPage} />
        <Route path='/Jobs' component={JobsPage} />
      </Layout>
    );
  }
}
