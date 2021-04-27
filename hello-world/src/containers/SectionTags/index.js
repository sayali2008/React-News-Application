import Badge from 'react-bootstrap/Badge'
import React, { Component } from 'react';

export default class SectionTags extends  React.Component
{
    constructor(props){
        super();
        this.state = {
            tagname:"default"
        }
    }
    // function checksection()
    // {
        
    // }
    render()
    {      
        return (<h6>
            <Badge id="sectag"

            style={{
                backgroundColor: this.props.tagname == "BUSINESS" ? '#4595EB' : 
                this.props.tagname == "WORLD" ? '#852FBA' :
                this.props.tagname == "POLITICS" ? '#83B9B1' :
                this.props.tagname == "TECHNOLOGY" ? '#CEDC39' :
                this.props.tagname == "SPORTS" || this.props.tagname == "SPORT" ? '#F6C244' : 
                this.props.tagname == "NYTIMES" ? '#DADADA': 
                this.props.tagname == "GUARDIAN" ? '#0D2247': '#6D747B',
                color: this.props.tagname == "BUSINESS" ? 'white' : 
                this.props.tagname == "WORLD" ? 'white' :
                this.props.tagname == "POLITICS" ? 'white' :
                this.props.tagname == "TECHNOLOGY" ? 'black' :
                this.props.tagname == "SPORTS" || this.props.tagname == "SPORT" ? 'black' : 
                this.props.tagname == "NYTIMES" ? 'black': 
                this.props.tagname == "GUARDIAN" ? 'white': 'white',
              }}>{this.props.tagname}</Badge>
            </h6>
            );
    }
    
}