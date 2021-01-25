import React, { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

import axios from 'axios';
import { useSelector } from 'react-redux';

import Contents from './Contents';
import useSkeletonHandler from './useSkeletonHandler';
import { useStyles } from './BodyStyles';


export default function Body(props) {
  const { colsCount } = props
  const classes = useStyles();
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAllLoad, setIsAllLoad] = useState(false)
  const currentId = useSelector(store => store.authentication.status.currentId)

  const itemRef = useRef([])

  const [skelOffsetTop, hideSkel] = useSkeletonHandler(newsData, colsCount, itemRef)

  const NewsMain = useCallback((idx, cnt) => {
    const id = currentId
    axios.post('/api/news/lastest', { id, idx, cnt })
      .then((response) => {
        setNewsData(newsData.concat(response.data))
        if (response.data.length < cnt || newsData.length >= 288) {
          setIsAllLoad(true)
        }
        setLoading(false)
      }).catch((error) => {

      })
  }, [newsData, currentId])

  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if (newsData[newsData.length - 1] && (scrollHeight - innerHeight - scrollTop < 300 || skelOffsetTop - innerHeight - scrollTop < -200) && !loading && !isAllLoad) {
      setLoading(true)
      NewsMain(newsData[newsData.length - 1].idx - 1, 24)
    }
  }, [loading, newsData, NewsMain, isAllLoad, skelOffsetTop]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (!isAllLoad && !loading && currentId !== '-1' && newsData.length === 0) {
      setLoading(true)
      NewsMain(-1, 24)
    }
  }, [NewsMain, newsData, isAllLoad, loading, currentId]);

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
            <Grid className={classes.gridContents} style={newsData.length === 0 ? { display: "none" } : null} ref={(el) => itemRef.current[k] = el}>
              {!isAllLoad && !hideSkel[k] ? <>
                <Skeleton variant="rect" height={80} />
                <Box style={{ padding: "2px" }} />
                <Skeleton variant="rect" height={250} />
              </> : null}
            </Grid>
          </Grid>
        ))}
      </Box>
    </Box>
  )
}