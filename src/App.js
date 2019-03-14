import React, { Component } from 'react';
import {Layout, Header, Navigation, Drawer, Content} from 'react-mdl';
import './App.css';
import Root from './components/root';
import {Link} from 'react-router-dom';

class App extends Component {

  render() {
    return (
      <div className="nav-bar">
    <Layout>
        <Header className="header-color" title="Title" scroll>
            <Navigation>
                <Link to="/projects">Project DashBoard</Link>
                <Link to="/profile">Profile</Link>
                <Link to="#">Link</Link>
                <Link to="#">Link</Link>
            </Navigation>
        </Header>
        <Drawer title="Title">
            <Navigation>
                <Link to="#">Link</Link>
                <Link to="#">Link</Link>
                <Link to="#">Link</Link>
                <Link to="#">Link</Link>
            </Navigation>
        </Drawer>
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
