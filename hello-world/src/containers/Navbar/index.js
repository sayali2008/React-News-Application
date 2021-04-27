import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import './nav.css';
import ToggleSwitch from '../ToggleSwitch';
import AutoSelect from '../Autoselect';
import {MdBookmarkBorder, MdBookmark} from 'react-icons/md';


function MyNavbar() {
    function refreshpage() {
        console.log("Refresh function called");
        window.location.reload(false);
    }

    const [showImage,setShowImage] = useState(true);

    const [hidingval,sethidingval] = useState(false);
    return(
        // <div>
            <Navbar fixed = "top" bg="" className="grad" expand="lg">
                     <Nav>
                        <AutoSelect className = "dropdown" onSubmit={()=>{sethidingval(true)}} />
                    </Nav>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    
                <Nav className="mr-auto">
                    
                    <NavLink exact to="/" id="home" activeStyle={{ color:'white' }} onClick={()=>{setShowImage(true);sethidingval(false)}}>Home </NavLink>
                    <NavLink exact to="/world" id="world" onClick={()=>{setShowImage(true);sethidingval(false)}} activeStyle={{ color:'white' }}>World </NavLink>
                    <NavLink exact to="/politics" id="politics" onClick={()=>{setShowImage(true);sethidingval(false)}} activeStyle={{ color:'white' }}>Politics </NavLink>
                    <NavLink exact to="/business" id="business" onClick={()=>{setShowImage(true);sethidingval(false)}} activeStyle={{ color:'white' }}>Business </NavLink>
                    <NavLink exact to="/technology" id="tech" onClick={()=>{setShowImage(true);sethidingval(false)}} activeStyle={{ color:'white' }}>Technology </NavLink>
                    <NavLink exact to="/sports" id="sports" onClick={()=>{setShowImage(true);sethidingval(false)}} activeStyle={{ color:'white' }}>Sports </NavLink>
                </Nav>   
                <NavLink id="bkmk1" to="/bookmark" onClick={()=>{setShowImage(false);sethidingval(true)}} >
                    {showImage && <h3><MdBookmarkBorder/></h3>}{!showImage && <h3><MdBookmark/></h3>}
                </NavLink>
                <ToggleSwitch className = "toggler" onClick ={refreshpage} isHidden = {hidingval}/>
                
            </Navbar.Collapse>
            </Navbar>
        // </div>
    );
}

export default MyNavbar;