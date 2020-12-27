import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { Tooltip, Zoom } from '@material-ui/core';
import { useSelector } from 'react-redux';
import VisibilityIcon from '@material-ui/icons/Visibility';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ListCV(props) {
  const {handleClose,data,deleteCV} = props;

  const classes = useStyles();
  const handleToggle = (value) => () => {
    
  };
  const openForm =(value) => {
    handleClose(value);
  };
  const LoginInfo = useSelector(state => state.loginInfo);

  return (
    <div style={{display: 'flex',justifyContent: 'center',marginTop:20}}>
    <List className={classes.root}>
      {data.map((value) => {
        const labelId = `checkbox-list-label-${value.jobTitleName}`;

        return (
          <ListItem key={value.recID} role={undefined} dense button onClick={handleToggle(value.recID)}>
            <ListItemText id={labelId} primary={`${value.jobTitleName}`} />
            <ListItemSecondaryAction>

            {LoginInfo.companyID ?
            <Tooltip title="Xem" interactive placement="top" TransitionComponent={Zoom}>
            <IconButton color='primary' edge="end" aria-label="comments" onClick={()=>openForm(value.recID)}>
                <VisibilityIcon />
              </IconButton>
                    </Tooltip>
              :<Tooltip title="Chỉnh sửa" interactive placement="top" TransitionComponent={Zoom}>
              <IconButton color='primary' edge="end" aria-label="comments" onClick={()=>openForm(value.recID)}>
                  <EditIcon />
                </IconButton>
                      </Tooltip>}


                    {!LoginInfo.companyID ?
            <Tooltip title="Xóa" interactive placement="top" TransitionComponent={Zoom}>
              <IconButton color='secondary' edge="end" aria-label="delete" onClick={()=>deleteCV(value.recID)}>
                <DeleteForeverIcon />
              </IconButton>
              </Tooltip>: null}

            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
    </div>
  );
}
