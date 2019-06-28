import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { LoadApplicationState } from '../utils/localStorage'

import Description from '../description'
import UserRoute from './user'

class Router extends Component {

  constructor(props){
    super(props)
    this.loadData = this.loadData.bind(this)
    this.reload = this.reload.bind(this)

    this.loadData()

    console.log('V 1.0')
  }

  loadData(){
    var data = LoadApplicationState()
    this.state = {
      isLoggedIn: data ? true : false,
      user: data
    }
  }

  reload(){
    var data = LoadApplicationState()
    this.setState({
      isLoggedIn: data ? true : false,
      user: data
    })
  }

  render() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/pet-event/" exact={true} render={ 
                  (props) => <Description isLoggedIn={ this.state.isLoggedIn } {...props} /> 
                }/>

                <Route path="/users/" render={ 
                  (props) => <UserRoute reload={ this.reload } user={ this.state.user } {...props}/>
                }/>

                <Route path="/pet-event/users/" render={ 
                  (props) => <UserRoute reload={ this.reload } user={ this.state.user } {...props}/>
                }/>
                
                <Route path='*' render={ 
                  (props) => <Description isLoggedIn={ this.state.isLoggedIn } {...props} /> 
                }/>
            </Switch>
        </ BrowserRouter>
    );
  }

}

export default Router;
