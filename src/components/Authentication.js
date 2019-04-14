import React, { Component } from 'react';
import { HashRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

import './App.css';
import fire from '../config/firebaseConfig';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
    }

  }
  componentDidMount(){
    this.authListener();
  }
  authListener(){

    fire.auth().onAuthStateChanged((user) =>{
      //console.log(user);
      if(user){
        this.setState({user});
        //localStorage.setItem('user',user.uid);
      }else{
        this.setState({user:null});
        //localStorage.removeItem('user');

      }
      });
    
  }
  render() {
    return (
        <div className="App">
          <div className="App__Aside"></div>
          <div className="App__Form">
            <div className="PageSwitcher">
                <NavLink to="/auth/sign-in" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                
                <NavLink exact to="/auth/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
              </div>

              <div className="FormTitle">
                  <NavLink to="/auth/sign-in" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign In</NavLink> or <NavLink exact to="/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">Sign Up</NavLink>
              </div>

              <Route exact path="/auth/" component={SignUpForm}>
              </Route>
              <Route path="/auth/sign-in" component={SignInForm}>
              </Route>
          </div>

        </div>
    );
  }
}

export default App;