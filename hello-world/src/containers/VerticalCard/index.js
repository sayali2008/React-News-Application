import React, { Component } from "react";
import Card from 'react-bootstrap/Card';
import './vert.css';
import ShareButton from '../ShareButton';
import Button from 'react-bootstrap/Button';
import {FaTrash} from 'react-icons/fa';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SectionTags from "../SectionTags";
import Image from 'react-bootstrap/Image';
import {Row,Col} from 'react-bootstrap';


export default class VerticalCard extends Component {
    constructor(props) {
        super();
        this.state = {
            c_title : "default",
            c_img : "default",
            c_source : "default",
            c_date : "default",
            c_section : "default",
            c_url : "default",
            show: false,
            articles : [],
            longtitle:"default"
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    removearticle(arts,art_title) {
        this.setState({
            articles: arts
        })
        var removestr = "Removing - "+ art_title;
        toast(removestr, {
            position:toast.POSITION.TOP_CENTER,
            hideProgressBar: true
        });
        localStorage.removeItem(JSON.stringify(art_title));
        this.setState({
            articles: this.state.articles.filter(art => art.title !== art_title)
        })
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
    
    // clickd(e) {
    //     e.preventDefault();
        
    //     e.stopPropagation();
    //     e.nativeEvent.stopImmediatePropagation();
    //     // alert("clicked!");
    // }
    
    render(){ 
        return(
            // <Row > 
            // <Col >
            <Card className="mainvbody" style={{width:'95%'}}>
                
               
            <Card.Body>
                <Row>
                    
            <Col>
            <Card.Title className="ctitle">{this.props.c_title}
            
                <ShareButton id="sh"
                    // isBkMk = {true}
                    onClick={this.clickd}
                    source = {this.props.c_source}
                    title = {this.props.longtitle}
                    urll = {this.props.c_url}
                    show = {this.state.show}
                    handleClose = {this.handleClose}
                    handleShow = {this.handleShow}
                    >
                </ShareButton>
                <FaTrash style = {{display: this.props.hideDelete ? 'none': 'inline'}}onClick={this.props.triggerParentUpdate}></FaTrash>
                </Card.Title>
                </Col>
                {/* <Col>
                <Button className="tbtn" style = {{display: this.props.hideDelete ? 'none': 'inline'}}onClick={this.props.triggerParentUpdate}>
                    
                    </Button>
                    
                    </Col> */}
                    </Row>
            <Image variant="bottom" className="vertimg" src = {this.props.c_img} thumbnail/>
            <Row>
                <Col xs={5} lg={5} >
            <h6 className="ctext">{this.props.c_date}</h6>
            </Col>
            <Col xs={3} lg={3}>
            <span style = {{display: this.props.trybutton ? 'inline': 'none'}}><SectionTags id="st1" tagname={this.props.c_section}/> </span> 
            </Col>
            <Col xs={3} lg={2}>
            <SectionTags id="st2" tagname={this.props.c_source}/>
            <span style = {{display: this.props.nexttrybutton ? 'inline': 'none'}}><SectionTags id="st1" tagname={this.props.c_section}/> </span>
            </Col>
            </Row>            
            </Card.Body>
          </Card>
        //   </Col>
        //   </Row>
        )
    }
}