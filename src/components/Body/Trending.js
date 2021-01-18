import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { useSelector } from 'react-redux';

import Contents from './Contents';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,

    margin: "16px 8px",
    [theme.breakpoints.between(0, 640)]: {
      margin: '0px',
    },
    [theme.breakpoints.between(580, 640)]: {
      margin: '0px',
    },
    [theme.breakpoints.between(640, 760)]: {
      margin: '8px 4px',
    },
    [theme.breakpoints.between(760, 840)]: {
      margin: '16px 8px',
    },
    [theme.breakpoints.between(840, 1300)]: {
      margin: '16px 4px',
    },
  },
  gridContents: {
    padding: '0px 8px 16px 8px',
    [theme.breakpoints.between(0, 580)]: {
      padding: '0px 0px 16px 0px',
    },
    [theme.breakpoints.between(580, 640)]: {
      padding: '0px 0px 8px 0px',
    },
    [theme.breakpoints.between(640, 760)]: {
      padding: '0px 4px 8px 4px',
    },
    [theme.breakpoints.between(760, 840)]: {
      padding: '0px 8px 16px 8px',
    },
    [theme.breakpoints.between(840, 1300)]: {
      padding: '0px 4px 8px 4px',
    },
  }
}));


export default function Trending(props) {
  const { colsCount } = props
  const classes = useStyles();
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(false)
  const currentId = useSelector(store => store.authentication.status.currentId)

  const Trending = useCallback((cnt) => {
    const id = currentId
    axios.post('http://localhost:3306/api/news/trending', { id, cnt })   //링크 바꿔야됨
    .then((response) => {
      setNewsData(response.data)
    }).catch((error) => {

    })
  }, [currentId])

  useEffect(() => {
    if(!loading) {
      setLoading(true)
      Trending(48)  
    }
  }, [loading, Trending]);

  return (
    <Box className={classes.root}>
      <Box display="flex" width="100vw">
        {['', '', '', ''].slice(0, colsCount).map((t, k) => ( 
          <Grid container direction="column" style={{height:"auto"}} key={k}>
            {newsData.slice(0, newsData.length).filter((x, idx) => idx%colsCount===k).map((tile, key) => (
              <Grid item key={key} className={classes.gridContents} style={{padding: "none", maxWidth:"1000px"}}>
                <Contents news={tile} currentId={currentId}/>
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </Box>
  )
}