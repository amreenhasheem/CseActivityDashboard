import React, { Component } from 'react';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import './App.css';
import Root from './components/root';
import {Link, BrowserRouter,Switch, Route} from 'react-router-dom';
import fire from './config/firebaseConfig';
import {Nav, Navbar} from 'react-bootstrap';
import ProjDashBoard from './components/ProjDashBoard';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import Authentication from './components/Authentication';
import ProjectDetails from './components/ProjectDetails';

class App extends Component {
    state = {user:null, fullName:""}

componentDidMount(){
    this.authListener();
}
authListener(){

    fire.auth().onAuthStateChanged((user) =>{
      //console.log(user);
      if(user){

        fire.database().ref(`users/${fire.auth().currentUser.uid}/`).on('value', (snap)=>{
            this.setState({user:fire.auth().currentUser.uid, fullName:snap.val().fullName});
        })

        
        //localStorage.setItem('user',user.uid);
      }else{
        this.setState({user:null});
        //localStorage.removeItem('user');

      }
      });
    
  }

  profileCheck()
  {
      if(this.state.user!== null)
      {
        return <Link style={{fontSize:16, marginRight:20, color:'#fff'}} to="/profile">{this.state.fullName}</Link>
      }

      else
      {
        return <Link style={{fontSize:16, marginRight:20, color:'#fff'}} to="/auth">Login</Link>
      }
  }

  render() {
    return (
      <div className="nav-bar">
        <Navbar bg="dark" variant="dark" className="navbar" sticky="top">
        <img src="https://img.collegepravesh.com/2018/10/DSI-Bangalore-Logo.png" style={{width:'40px', height:'40px', marginRight:'20px'}} />
        <Navbar.Brand href="#home">CSE Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
        <div>
        <Link style={{fontSize:16, marginRight:20, color:'#fff'}} to="/projects">Projects</Link>
        <Link style={{fontSize:16, marginRight:20, color:'#fff'}} to="/profile">Features</Link>
        {this.profileCheck()}
        <Link style={{fontSize:16, marginRight:20, color:'#fff'}}to="#">Pricing</Link>
        </div>
        </Nav>
        </Navbar>
        <div style={{width:"100%"}}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/projects" component={ProjDashBoard} />
          <Route path="/users" component={Profile} />
          <Route path="/auth" component={Authentication} />
          <Route path="/project/:ids" component={ProjectDetails} />
        </Switch>
        </div>
</div>
    );
  }
}

export default App;
