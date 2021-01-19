import React, { useState, useEffect, useCallback, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';

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


export default function History(props) {
  const { colsCount, lg } = props
  const classes = useStyles();
  const [newsData, setNewsData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isAllLoad, setIsAllLoad] = useState(false)
  const [hideSkel, setHideSkel] = useState([])
  const currentId = useSelector(store => store.authentication.status.currentId)

  const itemRef = useRef([])

  const History = useCallback((time, cnt) => {
    const id = currentId
    axios.post('http://localhost:3306/api/news/history', { id, time, cnt })   //링크 바꿔야됨
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
    for(let i=0; i<colsCount; i++) {
      arr[i] = itemRef.current[i].offsetTop
      sum += arr[i]
    }
    sum /= colsCount
    arr.forEach((el, i) => {
      if(arr[i] - sum > 200) temp[i] = true
    })
    setHideSkel(temp)
  }, [colsCount]);

  const handleScroll = useCallback(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    // IE에서는 document.documentElement 를 사용.
    const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
    
    if (newsData[newsData.length-1] && scrollHeight - innerHeight - scrollTop < 300 && !loading && !isAllLoad) {
      setLoading(true)
      History(newsData[newsData.length-1].requestTime, colsCount===1? 12:24)
    }
  }, [loading, newsData, colsCount, History, isAllLoad]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    handleSkeleton()
  }, [handleSkeleton]);

  useEffect(() => {
    if(!isAllLoad && !loading && currentId !== '-1' && newsData.length < (colsCount===1? 12:24)) {
      let requestTime = null
      if(newsData[newsData.length-1]) requestTime = newsData[newsData.length-1].requestTime;
      else requestTime = -1;
      setLoading(true)
      History(requestTime, colsCount===1? 12:24)
    }
  }, [colsCount, History, newsData, isAllLoad, loading, currentId]);
  
  return(
    <Box className={classes.root}>
      {newsData.length === 0 && !loading && currentId !== '-1'? <Box>열람한 뉴스가 없습니다.</Box>:null}
      <Box display="flex" width="100vw">
        {['', '', '', ''].slice(0, colsCount).map((t, k) => ( 
          // 창 크기가 lg이고, colsCount가 1일 경우 margin-left는 150px, max-width는 1000px
          <Grid container direction="column" style={{height:"auto", marginLeft:lg&&colsCount===1? '150px': 0, maxWidth:lg&&colsCount===1? '1000px': 'none'}} key={k}>
            {newsData.slice(0, newsData.length).filter((x, idx) => idx%colsCount===k).map((tile, key) => (
              <Grid item key={key} className={classes.gridContents} style={{padding: "none"}}>
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