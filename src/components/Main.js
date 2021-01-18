import React, { useState, useEffect, useCallback } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import Header from "./Header/Header";

import Box from '@material-ui/core/Box';
import MiniDrawer from './Header/MiniDrawer';

const xs_size = 0;
const xsm_size = 580;
const sm_size = 840;
const md_size = 1100;

export default function Main(props) {
  const {Body} = props
  
  const [open, setOpen] = useState(false);
  const [colsCount, setColsCount] = useState(0)

  const theme = useTheme();
  const xsm = useMediaQuery(theme.breakpoints.between(xs_size, xsm_size));
  const sm = useMediaQuery(theme.breakpoints.between(xsm_size, sm_size));
  const md = useMediaQuery(theme.breakpoints.between(sm_size, md_size));
  const lg = useMediaQuery(theme.breakpoints.up(md_size));
  
  const columns = useSelector(store => store.contentSetting.columns)

  const handleColumns = useCallback(() => {
    const changeCount = (count) => {
      setColsCount(count< columns? count: columns)
    }
    if(xsm)     changeCount(1);
    else if(sm) changeCount(2);
    else if(md) changeCount(3);
    else if(lg) changeCount(4);
  }, [xsm, sm, md, lg, columns])

  useEffect(() => {
    handleColumns()
  }, [handleColumns]);

  return(
    <Box>
      <Header open={open} setOpen={setOpen}/>
      
      <Box style={{display: 'flex'}}>
        <MiniDrawer open={open} setOpen={setOpen} />
        <Body colsCount={colsCount} lg={lg}/>
      </Box>

    </Box>
  )
}