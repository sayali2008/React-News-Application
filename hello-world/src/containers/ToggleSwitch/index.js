import React, {Component} from 'react';
import Switch from 'react-switch';
import {Row,Col} from "react-bootstrap";
import './toggle.css'

export default class ToggleSwitch extends Component {
    constructor(props) {
      super(props);
      this.state = {isHidden: false};
      if(localStorage.getItem("true") === "NYTimes") {
        this.state = {checked : false};
      }
      else {
        this.state = { checked: true };
      }
      this.handleChange = this.handleChange.bind(this);
    }
  
    handleChange(checked) {
      
      if(checked === true) {
        localStorage.removeItem("true");
        localStorage.setItem("true", "Guardian");
      }
      else {
        localStorage.removeItem("true");
        localStorage.setItem("true", "NYTimes");
      }
      console.log("Toggle changed to = "+ localStorage.getItem("true"));        
      this.setState({ checked });
      console.log("Refresh function called from toggle switch container");
      window.location.reload(false);
    }
  
    render() {
      const isHidden = this.props.isHidden;
      // console.log("this.props.isHidden = "+ this.props.isHidden);
      if(!isHidden) {
        return (
          <div className="example">
              <Row>
                <Col xs={10} lg={4}>
              <span id="nytimestoggle">NYTimes</span>
              </Col>
              <Col xs={12} lg={3}>
              <div>
              <Switch
                onChange={this.handleChange}
                checked={this.state.checked}
                onColor="#2E8FE6"
                handleDiameter={25}
                uncheckedIcon={false}
                checkedIcon={false}
                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                height={25}
                width={55}
                className="react-switch"
              />
              
              </div>
              </Col>
              <Col xs={12} lg={3}>
              <span id = "guardian">Guardian</span>
              </Col>
              </Row>
          </div>
        );
      }
      else {
        return <></>
      }
      
    }
  }