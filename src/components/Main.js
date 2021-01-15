import React from 'react';

import Header from "./Header/Header";

import Box from '@material-ui/core/Box';
import MiniDrawer from './Header/MiniDrawer';


export default function Main(props) {
  const {Body} = props
  
  const [colCount, setColCount] = React.useState(4)
  const [open, setOpen] = React.useState(false);
  return(
    <Box>
      <Header open={open} setOpen={setOpen} colCount={colCount} setColCount={setColCount}/>
      
      <Box style={{display: 'flex'}}>
        <MiniDrawer open={open} setOpen={setOpen} />
        <Body colCount={colCount}/>
      </Box>

    </Box>
  )
}