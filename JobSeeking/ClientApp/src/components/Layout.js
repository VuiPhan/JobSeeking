import React, { Component, useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import ToolbarCandidate from './ToolbarCandidate/ToolbarCandidate';
import { useHistory, useLocation } from 'react-router-dom';

function Layout(props) {
  const displayName = Layout.name;
  const history = useHistory();
  const location = useLocation();
  const [isViewAdmin,setIsViewAdmin] = useState(false);
  useEffect(() => {
    if(history.location.pathname.substring(0, 10) === '/AdminPage'){
      setIsViewAdmin(true);
      return;
    }
    setIsViewAdmin(false);
  },[location]);
  return (
    <div>
       {isViewAdmin ?null : <NavMenu />}
        <Container>
          {props.children}
        </Container>
    </div>
  )
}

export default Layout

