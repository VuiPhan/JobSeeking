import React from "react";
import ReactStars from "react-rating-stars-component";
import PropTypes from 'prop-types';
const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  Ratting.propTypes = {
        value: PropTypes.number,
        disable: PropTypes.bool,
        size: PropTypes.number,
  }
  Ratting.defaultProps = {
    value: 0,
    disable:false ,
    size:50   
  }
export default function Ratting(props) {
    const {value,disable,size} = props;
  return (
    <div>
      <ReactStars
    count={5}
    onChange={ratingChanged}
    size={size}
    activeColor="#ffd700"
    edit={disable}
    value={value}
  />        
    </div>
  );
}
