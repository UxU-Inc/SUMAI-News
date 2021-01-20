import Main from "./components/Main";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Body from './components/Body/Body';
import Like from './components/Body/Like';
import History from './components/Body/History';
import Trending from './components/Body/Trending';
import NewsAgencyBookmark from './components/Body/NewsAgencyBookmark/index';
import NotFound from './components/NotFound'


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={(props) => (
          <Main {...props} Body={Body} />
        )} />
        <Route exact path="/trending" render={(props) => (
          <Main {...props} Body={Trending} />
        )} />
        <Route exact path="/history" render={(props) => (
          <Main {...props} Body={History} />
        )} />
        <Route exact path="/like" render={(props) => (
          <Main {...props} Body={Like} />
        )} />
        <Route exact path="/newsAgencyBookmark" render={(props) => (
          <Main {...props} Body={NewsAgencyBookmark} />
        )} />

        <Route component={NotFound} status={404} />
      </Switch>
    </Router>
  );
}

export default App;
