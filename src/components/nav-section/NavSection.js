/* eslint-disable no-nested-ternary */
import { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { Badge, Box, List, ListItemText } from '@mui/material';

import useAuthUser from 'src/hooks/useAuthUser';

import { roleTypes } from 'src/lib/constants';
import palette from 'src/theme/palette';
import {
  assistantRoutes,
  clinicAdminRoutes,
  patientRoutes,
  practitionerRoutes,
  superAdminRoutes,
} from 'src/routes';
import { getUserRole } from 'src/lib/utils';
import { ChatContext } from 'src/context/chatContext';
import { StyledNavItem, StyledNavItemIcon } from './styles';
import DateTimeComponent from '../DateAndTimeComponent';

const updateMenu = (data, userRole) => {
  let filterMenu;
  if (userRole === roleTypes.superAdmin) {
    filterMenu = data.filter((item) => superAdminRoutes.includes(item?.path));
  } else if (userRole === roleTypes.patient) {
    filterMenu = data.filter((item) => patientRoutes.includes(item?.path));
  } else if (userRole === roleTypes.clinicAdmin) {
    filterMenu = data.filter((item) => clinicAdminRoutes.includes(item?.path));
  } else if (userRole === roleTypes.practitioner) {
    filterMenu = data.filter((item) => practitionerRoutes.includes(item?.path));
  } else {
    filterMenu = data.filter((item) => assistantRoutes.includes(item?.path));
  }
  return filterMenu;
};

// ----------------------------------------------------------------------

export default function NavSection({ data = [], ...other }) {
  const userRole = getUserRole();
  const updatedMenu = updateMenu(data, userRole);
  const [activeMenu, setActiveMenu] = useState();
  const [userData] = useAuthUser();
  const timeZone = userData?.practice?.timezone;

  return (
    <Box {...other} sx={{ overflow: 'auto', height: '100%' }}>
      <List disablePadding sx={{ p: 1, maxHeight: '98%', overflow: 'auto' }}>
        {updatedMenu.map((item) => (
          <NavItem
            key={item.title}
            item={item}
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            userRole={userRole}
          />
        ))}
      </List>
      {timeZone &&
      !(
        userData?.role === roleTypes.patient ||
        userData?.role === roleTypes.superAdmin
      ) ? (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            textAlign: 'center',
            padding: '10px 20px 20px 20px',
            boxShadow: '4px 8px 18px 0px rgba(68, 97, 242, 0.9)',
            backgroundColor: palette.common.white,
            maxHeight: '2%',
          }}
        >
          <DateTimeComponent timeZone={timeZone} />
        </Box>
      ) : null}
    </Box>
  );
}

// ----------------------------------------------------------------------

const NavItem = ({ item, activeMenu, setActiveMenu, userRole }) => {
  const { title, path, icon, activeIcon } = item;
  const location = useLocation();
  const { count } = useContext(ChatContext);

  useEffect(() => {
    const pathName = location.pathname.split('/')[1];
    if (`/${pathName}` === path) {
      setActiveMenu(path);
    }
  }, [location.pathname, path]);

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        height: '36px',
        fontStyle: 'normal',
        lineHeight: '19.6px',
        marginBottom: '12px',
        '&.active': {
          borderRadius: '6px',
          background:
            'linear-gradient(131deg,rgba(68, 97, 242, 0.1), rgba(43, 217, 255, 0.1))',
          color: palette.common.black,
          fontSize: '16px',
          fontWeight: '600',
          lineHeight: '25.2px',
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          padding: '4px 0px 4px 11px',
        }}
      >
        <StyledNavItemIcon>
          {title === 'Chat' ? (
            <Badge
              badgeContent={
                Object.keys(count).length && userRole === 'patient'
                  ? ''
                  : Object.keys(count).length
              }
              color="error"
              overlap={userRole === 'patient' ? 'circular' : 'rectangular'}
              variant={userRole === 'patient' && 'dot'}
            >
              {activeMenu === path ? activeIcon : icon}
            </Badge>
          ) : activeMenu === path ? (
            activeIcon
          ) : (
            icon
          )}
        </StyledNavItemIcon>
        <ListItemText disableTypography primary={title} />
      </Box>
    </StyledNavItem>
  );
};

NavSection.defaultProps = {
  data: [],
};

NavSection.propTypes = {
  data: PropTypes.arrayOf,
};

NavItem.defaultProps = {
  item: {},
};

NavItem.propTypes = {
  item: PropTypes.instanceOf(Object),
};
