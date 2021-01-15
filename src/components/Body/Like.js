import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

import axios from 'axios';
import { useSelector } from 'react-redux';

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
    margin: "16px 8px",
    [theme.breakpoints.between(0, 580)]: {
      margin: '0px 0px 15px 0px',
    },
    [theme.breakpoints.between(580, 640)]: {
      margin: '0px 0px 15px 0px',
    },
    [theme.breakpoints.between(640, 760)]: {
      margin: '8px 4px',
    },
    [theme.breakpoints.between(760, 840)]: {
      margin: '16px 8px',
    },
    [theme.breakpoints.between(840, 1050)]: {
      margin: '16px 4px',
    },
    [theme.breakpoints.between(1050, 1100)]: {
      margin: '16px 4px',
    },
    [theme.breakpoints.between(1100, 1300)]: {
      margin: '16px 4px',
    },
  },
  gridListTile: {
    padding: '0px 8px 16px 8px',
    [theme.breakpoints.between(0, 580)]: {
      padding: '0px 0px 15px 0px',
    },
    [theme.breakpoints.between(580, 640)]: {
      padding: '0px 0px 16px 0px',
    },
    [theme.breakpoints.between(640, 760)]: {
      padding: '0px 4px 16px 4px',
    },
    [theme.breakpoints.between(760, 840)]: {
      padding: '0px 8px 16px 8px',
    },
    [theme.breakpoints.between(840, 1050)]: {
      padding: '0px 4px 16px 4px',
    },
    [theme.breakpoints.between(1050, 1100)]: {
      padding: '0px 4px 16px 4px',
    },
    [theme.breakpoints.between(1100, 1300)]: {
      padding: '0px 4px 16px 4px',
    },
  }
}));


export default function Like() {
  const classes = useStyles();
  const [newsData, setNewsData] = useState([])
  const [dataCount, setDataCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [viewCount, setViewCount] = useState(0)
  const [isAllLoad, setIsAllLoad] = useState(false)
  const [hideSkel, setHideSkel] = useState([])
  const currentId = useSelector(store => store.authentication.status.currentId)

  const itemRef = useRef([])

  const theme = useTheme();
  const xsm = useMediaQuery(theme.breakpoints.between(xs_size, xsm_size));
  const sm = useMediaQuery(theme.breakpoints.between(xsm_size, sm_size));
  const md = useMediaQuery(theme.breakpoints.between(sm_size, md_size));

  const ColsCount = useCallback(() => {
    if(xsm)     setViewCount(1);
    else if(sm) setViewCount(2);
    else if(md) setViewCount(3);
    else        setViewCount(4);
  }, [xsm, sm, md])

  const LikedNews = useCallback((time, cnt) => {
    const id = currentId
    axios.post('http://localhost:3306/api/news/likednews', { id, time, cnt })   //링크 바꿔야됨
    .then((response) => {
      setNewsData(newsData.concat(response.data))
      if(response.data.length < cnt) {
          setIsAllLoad(true)
      }
      setLoading(false)
    }).catch((error) => {

    })
  }, [newsData, currentId])

  const handleSkeleton = useCallback(() => {
    let arr = [], temp = []
    let sum = 0
    for(let i=0; i<viewCount; i++) {
      arr[i] = itemRef.current[i].offsetTop
      sum += arr[i]
    }
    sum /= viewCount
    arr.forEach((el, i) => {
      arr[i] -= sum
      if(arr[i] > 200) temp[i] = true
    })
    setHideSkel(temp)
    console.log(arr)
  }, [viewCount]);

  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    
    if (newsData[newsData.length-1] && scrollHeight - innerHeight - scrollTop < 250 && !loading && !isAllLoad) {
      setLoading(true)
      LikedNews(newsData[newsData.length-1].requestTime, viewCount*3-(dataCount%viewCount))
      setDataCount(dataCount+viewCount*3-(dataCount%viewCount))
      console.log(newsData[newsData.length-1].requestTime)
    }
  }, [loading, newsData, dataCount, viewCount, LikedNews, isAllLoad]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    ColsCount()
    handleSkeleton()
    let requestTime = null
    if(newsData[newsData.length-1]) requestTime = newsData[newsData.length-1].requestTime;
    else requestTime = -1;

    if(dataCount < viewCount*3) {
      setLoading(true)
      LikedNews(requestTime, viewCount*3-(dataCount%viewCount))
      setDataCount(dataCount+viewCount*3-(dataCount%viewCount))
    } else if(dataCount%viewCount){
      setDataCount(dataCount-(dataCount%viewCount))
    }
  }, [ColsCount, viewCount, LikedNews, newsData, dataCount, handleSkeleton]);
  
  return(
    <Box className={classes.root}>
      {newsData.length === 0? <Box>좋아요를 누른 뉴스가 없습니다.</Box>:null}
      <Box display="flex">
        {['', '', '', ''].slice(0, viewCount).map((t, k) => ( 
        <Grid container direction="column" style={{height:"auto"}} key={k}>
          {newsData.filter((x, idx) => idx%viewCount===k).map((tile, key) => (
          <Grid item key={key}>
            <Contents news={tile} currentId={currentId}/>
          </Grid>
          ))}
          <Grid style={newsData.length === 0? {display:"none"}:{padding: "10px"}} ref={(el) => itemRef.current[k] = el}>
          {!isAllLoad && !hideSkel[k]? <><Skeleton variant="text" height={100} />
          <Skeleton variant="rect" height={300} /></>:null}
          </Grid>
        </Grid>
        ))}
      </Box>
    </Box>
  )
}