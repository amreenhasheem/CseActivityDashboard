import React, {Component} from 'react';
import {Grid, Cell} from 'react-mdl';

export default class ProjDashBoard extends Component {
    render()
    {
        return(
            <div style={{width:'100%', margin:'auto'}}>
                <Grid className="demo-grid-ruler">
                    <Cell col={12}></Cell>
                </Grid>
            </div>
        )
    }
}