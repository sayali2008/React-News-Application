import React from 'react';
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";
 
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: auto;
  border-color: red;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
`;
 
class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
 
  componentDidMount() {
      setTimeout(() => {
          this.setState({
              loading: false
          })
      }, 1500)
  }
  render() {
    return (
      <div className="sweet-loading">
        <BounceLoader
          css={override}
          size={60}
          color={"#075DC2"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}

export default LoadingSpinner;