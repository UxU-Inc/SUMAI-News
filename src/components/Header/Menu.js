import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import './Header.css';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grid from '@material-ui/core/Grid';
import AppsIcon from '@material-ui/icons/Apps';
import SUMAIIcon from '../../images/logo192.png';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
    },
    SUMAIIcon: {
      width: 33.6,
      height: 33.6,
      alt: 'SUMAI',
    },
}));

export default function MenuListComposition(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    // const xsm = useMediaQuery(theme.breakpoints.up('xsm'));
  
    const handleToggle = () => {
      setOpen((prevOpen) => !prevOpen);
    };
  
    const handleClose = (event) => {
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
  
      setOpen(false);
    };
  
    const onClickExternLink = (url) => {
      window.location.assign(url)
    };
  
    function handleListKeyDown(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
      }
    }
  
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
      if (prevOpen.current === true && open === false) {
        anchorRef.current.focus();
      }
  
      prevOpen.current = open;
    }, [open]);
  
  
    function FormRow() {
      return (
        <React.Fragment>
                 {/* xs={xsm?4:6} */}
          <Grid item xs={12} >  
            <MenuItem onClick={() => onClickExternLink("https://sumai.co.kr")} style={{width: "100%"}}>
              <div style={{margin: "0 auto"}}>
                <Box display="flex" justifyContent="center"> 
                  <img src={SUMAIIcon} alt="SUMAI" className={classes.SUMAIIcon}/> 
                </Box>
                <Box> 
                  <Typography style={{fontFamily: "NotoSansKR-Regular"}}> 
                    요약
                  </Typography> 
                </Box>
              </div>
            </MenuItem>
          </Grid>
          {/* <Grid item xs={xsm?4:6}>
            <MenuItem onClick={handleClose} style={{width: "100%"}}>
              <div style={{margin: "0 auto"}}>
                <Box> 
                  <FeaturedPlayListIcon fontSize="large" style={{color: root.PrimaryColor}}/> 
                </Box>
                <Box> 
                  <Typography style={{fontFamily: "NotoSansKR-Regular"}}> 
                    뉴스
                  </Typography> 
                </Box>
              </div>
            </MenuItem>
          </Grid>
  
        {xsm
        ?
          <Grid item xs={xsm?4:6}>
          <MenuItem onClick={handleClose} style={{width: "100%"}}>
            <div style={{margin: "0 auto"}}>
              <Box> 
                <FeaturedPlayListIcon fontSize="large" style={{color: root.PrimaryColor}}/> 
              </Box>
              <Box> 
                <Typography style={{fontFamily: "NotoSansKR-Regular"}}> 
                  뉴스
                </Typography> 
              </Box>
            </div>
          </MenuItem>
        </Grid>
        :
          null
        } */}
  
        </React.Fragment>
      );
    }
  
    return (
      <div className={classes.root}>
        <div>
          <IconButton style={{marginRight: "5px"}} 
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
            <AppsIcon />
          </IconButton> 
                                                                                                 {/* style={{marginRight: xsm?"70px":undefined, zIndex:100}} */}
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal style={{zIndex:100}}>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
              >
                <Paper elevation={3} >
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                   
                  {/* <Grid container spacing={1} style={{width: xsm?"300px":"200px"}}>  */}
                      <Grid container spacing={1} >
                        <Grid container item xs={12}>
                          <FormRow />
                        </Grid>
                        {/* <Grid container item xs={12}>
                          <FormRow />
                        </Grid>
                        <Grid container item xs={12}>
                          <FormRow />
                        </Grid> */}
                      </Grid>
  
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      </div>
    );
}