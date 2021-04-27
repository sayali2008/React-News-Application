import React,{useState} from "react";
import {Component} from 'react';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';
import {MdExpandMore} from 'react-icons/md';
import {MdExpandLess} from 'react-icons/md';
import './smsl.css';

// const Smsl = (props) => {
    
  class Smsl extends Component{


    constructor(props) {
      super(props);
      this.state = {
        open:false,
        setOpen:false,
        isClicked:false
      }
      this.handleClick = this.handleClick.bind(this);
    }
    // state={
    //   open:false,
    //   setOpen:false,
    //   isClicked:false
    // }
    handleClick() {
      const { open } = this.state;
      const { setOpen } = this.state;
      const { isClicked } = this.state;
      if(open==false)
      {
      this.setState({ open:true  });
      this.setState({ setOpen:true  });
      this.setState({ isClicked:true  });
      }
      if(open==true)
      {
        {
          this.setState({ open:false  });
          this.setState({ setOpen:false  });
          this.setState({ isClicked:false  });
          }
      }
    }
    render(){

      const { open } = this.state;
      const { setOpen } = this.state;
      const { isClicked } = this.state;
  
    return (
      <>
        

         <Button
            onClick={this.handleClick}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            style = {{display: isClicked ? 'none' : 'inline'}}
         >
        <h3 id="showmore"  ><MdExpandMore ></MdExpandMore> </h3>
      </Button>
      
        <Collapse in={open}>
          <div id="example-collapse-text">
            <p>{this.props.desc}</p>
            <Button
        onClick={this.handleClick}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      ><h3><MdExpandLess></MdExpandLess></h3>
      </Button>
      
          </div>
        </Collapse>
      </>
    );
  }
}

export default Smsl;