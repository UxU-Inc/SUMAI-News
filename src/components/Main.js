import React, { useState, useEffect, useCallback } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';

import { getStatusRequest, logoutRequest, getStatusFailure } from '../actions/authentication';
import { useHistory, useLocation } from 'react-router-dom';

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
  
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(store => store.authentication.status.isLoggedIn)

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

  
  useEffect(() => { //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인
    console.log('act')
    // 쿠키 차단 설정 시 자동 로그아웃
    if (!navigator.cookieEnabled && isLoggedIn) {
      history.push("/")
      logoutRequest().then(
        () => {
          // EMPTIES THE SESSION
          let loginData = {
            isLoggedIn: false,
            email: ''
          };
          console.log('logout?')
          // document.cookie = 'key=' + btoa(JSON.stringify(loginData)) + ';path=/;'; // local에서 테스트 하기 위해 주석 처리
        }
      );
    }

    // get cookie by name
    function getCookie(name) {
      var value = "; " + document.cookie;
      var parts = value.split("; " + name + "=");
      if (parts.length === 2) return parts.pop().split(";").shift();
    }

    // get loginData from cookie
    let loginData = getCookie('key');
    // if loginData is undefined, do nothing
    if (typeof loginData === "undefined") {
      dispatch(getStatusFailure())
      return
    };

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    // if not logged in, do nothing
    if (!loginData.isLoggedIn) {
      dispatch(getStatusFailure())
      return
    };

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    getStatusRequest().then(
      (res) => {
        // if session is not valid
        if (res.type==="AUTH_GET_STATUS_FAILURE") {
          // logout the session
          loginData = {
            isLoggedIn: false,
            email: ''
          };

          // document.cookie = 'key=' + btoa(JSON.stringify(loginData)) + ';path=/;'; // local에서 테스트 하기 위해 주석 처리
        }
      }
    )
  }, [dispatch, history, isLoggedIn, location])

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