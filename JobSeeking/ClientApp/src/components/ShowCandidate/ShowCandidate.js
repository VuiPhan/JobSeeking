import ListViewKendo from "components/ListViewKendo/ListViewKendo";
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
    return <div className="menu">
      {/* <ul>
        <li>Home</li>
        <li>About</li>
        <li>Work</li>
        <li>Contact</li>
      </ul> */}
      <ListViewKendo></ListViewKendo>
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
      <div className="ContainerMenu">
        <div className={this.state.condition ? "hamburger inactive" : "hamburger active"}>
          <div onClick={this.onButtonClick}>
            <Hamburger />
          </div>
          <Menu />
        </div>
      </div>
    );
  }
}
