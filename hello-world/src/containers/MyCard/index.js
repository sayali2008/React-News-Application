import React,{Component} from "react";
import Media from 'react-bootstrap/Media';
import Card from 'react-bootstrap/Card';
import {Row,Col} from "react-bootstrap";
import './mycard.css';
import ShareButton from '../ShareButton';
import SectionTags from '../SectionTags';
import Image from 'react-bootstrap/Image';
import { MdTransferWithinAStation } from "react-icons/md";

export default class MyCard extends Component {
  constructor(props) {
      super(props);
      this.state = {
          c_title : "default",
          c_img : "default",
          c_desc : "default",
          c_date : "default",
          c_section : "default",
          c_url : "default",
          show: false
      }
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  }

  makedescshort(s) {
    if(s.length < 390) {
      return s;
    }
    console.log("Sent string = "+ s);
    s = s.substring(0,390);
    console.log("Cut string = "+ s);
    var i = 0, cut = "";
    if(s.includes(' ')) {
      for(i = s.length-1; i >=0; i--) {
          if(s[i] === ' ') {
              break;
          }
      }
      cut = s.substring(0,i)+'...';
      console.log("Final string = "+ cut);
      return cut;
  }
  else {
      cut = s + '...';
      return cut;
  }
  }

  handleClose(e) {
    // e.preventDefault();
    this.setState({
        show: false
    })
  }

  handleShow(e) {
      e.preventDefault();
      this.setState({
          show: true
      })
  }
        
    render(){
        
        // console.log("this.makedescshort(this.props.c_desc)="+this.makedescshort(this.props.c_desc));
        return(
          <Card id="topcardid" >
            {/* <Media> */}
            <Row >
              <Col lg={3} xs={11}>
            <Image  className="mainpageimg" src={this.props.c_img} thumbnail/>
            </Col>
              {/* <img id="imgmain" src={this.props.c_img} /> */}
              {/* <Media.Body> */}
              {/* <Card.Body> */}
              <Col xs={12} lg={9}>
                <h5 id="head">{this.props.c_title}<ShareButton  
                title = {this.props.c_title} 
                urll = {this.props.c_url}
                show = {this.state.show}
                handleClose = {this.handleClose}
                handleShow = {this.handleShow}
                >
                  </ShareButton></h5>
                <p id="para">
                  {this.makedescshort(this.props.c_desc)}
                </p>
                  <Row> 
                    <Col xs={6} md={10}>
                    <p id="para2">{this.props.c_date}</p>
                    </Col>
                    <Col xs={6} md={2}>
                      <h2><SectionTags id="bd" tagname = {this.props.c_section}></SectionTags></h2>
                    </Col>
                  </Row>
              {/* </Media.Body>
            </Media> */}
            {/* </Card.Body> */}
            </Col>
            </Row>
</Card>
        )
    }
}