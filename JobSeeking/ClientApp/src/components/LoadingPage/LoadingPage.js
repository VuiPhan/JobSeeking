import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useState } from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/ClipLoader";
import { Spin, Space } from 'antd';
import 'antd/dist/antd.css';
import { AccessibleForwardTwoTone, RestaurantRounded } from '@material-ui/icons';
import { LoadingOutlined } from '@ant-design/icons';
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function LoadingItem(props) {
  let [color, setColor] = useState("#ffffff");
  const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;
  const classes = {
    position:'fixed',
    top: '50%',
    left: '50%',
    width: '100%',
    height: '100%',
    zIndex:999
  };
  const classes2 = {
    position:'fixed',
    width: '100%',
    height: '100%',
    zIndex:100,
    backgroundColor:'black',
    opacity: 0.3
  };
  return (
    
    <div style={classes2}>
      <div style={classes}>
             <Spin indicator={antIcon} size="large" />
          </div>
    </div>
  )
}
function LoadingPage() {
    const loading = useSelector(state => state.LoadingSlicer.isLoading);
    const [isLoading, setisLoading] = useState(false);
    useEffect(() => {
      if(loading === false){
        setTimeout(() => {
          setisLoading(loading);
        }, 2000)
      }
      setisLoading(loading);
     
    }, [loading])


    return (
      <div>
          {isLoading == true ? <LoadingItem /> : null}
      </div>
       
    )
}

export default LoadingPage
