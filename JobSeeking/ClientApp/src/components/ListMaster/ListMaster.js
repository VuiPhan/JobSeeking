import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import '../ListMaster/style.scss'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));
AlignItemsList.propTypes = {
    data:PropTypes.array,
}
export default function AlignItemsList(props) {
  const classes = useStyles();
  const {data} = props;
  return (
    <div className="container-master">
    <List className={classes.root}>
        {data.map((item, i) => <ListItemCustom key={item.RecID} title={item.GenderName} detail={item.GenderName2}></ListItemCustom>)}
    </List>
    </div>
  );
} 
ListItemCustom.propTypes = {
    title:PropTypes.string,
    key:PropTypes.number,
    detail:PropTypes.string,
}
function ListItemCustom(props){
    const {title,key,detail} = props;
    const classes = useStyles();
    return(
        <div>
    <ListItem alignItems="flex-start">
        <ListItemText
          primary={title}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
              {  detail}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
        </div>
    );
   
}