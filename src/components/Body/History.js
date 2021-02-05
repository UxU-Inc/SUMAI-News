import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';
import { useSelector } from 'react-redux';

import Contents from './Contents';
import useSkeletonHandler from './useSkeletonHandler';
import { useStyles } from './BodyStyles';


export default function History(props) {
  const { colsCount } = props
  const classes = useStyles();
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [scrollLoading, setScrollLoading] = useState(false)
  const [isAllLoad, setIsAllLoad] = useState(false)
  const currentId = useSelector(store => store.authentication.status.currentId)
  const history = useHistory()

  const itemRef = useRef([])

  const [skelOffsetTop, hideSkel] = useSkeletonHandler(newsData, colsCount, itemRef)

  const cancelToken = axios.CancelToken.source()

  const History = useCallback((time, cnt) => {
    const id = currentId
    axios.post('/api/news/history', { id, time, cnt }, { cancelToken: cancelToken.token })
      .then((response) => {
        setNewsData(newsData.concat(response.data))
        if (response.data.length < cnt) {
          setIsAllLoad(true)
        }
        setLoading(false)
      }).catch((error) => {

      })
  }, [newsData, currentId, cancelToken])

  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if (newsData[newsData.length - 1] && (scrollHeight - innerHeight - scrollTop < 300 || skelOffsetTop - innerHeight - scrollTop < -200)
      && !loading && !scrollLoading && !isAllLoad) {
      setLoading(true)
      setScrollLoading(true)
      History(newsData[newsData.length - 1].requestTime, 24)
    } else if (scrollLoading) {
      setScrollLoading(false)
    }
  }, [loading, newsData, History, isAllLoad, skelOffsetTop, scrollLoading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    return () => cancelToken.cancel("cancel");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isAllLoad && !loading && currentId !== '-1' && newsData.length === 0) {
      setLoading(true)
      History(-1, 24)
    }
  }, [History, newsData, isAllLoad, loading, currentId]);

  useEffect(() => {
    if (currentId === '') {
      history.replace("/")
    }
  }, [currentId, history]);

  return (
    <Box className={classes.root}>
      {newsData.length === 0 && loading ? <CircularProgress /> : null}
      {newsData.length === 0 && !loading && currentId !== '-1' ? <Box>열람한 뉴스가 없습니다.</Box> : null}
      <Box className={classes.grid} display="flex" width="100vw">
        {['', '', '', ''].slice(0, colsCount).map((t, k) => (
          <Grid container direction="column" style={{ height: "auto", flex: '4' }} key={k}>
            {newsData.slice(0, newsData.length).filter((x, idx) => idx % colsCount === k).map((tile, key) => (
              <Grid item key={key} className={classes.gridContents} style={{ padding: "none" }}>
                <Contents news={tile} currentId={currentId} deleteable={true} />
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