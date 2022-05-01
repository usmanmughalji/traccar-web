import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  makeStyles, Paper, BottomNavigation, BottomNavigationAction, Menu, MenuItem, Typography,
} from '@material-ui/core';

import DescriptionIcon from '@material-ui/icons/Description';
import SettingsIcon from '@material-ui/icons/Settings';
import MapIcon from '@material-ui/icons/Map';
import PersonIcon from '@material-ui/icons/Person';

import { sessionActions } from '../store';
import { useTranslation } from '../LocalizationProvider';

const useStyles = makeStyles((theme) => ({
  container: {
    bottom: theme.spacing(0),
    left: '0px',
    width: '100%',
    position: 'fixed',
    [theme.breakpoints.up('lg')]: {
      left: theme.spacing(1.5),
      bottom: theme.spacing(1.5),
      width: theme.dimensions.drawerWidthDesktop,
    },
  },
}));

const BottomMenu = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const t = useTranslation();

  const userId = useSelector((state) => state.session.user?.id);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleSelection = async (event, value) => {
    switch (value) {
      case 1:
        history.push('/reports/route');
        break;
      case 2:
        history.push('/settings/notifications');
        break;
      case 3:
        setAnchorEl(event.currentTarget);
        break;
      default:
        break;
    }
  };

  const handleLogout = async () => {
    await fetch('/api/session', { method: 'DELETE' });
    history.push('/login');
    dispatch(sessionActions.updateUser(null));
  };

  return (
    <Paper square elevation={3} className={classes.container}>
      <BottomNavigation value={0} onChange={handleSelection} showLabels>
        <BottomNavigationAction label={t('mapTitle')} icon={<MapIcon />} />
        <BottomNavigationAction label={t('reportTitle')} icon={<DescriptionIcon />} />
        <BottomNavigationAction label={t('settingsTitle')} icon={<SettingsIcon />} />
        <BottomNavigationAction label={t('settingsUser')} icon={<PersonIcon />} />
      </BottomNavigation>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)} >
        <MenuItem onClick={() => history.push(`/user/${userId}`)}>
        <Typography color="textPrimary">{t('settingsUser')}</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography color="error">{t('loginLogout')}</Typography>
        </MenuItem>
      </Menu>
    </Paper>
  );
};

export default BottomMenu;
