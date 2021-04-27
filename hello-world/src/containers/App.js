import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyNavbar from './Navbar';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import World from './World';
import Politics from './Politics';
import Business from './Business';
import Technology from './Technology';
import Sports from './Sports';
import Bookmark from './Bookmark';
import Detailed from './Detailed';
import SearchPage from './SearchPage';

class App extends React.Component {

  render() {
    return (
      <div className="App">
          <header className = "App-header">
              <MyNavbar className="navigation"/>
          </header> 
          <div>
                <Switch>
                  <Route exact path="/" component={Home} exact />
                  <Route exact path="/world" component={World} />
                  <Route exact path="/politics" component={Politics} />
                  <Route exact path="/business" component={Business} />
                  <Route exact path="/technology" component={Technology}/>
                  <Route exact path="/sports" component={Sports} />
                  <Route exact path="/bookmark" component={Bookmark} />
                  <Route path="/search" component={SearchPage} />
                  <Route path="/article" component={Detailed} />
                  
                </Switch>
              </div>  
              
     </div>
    );
  } 
}

export default App;
