import React, {Component} from 'react';
import fire from '../config/firebaseConfig'
import {Spinner } from 'react-bootstrap';

export default class ProjectDetails extends Component{

    state = {description:null, title:null, developer:null, processing: true}

    componentDidMount()
    {
        var uri = this.props.location.pathname;
        uri = uri.split("/")[2];
        
        fire.database().ref(`projects/`).on('value',(snap)=>{
            Object.values(snap.val()).map((proj)=>{
                if(proj.developer==uri)
                {
                    this.setState({title:proj.title, description: proj.description, developer: proj.developer,  processing:false})
                }
            })
        })
    }

    loadDescription(){

        if(this.state.processing!=true)
        {
            return <div>
                      <h2>Title</h2>
                      <p>{this.state.title}</p>

                      <h2>Description</h2>
                      <p>{this.state.description}</p>

                      <h2>Developer</h2>
                      <p>{this.state.developer}</p>

                    </div>
        }
        else{
            return <div className="Spinner">
                <Spinner animation="grow" style={{width:"100px", height:"100px"}}/>
            </div>
        }
        
    }

    render()
    {
        console.log("Hey welocme to details")
        return <div class="title">
        
 
< div>
<h2>Project title</h2>
</div>

<div class="video">

<iframe width="560" height="315"  align="right"  src="https://www.youtube.com/embed/9YffrCViTVk" frameborder="0" allow="accelerometer; autoplay; encrypted-media; 
gyroscope; picture-in-picture" allowfullscreen></iframe>

</div>	

<div class="text">
   <h3>Project Description</h3>
  </div>


<div class="Info">

<textarea rows="15" cols="80">

This project is used to deal with situations where.....

</textarea>
</div>
     
<div class="text" align="middle">
   <h3>OUR TEAM</h3>
  </div>
  
  <div class="picture" align="middle">

   <img src="https://www.learnyst.com/assets/exams/iim-258817ed8647ec6ffbaabc591dbfa144613fd0d3889545f94db034b421230e63.png" class="first" />
   <img src="https://www.learnyst.com/assets/exams/sreeni-e4f36ac7e3259008cf23e0e335929063e9db15a8134d3479e29655c3a24f48e3.png" class="second"  />
   <img src="https://www.learnyst.com/assets/exams/customer_ravi-d5e52313ca7576fe0c072b98828a190a49a3fdd3214dd421ee6e67c0206ff8f5.jpg" class="third" />


  </div>
</div>
    }
}