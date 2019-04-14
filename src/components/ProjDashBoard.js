import React, {Component} from 'react';
import {Tab, Tabs, Grid, Cell, Card, CardTitle, CardActions, CardMenu, Button, IconButton, CardText,
        FABButton, Icon} from 'react-mdl';
import {Modal,InputGroup,FormControl,Dropdown, DropdownButton} from 'react-bootstrap';
import fire from '../config/firebaseConfig';
export default class ProjDashBoard extends Component {
    
    state = {activeTab:0, projects:[], modalShow:false, title:"", description:"", gitLink:"", curUid:"", selectLab:"DropDown"}

    handleSubmit = (developer) => {
        this.setState({
            curUid: developer
        },()=>{
            var path = "/project/" + this.state.curUid
            this.props.history.push(path)
        })
    }

    componentDidMount()
    {
        if(fire.auth().currentUser !== null)
        console.log(fire.auth().currentUser.uid)
        var projects = []
        var projCtr = 0;
        fire.database().ref('projects/').on('value',(snap)=>{
            var project = []
            Object.values(snap.val()).map(proj => {
                console.log(projCtr)
                if(projCtr%3==0)
                {
                    if(projCtr!=0)
                        {
                            //console.log(projCtr)
                            projects.push(<Grid>
                                {project}
                            </Grid>)
                        project = []
                        }
                    
                }
                //
                var images = ["https://images.unsplash.com/photo-1551169795-9e8eb7adb400?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80",
                            "https://images.unsplash.com/photo-1517167685284-96a27681ad75?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
                        "https://images.unsplash.com/photo-1551419762-4a3d998f6292?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
                    "https://images.unsplash.com/photo-1552688419-9949ce9dd731?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"]
                
                var rand = Math.floor(Math.random() * (4 - 0))
                
                var background = "url("
                background = background + images[rand] + ")"
                console.log(background)
                project.push(<Cell col={4} ><Card shadow={5} style={{width: '300px',height:"300px", margin: 'auto', borderRadius:'20px'}}>
                        <CardTitle style={{color: '#fff', height: '176px', background: background}}>{proj.title}</CardTitle>
                        <CardText style={{height:'60px', color:"black", fontSize:16}}>{this.maxLength(proj.description)}</CardText>
                        <CardActions style={{height:'50px',}} border>
                        <CardText style={{color:"black", fontSize:16}}>{proj.Lab}</CardText>
                        </CardActions>
                        <CardActions border>
                            <Button onClick={this.handleSubmit.bind(this, proj.developer)} colored centered>View Project</Button>
                            </CardActions>
                        <CardMenu style={{color: '#fff'}}>
                            <IconButton name="share" />
                        </CardMenu>
                    </Card></Cell>)
                projCtr = projCtr +1 
            })
            projects.push(<Grid>{project}</Grid>)
            console.log(projects)
            this.setState({projects:projects});
        });
    }


    

    maxLength(str)
    {   
        var maxlen = 40
        if(str.length>maxlen)
        {
            str = str.slice(0,maxlen);
            str = str+" ...."
            return str;
        }
        else
            return str
    }

    submitFirebase() {
        fire.database().ref(`projects/`+ (99999999999-Math.floor(Date.now() / 1000))).set({
            title:this.state.title,
            description:this.state.description,
            gitLink: this.state.gitLink,
            developer: fire.auth().currentUser.uid
        })
    }

    toggleCategories(){
        if(this.state.activeTab===0)
        {
           
            return this.state.projects
            
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

    addProjectModal()
    {
        
        return  <Modal
                    show={this.state.modalShow}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    >
                    <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Your Project
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body >

                        <div style={{display: 'flex',flexDirection:'column', alignItems:'center'}}>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl
                        onChange={title => this.setState({title:title.target.value})}
                        placeholder="Project Title"
                        aria-label="Title"
                        aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text>Description</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={desc => this.setState({description:desc.target.value})} 
                                    as="textarea" aria-label="With textarea" />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                        <InputGroup.Text id="basic-addon3">
                            Github Link
                        </InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl onChange={git => this.setState({gitLink:git.target.value})} 
                                    id="basic-url" aria-describedby="basic-addon3" />
                    </InputGroup>

                    <InputGroup className="mb-3">
                            <DropdownButton
                            as={InputGroup.Prepend}
                            variant="outline-secondary"
                            title="Select Project Category"
                            id="input-group-dropdown-1"
                            onSelect={(evt)=>{
                                this.setState({selectLab:evt})
                            }}
                            >
                            <Dropdown.Item eventKey="AI and ML Innovation Lab">AI & ML Lab</Dropdown.Item>
                            <Dropdown.Item eventKey="Mobile Innovation Lab">MIL</Dropdown.Item>
                            <Dropdown.Item eventKey="SocioTech Innovation Lab">SIL</Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item eventKey="General">General</Dropdown.Item>
                            </DropdownButton>
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{paddingLeft:'60px', paddingRight:'60px'}}>{this.state.selectLab}</InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>

                        
                    <input  type="submit" value="Submit" onClick={this.submitFirebase.bind(this)} className="subbtn" style={{}}/>
                    </div>
                    </Modal.Body>
                    <Modal.Footer>

                    <Button onClick={this.onHide.bind(this)}>Close</Button>
                    </Modal.Footer>
                    </Modal>
    }


    onDrop= (files)=> {
        console.log(files);
    }


    onHide(){
        this.setState({ modalShow: false });
    }

    render()
    {   

        return(
            <div>
                <div>
                <Tabs activeTab={this.state.activeTab} style={{background:"#feda6a"}} onChange={ (tabId)=> {this.setState({ activeTab:tabId }) } } ripple>
                    <Tab>All Projects</Tab>
                    <Tab>Department Projects</Tab>
                    <Tab>AIML Projects</Tab>
                </Tabs>
                </div>

                {this.addProjectModal()}

                <div>
                <FABButton colored ripple style={{margin: '0px',
                                                top: 'auto',
                                                right: '20px',
                                                bottom: '20px',
                                                left: 'auto',
                                                position: 'fixed'}}
                                                
                                                onClick={()=> this.setState({modalShow:true })}>
                        <Icon name="add" />
                </FABButton>
                </div>
                    <div className="cat">  
                        {this.toggleCategories()}
                    </div>
                
                    
                </div>
        )
    }
}