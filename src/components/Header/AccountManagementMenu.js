import React from 'react';
import './Header.css';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Avatar from '@material-ui/core/Avatar';
import CryptoJS from 'crypto-js';

import { onLogout } from './../../functions/logout';
import { useSelector } from 'react-redux';

import axios from 'axios';

function re_name(name) {
  let re_name = '';

  if (/[a-zA-Z0-9]/.test(name.charAt(0))) {
    re_name = name.charAt(0);
  } else if (name.length >= 3) {
    if (/[a-zA-Z0-9]/.test(name.substring(name.length - 2, name.length))) {
      re_name = name.charAt(0);
    } else {
      re_name = name.substring(name.length - 2, name.length);
    }
  } else {
    re_name = name;
  }

  return re_name;
}

function profile_image(id) {
  return new Promise((res, rej) => axios.post('/api/account/accountLoad/' + id, {}).then((data) => {
    res(data.data.image);
  }).catch(() => {
    res('');
  }))
}

export default function AccountManagementMenu() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const currentUser = useSelector(store => store.authentication.status.currentUser)
  const currentId = useSelector(store => store.authentication.status.currentId)
  const [image, setImage] = React.useState('');
  const [avatarName, setAvatarName] = React.useState('');
  const [avatarColor, setAvatarColor] = React.useState('');

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const prevOpen = React.useRef(open);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  React.useEffect(() => {
    if (currentId !== '-1') {
      profile_image(currentId).then((imageURL) => {
        setImage(imageURL);
        setAvatarName(re_name(currentUser))
        setAvatarColor('#' + CryptoJS.MD5(currentId).toString().substring(1, 7))
      })
    }
  }, [currentId, currentUser]);

  return (
    <Box>
      <Box
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        style={{ color: "#0000008A", cursor: 'pointer' }}
      >
        {
          image === '' ?
            <Avatar style={{ backgroundColor: avatarColor, width: "2.2em", height: "2.2em", fontWeight: 'bold', textTransform: "none" }}>
              {avatarName}
            </Avatar> :
            <Avatar src={image} style={{ width: "2.2em", height: "2.2em" }} />
        }
      </Box>
      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={() => window.location.assign("https://sumai.co.kr/accounts")}>계정 관리</MenuItem>
                  <MenuItem onClick={onLogout}>로그아웃</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  );
}