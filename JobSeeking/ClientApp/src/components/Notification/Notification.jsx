import React from 'react';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
class Example extends React.Component {
   constructor(props){
       super(props);
       this.Type = '';
       this.Title = "";
       this.Message = "";
   }
  createNotification = (type) => {
    return () => {
      switch (this.props.Type) {
        case 'info':
          NotificationManager.info(this.props.Message);
          break;
        case 'success':
          NotificationManager.success(this.props.Title, this.props.Message);
          break;
        case 'warning':
          NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
          break;
        case 'error':
          NotificationManager.error('Error message', 'Click me!', 5000, () => {
            alert('callback');
          });
          break;
      }
    };
  };
 
  render() {
      
    return (
      <div>
        <NotificationContainer/>
      </div>
    );
  }
}
 
export default Example;