import {EmailShareButton,FacebookShareButton,TwitterShareButton} from "react-share";
import {MdShare} from 'react-icons/md';
import {Row,Col} from "react-bootstrap";
import React,{ useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import {FacebookIcon,TwitterIcon,EmailIcon} from "react-share";
import './ShareButton.css'

// class ShareButton extends  React.Component
// {
//     constructor(props) {
//       super();
//       this.state = {
//         text : "default"
//       }
//     }

//     render()
//     {
//       const [show, setShow] = useState(false);
//       const handleClose = () => setShow(false);
//       const handleShow = () => setShow(true);
//       return (
//               <>
//                 <Button  className="md" onClick={handleShow}>
//                 <MdShare/>
//                 </Button>        
//                 <Modal show={show}  dialogClassName="modal-90w" onHide={handleClose}>
//                   <Modal.Header closeButton>
//                     <Modal.Title>{this.props.text}</Modal.Title>
//                   </Modal.Header>
//                   <Modal.Footer>
//                 <div id="ic"> 
//                     <h5 id="shvi">Share via</h5>
//                     <FacebookShareButton url="www.facebook.com" quote="Share Now" hashtag="#CSCI_571_NewsApp"><FacebookIcon size={50} round={true}/></FacebookShareButton>
//                     <TwitterShareButton  url="www.twitter.com" quote="Share Now" hashtag="#CSCI_571_NewsApp"><TwitterIcon className="tw" size={50} round={true}/></TwitterShareButton>
//                     <EmailShareButton url="" body="App URL" subject="#CSCI_571_NewsApp"><EmailIcon size={50} round={true}/></EmailShareButton>
//                 </div>
//                     <Button  onClick={handleClose}>
//                     </Button>
                
//                   </Modal.Footer>
//                 </Modal>
//               </>
//             );
//     }  
// }
const ShareButton = (props) => {
    
    var twtrtag = []
    twtrtag[0] = "CSCI_571_NewsApp"
    // console.log("PROP = "+ props.title);

    function onClickInModal(e) {
      // debugger;
      e.preventDefault();
      // e.stopPropagation();
    }

    return (
      <>
        <span className="md"  onClick={props.handleShow}>
        <MdShare/>
        </span>
        
        <Modal style={{width:'100%'}} show={props.show}  dialogClassName="modal-90w" onHide={props.handleClose} onClick={onClickInModal}>
          <Modal.Header closeButton>
            <Row>
              <Col xs={12} >
          <Modal.Title id="modal_title">{props.source}<br/>{props.title}</Modal.Title>
          </Col>
          </Row>
          </Modal.Header>
          <Modal.Footer>
        <div id="ic"> 
        {/* <Row> */}
            <Row>
              <Col xs={12} lg={12}>
            <h5 id="shvi">Share via</h5>
            </Col>
            </Row>
            <Row>
              <Col xs={5} lg={4} >
            <FacebookShareButton url={props.urll} hashtag="#CSCI_571_NewsApp"><FacebookIcon className="fbmz" size={50} round={true}/></FacebookShareButton> 
            </Col>
            <Col xs={4} lg={2}>
            <TwitterShareButton  url="www.twitter.com" title = {props.urll} quote="Share Now" hashtags={twtrtag}><TwitterIcon className="tw" size={50} round={true}/></TwitterShareButton>
            </Col>
            <Col xs={3} lg={4} >
            <EmailShareButton url="" body={props.urll} subject="#CSCI_571_NewsApp"><EmailIcon className="emicon" size={50} round={true}/></EmailShareButton>
            </Col>
            </Row>
            {/* </Row> */}
        </div>
            <Button  onClick={props.handleClose}>
            </Button>
        
          </Modal.Footer>
        </Modal>
      </>
    );
  }
  
//   //render(<Share />);
export default ShareButton;