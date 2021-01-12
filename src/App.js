import {useEffect} from 'react';
import Main from "./components/Main";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { getStatusRequest, logoutRequest, getStatusFailure } from './actions/authentication';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTheme } from '@material-ui/core/styles';


function App() {
  const theme = useTheme()
  const history = useHistory()
  const state = useSelector(state => state)
  const valid = useSelector(state => state.authentication.status.valid)
  const isLoggedIn = useSelector(state => state.authentication.status.isLoggedIn)
  

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
      getStatusFailure()
      return
    };

    // decode base64 & parse json
    loginData = JSON.parse(atob(loginData));

    // if not logged in, do nothing
    if (!loginData.isLoggedIn) {
      getStatusFailure()
      return
    };

    // page refreshed & has a session in cookie,
    // check whether this cookie is valid or not
    getStatusRequest().then(
      (res) => {
        console.log(state)
        // if session is not valid
        if (!valid) {
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
      <div>
        <Route exact path="/" component={Main} />
      </div>
    </Router>
  );
}

export default App;
