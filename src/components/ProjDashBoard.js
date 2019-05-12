import React, {Component} from 'react';
import {Tab, Tabs, Grid, Cell, Card, CardTitle, CardActions, CardMenu, Button, IconButton, CardText,
        FABButton, Icon} from 'react-mdl';
import {Modal,InputGroup,FormControl,Dropdown, DropdownButton} from 'react-bootstrap';
import fire from '../config/firebaseConfig';
import Particles from "react-particles-js";

export default class ProjDashBoard extends Component {
    
    state = {activeTab:0, projects:[], modalShow:false, title:"", description:"", gitLink:"", curUid:"", selectLab:"DropDown", heightCtr:0}

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
        var aiMLProjects = []
        var projCtr = 0;
        var aimlctr = 0;
        var heightCtr = 0;
        fire.database().ref('projects/').on('value',(snap)=>{
            var project = []
            var aimlProj = []
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

                if(aimlctr%3==0)
                {
                    if(aimlctr!=0)
                        {
                            //console.log(projCtr)

                            aiMLProjects.push(<Grid>
                                {aimlProj}
                            </Grid>)
                            heightCtr = heightCtr + 1;
                        aimlProj = []
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
                console.log(proj.Lab) 
                if(typeof proj.Lab !== undefined && proj.Lab!= null)
                {
                    console.log("asdasdasd", typeof proj.Lab)
                if(proj.Lab == "AI and ML Innovation Lab")
            {
             aimlProj.push(<Cell col={4} ><Card shadow={5} style={{width: '300px',height:"300px", margin: 'auto', borderRadius:'20px'}}>
                <CardTitle style={{color: '#fff', height: '176px', background: background}}>{proj.title}</CardTitle>
                <CardActions style={{height:'80px',}} border>
                <CardText style={{height:'80px', color:"black", fontSize:16}}>{this.maxLength(proj.description, 60)}</CardText>
                </CardActions>
                <CardActions border>
                    <Button onClick={this.handleSubmit.bind(this, proj.developer)} colored centered>View Project</Button>
                    </CardActions>
                <CardMenu style={{color: '#fff'}}>
                    <IconButton name="share" />
                </CardMenu>
            </Card></Cell>
                )
                aimlctr = aimlctr + 1   
            }
        }
            })

            aiMLProjects.push(<Grid>{aimlProj}</Grid>)
            projects.push(<Grid>{project}</Grid>)
            console.log(projects)
            this.setState({projects:projects, aiMLProjects: aiMLProjects, heightCtr : heightCtr});
        });
    }


    

    maxLength(str, maxlen=40)
    {   
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
                    <h1>All the department projects will be displayed here</h1>
                </div>
            )
        }

        else
        {
            return <div>{this.state.aiMLProjects}</div>
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

    backgroundParticles()
    {
        return(
            <div className="particle">
                <Particles
        canvasClassName="canvas"
        params={{
            "particles": {
              "number": {
                "value": 80,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#ffffff"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 0.5,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 3,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": 6,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": true,
                  "mode": "grab"
                },
                "onclick": {
                  "enable": true,
                  "mode": "push"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          }}
      />
                </div>
        )
    }

    render()
    {   

        return(
            <div>
                
                {this.backgroundParticles()}
                <div style={{position:'relative'}}>
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

                
                    <div style={{paddingLeft:200, paddingRight:200}}>  
                        {this.toggleCategories()}
                    </div>

                    
                </div>
        )
    }
}
