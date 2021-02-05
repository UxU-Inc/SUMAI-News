import React, { useState, useEffect, useCallback, useRef } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import CircularProgress from '@material-ui/core/CircularProgress';

import axios from 'axios';
import { useSelector } from 'react-redux';

import Contents from './Contents';
import useSkeletonHandler from './useSkeletonHandler';
import { useStyles } from './BodyStyles';

function shuffle(a) {
  var j, x, i;
  for (i = a.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
  return a
}

export default function Body(props) {
  const { colsCount } = props
  const classes = useStyles();
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [scrollLoading, setScrollLoading] = useState(false)
  const [isAllLoad, setIsAllLoad] = useState(false)
  const [isRecommend, setIsRecommend] = useState(true)
  const currentId = useSelector(store => store.authentication.status.currentId)

  const itemRef = useRef([])

  const [skelOffsetTop, hideSkel] = useSkeletonHandler(newsData, colsCount, itemRef)

  const cancelToken = axios.CancelToken.source()

  const NewsMain = useCallback((idx, cnt, check) => {
    const id = currentId
    axios.post('/api/news/main', { id, idx, cnt, check }, { cancelToken: cancelToken.token })
      .then((response) => {
        const data = shuffle(response.data.slice(0, -1)).concat(response.data[cnt - 1])
        setNewsData(newsData.concat(data))
        if (response.data.length < cnt || newsData.length >= 288) {
          setIsAllLoad(true)
        }
        if (isRecommend && !response.data[cnt - 1].ranking) {
          setIsRecommend(false)
        }
        setLoading(false)
      }).catch((error) => {

      })
  }, [newsData, currentId, cancelToken, isRecommend])

  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;

    if (newsData[newsData.length - 1] && (scrollHeight - innerHeight - scrollTop < 300 || skelOffsetTop - innerHeight - scrollTop < -200)
      && !loading && !scrollLoading && !isAllLoad) {
      setLoading(true)
      setScrollLoading(true)
      NewsMain(newsData[newsData.length - 1].ranking || newsData[newsData.length - 1].idx, 24, isRecommend)
    } else if (scrollLoading) {
      setScrollLoading(false)
    }
  }, [loading, newsData, NewsMain, isAllLoad, skelOffsetTop, scrollLoading, isRecommend]);

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
      if (currentId === "") setIsRecommend(false)
      setLoading(true)
      NewsMain(-1, 24, isRecommend)
    }
  }, [NewsMain, newsData, isAllLoad, loading, currentId, isRecommend]);

  return (
    <Box className={classes.root}>
      {newsData.length === 0 && loading ? <CircularProgress /> : null}
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