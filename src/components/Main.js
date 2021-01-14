import React from 'react';

import Header from "./Header/Header";

import Box from '@material-ui/core/Box';
import MiniDrawer from './Header/MiniDrawer';


export default function Main(props) {
  const {Body} = props
  
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