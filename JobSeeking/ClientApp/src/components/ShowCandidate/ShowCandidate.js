import { Tooltip, Zoom } from "@material-ui/core";
import ListViewCandidate from "components/ListViewCandidate/ListViewCandidate";
import React, { Component } from "react";
import './styleShowCadidate.scss';
class Hamburger extends Component {
  render() {
    return <div className="lines">
      <span></span>
      <span></span>
      <span></span>
    </div>;
  }
}
class Menu extends Component {
  render() {
    return <div className="menu" >
      <ListViewCandidate></ListViewCandidate>
    </div>;
  }
}
export default class ShowCadidate extends Component {
  constructor() {
    super();
    this.onButtonClick = this.onButtonClick.bind(this)
    this.state = { condition: true };
  }
  onButtonClick() {
    this.setState({ condition: !this.state.condition });
  }
  render() {
    return (
      <div className="ContainerMenu" >
        <Tooltip title="XEM HỒ SƠ ỨNG VIÊN" interactive placement="top" TransitionComponent={Zoom}>
        <div className={this.state.condition ? "hamburger inactive" : "hamburger active"}>
          <div onClick={this.onButtonClick}>
            <Hamburger />
          </div>
          <Menu />
        </div>
        </Tooltip>
      </div>
    );
  }
}
