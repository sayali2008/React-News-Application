import React, { Component } from "react";
import AsyncSelect from 'react-select/lib/Async';
import _ from "lodash";
import './autosel.css';
import { Redirect } from "react-router-dom";

class Autoselect extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      selectedResult: null
    };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
  }


  handleSearchChange = async(inputValue) => {
    try {
      if(inputValue.length>0) {
      const response = await fetch(
        `https://api.cognitive.microsoft.com/bing/v7.0/suggestions?q=${inputValue}`,
        {
          headers: {
            "Ocp-Apim-Subscription-Key": "96fe9716160f4b08bbc2c6ac7dc67bb7"
          }
        }
      );
      const data = await response.json();
      const resultsRaw = data.suggestionGroups[0].searchSuggestions;
      const results = resultsRaw.map(result => ({ value: result.displayText, label:result.displayText }));
      results.filter(i =>i.label.toLowerCase().includes(inputValue.toLowerCase()));
      // this.setState({ results });
      return results;
    }} catch (error) {
          console.error(`Error fetching search ${inputValue}`);
        }
  }

  handleResultSelect = (result) => {
    if(!Array.isArray(result)){
      this.setState({ selectedResult: result });
      // console.log("result set state = "+ this.state.selectedResult);
    }          
  }

  checkRedirect() {
    var {selectedResult} = this.state;
    if(this.state && this.state.selectedResult !== null) {
      this.state.selectedResult.value = this.state.selectedResult.value.replace(/ /g,"%20");
      var url = "/search?q="+ selectedResult.value;
      return <Redirect to = {url}/>
    }
  }

  render() {
    return (
      <>
      {this.checkRedirect()}
      <div className="App">
        <AsyncSelect 
            className="basic-single"
            classNamePrefix="select"
            name="search"
            isClearable
            loadOptions={this.handleSearchChange}  
            onChange={this.handleResultSelect} 
            value = {this.state.selectedResult}
            placeholder="Enter keyword ..." />
      </div>
      </>
    );
  }
}

export default Autoselect;