import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import ToolbarCandidate from './ToolbarCandidate/ToolbarCandidate';
import { useHistory } from 'react-router-dom';

// export class Layout extends Component {
//   static displayName = Layout.name;

//   render () {
//     return (
//       <div>
//         <NavMenu />
//         <Container>
//           {this.props.children}
//         </Container>
//       </div>
//     );
//   }
// }

function Layout(props) {
  const displayName = Layout.name;
  const history = useHistory();

  const isViewAdmin =  history.location.pathname.substring(0, 10) === '/AdminPage' ? false :true;
  debugger;
  return (
    <div>
       {isViewAdmin ? <NavMenu />: null}
        <Container>
        {isViewAdmin}
          {/* {this.props.children} */}
          {props.children}
        </Container>
    </div>
  )
}

export default Layout

