import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import tileData from './tileData';

import Contents from './Contents';

const xs_size = 0;
const xsm_size = 580;
const sm_size = 840;
const md_size = 1100;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
  },
  gridList: {
    width: "100%",
  },
  gridListTile: {
    padding: '10px',
    [theme.breakpoints.between(xs_size, xsm_size)]: {
      padding: '0px 0px 15px 0px',
    },
    [theme.breakpoints.between(xsm_size, sm_size)]: {
      padding: '0px 5px 10px 5px',
    },
    [theme.breakpoints.between(sm_size, md_size)]: {
      padding: '10px',
    },
  }
}));


function ColsCount() {
  const theme = useTheme();
  const xsm = useMediaQuery(theme.breakpoints.between(xs_size, xsm_size));
  const sm = useMediaQuery(theme.breakpoints.between(xsm_size, sm_size));
  const md = useMediaQuery(theme.breakpoints.between(sm_size, md_size));
  
  if(xsm)     return 1;
  else if(sm) return 2;
  else if(md) return 3;
  else return 4;
}


export default function Body() {
  const classes = useStyles();
  
  return (
    <Box className={classes.root}>
      <GridList cellHeight={410} className={classes.gridList} style={{margin: '0px'}} cols={ColsCount()}>
        {tileData.map((tile, index) => (
          <GridListTile key={tile.title} style={{padding: 'none'}} className={classes.gridListTile} cols={tile.cols || 1}>
            <Contents news_agency={tile.news_agency} title={index} summary={tile.summary}/>
          </GridListTile>
        ))}
      </GridList>
    </Box>
  )
}