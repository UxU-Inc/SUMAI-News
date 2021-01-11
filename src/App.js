import Main from "./components/Main";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  
  return (
    <Router>
      <div>
        <Route exact path="/" component={ Main } />
      </div>
    </Router>
  );
}

export default App;
