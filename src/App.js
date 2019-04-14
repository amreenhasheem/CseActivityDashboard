import React, { Component } from 'react';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import './App.css';
import Root from './components/root';
import {Link} from 'react-router-dom';
import fire from './config/firebaseConfig';
import {Nav, Navbar} from 'react-bootstrap'

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
        return <Nav.Link style={{fontSize:16}} href="/auth">{this.state.fullName}</Nav.Link>
      }

      else
      {
        return <Nav.Link style={{fontSize:16}} href="/auth">Login</Nav.Link>
      }
  }

  render() {
    return (
      <div className="nav-bar">
    <Layout>
            <Navbar bg="dark" variant="dark" style={{height:'100px'}}>
            <img src="https://img.collegepravesh.com/2018/10/DSI-Bangalore-Logo.png" style={{width:'40px', height:'40px', marginRight:'20px'}} />
        <Navbar.Brand href="#home">CSE Dashboard</Navbar.Brand>
        <Nav className="ml-auto">
        <Nav.Link style={{fontSize:16}} href="/projects">Projects</Nav.Link>
        <Nav.Link style={{fontSize:16}} href="/profile">Features</Nav.Link>
        {this.profileCheck()}
        <Nav.Link style={{fontSize:16}}href="#">Pricing</Nav.Link>
        </Nav>
    </Navbar>
        <Content>
            <div className="page-content" />
            <Root />
        </Content>
    </Layout>
</div>
    );
  }
}

export default App;
