import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';

import Contents from './Contents';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
  },
}));


function ColsCount() {
  const theme = useTheme();
  const xsm = useMediaQuery(theme.breakpoints.between('xs', theme.breakpoints.values.xsm));  // 0~360
  const sm = useMediaQuery(theme.breakpoints.between(theme.breakpoints.values.xsm, 'sm'));  // 360~600
  const md = useMediaQuery(theme.breakpoints.between('sm', 'md'));  // 600~720
  const lg = useMediaQuery(theme.breakpoints.between('md', 'lg'));  // 720~1280
  
  if(xsm)     return 1;
  else if(sm) return 2;
  else if(md) return 3;
  else return 4;
}


export default function Body() {
  const classes = useStyles();
  
  return (
    <Box className={classes.root}>
      <GridList cellHeight={410} className={classes.gridList} cols={ColsCount()}>
        {tileData.map((tile) => (
          <GridListTile style={{padding: "10px"}} cols={tile.cols || 1}>
            <Contents news_agency={tile.news_agency} title={tile.title} summary={tile.summary}/>
          </GridListTile>
        ))}
      </GridList>
    </Box>
  )
}