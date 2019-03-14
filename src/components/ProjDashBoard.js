import React, {Component} from 'react';
import {Tab, Tabs, Grid, Cell, Card, CardTitle, CardActions, CardMenu, Button, IconButton, CardText} from 'react-mdl';
import fire from '../config/firebaseConfig';
export default class ProjDashBoard extends Component {
    
    state = {activeTab:0, projects:""}

    componentDidMount()
    {
        fire.database().ref('projects/').on('value',(snap)=>{
            this.setState({projects:snap.val()});
        });
    }

    maxLength(str)
    {   
        var wordArray = str.split(" ");
        var maxlen = 10
        if(wordArray.length>maxlen)
        {
            wordArray = wordArray.slice(0,maxlen);
            wordArray = wordArray.join(" ");
            wordArray = wordArray+"..."
            return wordArray;
        }
        else
            return str
    }

    renderProjects()
    {   
        console.log(typeof this.state.projects)
        if(this.state.projects!="")
        {
            return Object.values(this.state.projects).map(proj => 
                <Card shadow={5} style={{minwidth: '512px', margin: 'auto'}}>
                                <CardTitle style={{color: '#fff', height: '176px', background: 'url(http://www.getmdl.io/assets/demos/welcome_card.jpg) center / cover'}}>{proj.title}</CardTitle>
                                <CardText>{this.maxLength(proj.description)}</CardText>
                                <CardActions border>
                                    <Button colored>View Project</Button>
                                </CardActions>
                                <CardMenu style={{color: '#fff'}}>
                                    <IconButton name="share" />
                                </CardMenu>
                            </Card>)
        }
        
    }

    toggleCategories(){
        if(this.state.activeTab===0)
        {
            return(
                <div className="projects-grid">
                    {this.renderProjects()}
                </div>
            )
        }

        else if(this.state.activeTab===1)
        {
            return(
                <div>
                    <h1>Mama</h1>
                </div>
            )
        }

        else
        {
            return(
                <div>
                    <h1>Maams</h1>
                </div>
            )
        }
    }

    render()
    {   
        
        return(
            <div>
                <div className="sticky">
                <Tabs activeTab={this.state.activeTab} onChange={ (tabId)=> {this.setState({ activeTab:tabId }) } } ripple>
                    <Tab>All Projects</Tab>
                    <Tab>Department Projects</Tab>
                    <Tab>AIML Projects</Tab>
                </Tabs>
                </div>
                
                    <Grid>
                        <Cell col={12}>
                            <div className="content"> 
                                {this.toggleCategories()}
                                {this.toggleCategories()}
                                {this.toggleCategories()}
                                {this.toggleCategories()}
                            </div>
                        </Cell>
                    </Grid>
                   

            </div>
        )
    }
}