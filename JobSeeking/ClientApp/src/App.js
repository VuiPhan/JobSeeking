import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import HomePage from './views/HomePage';
import { Counter } from './components/Counter';
import ProfilePage from './views/ProfilePage';
import './custom.css';


export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
        <Layout>
   
        <Route exact path='/' component={ProfilePage} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/Home' component={HomePage} />
      </Layout>
    );
  }
}
