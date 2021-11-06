import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import ServiceList from './components/ServiceList';
import Service from './components/Service';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/services' />
        </Route>
        <Route exact path='/services' component={ServiceList} />
        <Route exact path='./services/:id/details' component={Service} />
      </Switch>
    </Router>
  );
}

export default App;
