import { Box, IconButton, Grid, Grow, MenuList, Popper, Paper } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import ColController, {getColumns} from './ColController';
import FontController from "./FontController";
import { makeStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  popup: {
    display: 'flex',
    alignItems: 'center',
  }
}))

export default function ControllerMenu() {
  const classes = useStyles()
  const anchorRef = useRef(null)
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()

  // 쿠키에서 columns를 읽어오는 함수
  useEffect(() => {
    getColumns(dispatch)
  }, [dispatch])

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  return (
    <Box className={classes.root}>
      <IconButton style={{ marginRight: "5px" }}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={() => setOpen(!open)}
      >
        <SettingsIcon />
      </IconButton>


      <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{ zIndex: 100 }}>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper elevation={3} >
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList className={classes.popup} autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>

                  <ColController margin='0 10px' />
                  <FontController margin='0 10px' />

                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}