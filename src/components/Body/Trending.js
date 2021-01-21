import React, { useState, useEffect, useCallback } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
import { useSelector } from 'react-redux';

import Contents from './Contents';
import { useStyles } from './BodyStyles';


export default function Trending(props) {
  const { colsCount, lg, xl } = props
  const classes = useStyles();
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(false)
  const currentId = useSelector(store => store.authentication.status.currentId)

  const Trending = useCallback((cnt) => {
    const id = currentId
    axios.post('/api/news/trending', { id, cnt })
      .then((response) => {
        setNewsData(response.data)
      }).catch((error) => {

      })
  }, [currentId])

  useEffect(() => {
    if (!loading) {
      setLoading(true)
      Trending(48)
    }
  }, [loading, Trending, currentId]);

  return (
    <Box className={classes.root}>
    <Box className={classes.grid} display="flex" width="100vw">
        {['', '', '', ''].slice(0, colsCount).map((t, k) => (
        <Grid container direction="column" style={{ height: "auto", flex: '4' }} key={k}>
            {newsData.slice(0, newsData.length).filter((x, idx) => idx % colsCount === k).map((tile, key) => (
              <Grid item key={key} className={classes.gridContents} style={{ padding: "none" }}>
                <Contents news={tile} currentId={currentId} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Box>
    </Box>
  )
}