import React from 'react'; 
import './Header.css';
import IconButton from '@material-ui/core/IconButton';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// import html2canvas from 'html2canvas';
// import emailjs from 'emailjs-com';
import { onLogout } from './../../functions/logout';
import { useSelector } from 'react-redux';


export default function AccountManagementMenu() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const currentUser = useSelector(store => store.authentication.status.currentUser)

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
  
    return (
      <Box>
        <Box
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{color: "#0000008A", cursor:'pointer'}}
        >
          {currentUser}님
          <IconButton style={{padding: "0px"}}>
            <ExpandMoreIcon />
          </IconButton>
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