import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  state = {currPag:""}

  hello()
  {
    alert("Hello");
  }

  changePage()
  {
    console.log(this.state.currPage)
    if(this.state.currPage === "about")
    return(
      <div style={{width:'100%', height:'100%', backgroundColor:"#dddddd"}}>
        <img src={logo} style={{width:200, height:200}} />
      </div>
    )

    else if(this.state.currPage === "project")
    return(
      <p>manee</p>
    )

    else
    return(
      <p>meee</p>
    )
  }
  render() {
    return (
      <div className="App">
        <header style={{width:"100%",height:60, backgroundColor:"#272727"}}>
          <table style={{position:"absolute", right:40,top:10}}>
            <tr>
              <td><label onClick={()=>{this.setState({currPage:"home"})}}>Home</label></td>
              <td><label onClick={()=>{this.setState({currPage:"project"})}}>Projects</label></td>
              <td><label onClick={()=>{this.setState({currPage:"about"})}}>About</label></td>
              <td><label onClick={()=>{this.setState({currPage:"contact"})}}>Contact Us</label></td>
            </tr>
          </table>
        </header>
        <div>
          {
            this.changePage()
          }
        </div>
      </div>
    );
  }
}

export default App;
