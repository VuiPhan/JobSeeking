import React from "react";
import ReactStars from "react-rating-stars-component";
import PropTypes from 'prop-types';

  Ratting.propTypes = {
        value: PropTypes.number,
        disable: PropTypes.bool,
        size: PropTypes.number,
        ChangeStar: PropTypes.func,
  }
  Ratting.defaultProps = {
    value: 0,
    disable:false ,
    size:50   
  }
export default function Ratting(props) {
  const {value,disable,size,ChangeStar} = props;
  const ratingChanged = (newRating) => {
    ChangeStar(newRating);
  };
    
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
