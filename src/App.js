import { useEffect, useCallback } from 'react';
import Main from "./components/Main";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { getStatusRequest, logoutRequest, getStatusFailure } from './actions/authentication';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';
import Body from './components/Body/Body';
import Like from './components/Body/Like';
import History from './components/Body/History';
import Trending from './components/Body/Trending';
import NewsAgencyBookmark from './components/Body/NewsAgencyBookmark/index';


function App() {
  const history = useHistory()
  const dispatch = useCallback(useDispatch(), [])
  const isLoggedIn = useSelector(store => store.authentication.status.isLoggedIn)
  

  useEffect(() => { //컴포넌트 렌더링이 맨 처음 완료된 이후에 바로 세션확인
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
          // document.cookie = 'key=' + btoa(JSON.stringify(loginData)) + ';path=/;';
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

          // document.cookie = 'key=' + btoa(JSON.stringify(loginData)) + ';path=/;';
        }
      }
    )
  }, [])

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => (
          <Main {...props} Body={Body}/>
        )} />
        <Route exact path="/trending" render={(props) => (
          <Main {...props} Body={Trending}/>
        )} />
        <Route exact path="/history" render={(props) => (
          <Main {...props} Body={History}/>
        )} />
        <Route exact path="/like" render={(props) => (
          <Main {...props} Body={Like}/>
        )} />
        <Route exact path="/newsAgencyBookmark" render={(props) => (
          <Main {...props} Body={NewsAgencyBookmark}/>
        )} />
      </Switch>
    </Router>
  );
}

export default App;
