import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListCV(props) {
  const {handleClose,data,deleteCV} = props;
  debugger;

  const classes = useStyles();
  const handleToggle = (value) => () => {
    
  };
  const openForm =(value) => {
    handleClose(value);
  };
  debugger;
  return (
    <List className={classes.root}>
      {data.map((value) => {
        const labelId = `checkbox-list-label-${value.jobTitleName}`;

        return (
          <ListItem key={value.recID} role={undefined} dense button onClick={handleToggle(value.recID)}>
            <ListItemText id={labelId} primary={`${value.jobTitleName}`} />
            <ListItemSecondaryAction>
              <IconButton edge="end" aria-label="comments" onClick={()=>openForm(value.recID)}>
                <EditIcon />
              </IconButton>
              <IconButton edge="end" aria-label="delete" onClick={()=>deleteCV(value.recID)}>
                <DeleteForeverIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}
