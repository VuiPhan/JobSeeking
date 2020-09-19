import React, { Component } from 'react';
import AccessAlarmsIcon from '@material-ui/icons/AccessAlarms';
import Header from '../components/Header/Header';
export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <h1>Hellosss, world!</h1>
            <Header></Header>
      </div>
    );
  }
}
