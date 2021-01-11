import React from 'react';

import Header from "./Header/Header";
import Body from "./Body";

import Box from '@material-ui/core/Box';
import clsx from 'clsx';
import MiniDrawer from './Header/MiniDrawer';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}))

export default function Main() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  return(
    <Box>
      <Header open={open} setOpen={setOpen}/>
      
      <Box style={{display: 'flex'}}>
        <MiniDrawer open={open} setOpen={setOpen} />
        <Body/>
      </Box>

    </Box>
  )
}