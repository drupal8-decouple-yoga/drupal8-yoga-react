import React,{ Component } from 'react';
import { Router, Switch, Route  } from 'react-router-dom';



import Home from './../pages/Home';
import Yogalisting from './../pages/Yogalisting';
import Detailview from './../pages/Detailview';

import Navbar from './../components/Navbar';

import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory();


export default class Layout extends Component{ 
  componentDidMount(){
    history.listen((location, action) => {
      //console.log(action, location.pathname, location.state)
      const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
      if (path) {
          history.replace(path);
       }
    })
  }
render(){
    return (
      <div>
        <Router history={history}>
          <div className="mid-block">
            <Navbar/>
            <div className="container-fluid">
              <Switch>
                <Route path="/" exact={true} component={Home} />
                <Route path='/yogalist' component={Yogalisting}  />
                <Route path="/detailview/:id" component={Detailview}/> 
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}