import React, {Component} from 'react';

// import {DraggableAreasGroup} from '../Draggable';
import deleteBtn from './delete.png';
import deleteBtn2x from './delete@2x.png';

import styles from './style.scss';

import mock from './mock.js';
import {DraggableArea, DraggableAreasGroup} from 'react-draggable-tags';

const group = new DraggableAreasGroup();
const DraggableArea1 = group.addArea();
const DraggableArea2 = group.addArea();


export default class TagListDetail extends Component {
  constructor() {
    super();
    this.state = {
      leftTags: mock.leftTags,
      rightTags: mock.rightTags
    }
  }

  handleClickDelete(tag) {
    const rightTags = this.state.rightTags.filter(t => tag.id !== t.id);
    this.setState({rightTags});
  }
  render() {
    return (
      <div className="CrossArea">
        <div className="square left">
          <DraggableArea1
            tags={this.state.leftTags}
            render={({tag}) => (
              <div className="tag">
                {tag.content}
              </div>
            )}
            onChange={leftTags => {
              this.setState({leftTags});
            }}
          />
        </div>
      </div>
    );
  }
}