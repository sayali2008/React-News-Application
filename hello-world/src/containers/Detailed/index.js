import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './Detailed.css';
import {EmailShareButton,FacebookShareButton,TwitterShareButton,} from "react-share";
import {FacebookIcon,TwitterIcon,EmailIcon} from "react-share";
import {Row,Col,Container} from 'react-bootstrap';
import {MdBookmarkBorder, MdBookmark} from 'react-icons/md';
import Smsl from '../Smsl';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReactTooltip from 'react-tooltip';
import Comment from '../Comment';
import LoadingSpinner from '../LoadingSpinner'
import { FaBreadSlice } from "react-icons/fa";

toast.configure();

var myInitObject = {}

export default class Detailed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article_iden: "default",
            articles:[],
            isRed : true,
            hasMoreText: true,
            hideInitialdesc: false,
        }
    }

    componentDidMount() {

        var art_iden = (this.props.location.search).substring(11);
        this.fetchdata(art_iden);
        
        

        // var keys=[]
        // keys = Object.keys(article);
        // for (var i = 0; i< keys.length; i++){
        //     
        // }
    }


    initColor() {
         console.log("in init color")
        const {articles} = this.state;
        var keys=[]
        console.log("articles = "+ JSON.stringify(articles))
        keys = Object.keys(articles);
        var title = "";
        for (var i = 0; i< keys.length; i++){
            console.log("articlessss inside for = " + articles[i])
            title = articles[i].title;
            // console.log('title = '+title);
            if(localStorage.getItem(title) === null) {
                 console.log("DOESNT EXIST");
                this.setState({
                    isRed: false
                })
                // this.changeColor(true);
                // break;
            }
            else {
                this.setState({
                    isRed: true
                })
                // this.changeColor(false);
                // break;
            }    
        }

        // if(localStorage.getItem(articles[0].title) === null) {
        //     this.changeColor(false);
        // }
        // else {
        //     this.changeColor(true);
        // }

        // const {articles} = this.state;
        // console.log("articles - "+ JSON.stringify(articles));
        // console.log("Inside addbkmk article ="+ articles[0]);
        // console.log("Inside addbkmk article ="+ articles[0].title);
        // if(localStorage.getItem(articles[0].title) === null) {
        //     localStorage.setItem(articles[0].title, JSON.stringify(articles[0]));
        //     var removestr = "Saving "+ articles[0].title;
        //     toast(removestr, {
        //         className:'black-background',
        //         position:toast.POSITION.TOP_CENTER,
        //         hideProgressBar: true
        //     });
        //     this.changeColor(true);
        // }
        // else {
        //     localStorage.removeItem(articles[0].title, JSON.stringify(articles[0]));
        //     var removestr = "Removing - "+ articles[0].title;
        //     toast(removestr, {
        //         className:'black-background',
        //         position:toast.POSITION.TOP_CENTER,
        //         hideProgressBar: true
        //     });
        //     this.changeColor(false);
        // }
    }

    fetchdata(art_iden) {
        if(art_iden.includes('nytimes'))
        {
            url = "https://nodebackend-8-sayali.appspot.com/nytimes/article?aid="+art_iden;
            
        }
        else
        var url = "https://nodebackend-8-sayali.appspot.com/guardian/article?aid="+art_iden;
        console.log("URLLLLLLLLLLL= "+ url);
        myInitObject=art_iden;
        fetch(url)
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.map(article => (
            {
                id: `${article.articleid}`,
                url: `${article.url}`,
                title: `${article.title}`,
                image: `${article.image}`,
                date: `${article.date}`,
                description: `${article.description}`,
                source: `${article.source}`,
                section: `${article.section}`
            }
        )))
        .then(articles => this.setState({
            articles,
        }))
        .catch(error => console.log('parsing failed', error))
        
        
        
    }

    changeColor(checker){
        if(checker == false)
        {
            this.setState({ isRed:true});
        }
        else
        {
            this.setState({ isRed:false});
        }
    }


    addbkmk() {
        const {articles} = this.state;
        //console.log("Inside addbkmk article ="+ articles[0]);
        console.log("Inside addbkmk article ="+ articles[0].title);
        if(localStorage.getItem(articles[0].title) === null) {
            localStorage.setItem(articles[0].title, JSON.stringify(articles[0]));
            var removestr = "Saving "+ articles[0].title;
            toast(removestr, {
                className:'black-background',
                position:toast.POSITION.TOP_CENTER,
                hideProgressBar: true
            });
            this.changeColor(true);
        }
        else {
            localStorage.removeItem(articles[0].title, JSON.stringify(articles[0]));
            var removestr = "Removing - "+ articles[0].title;
            toast(removestr, {
                className:'black-background',
                position:toast.POSITION.TOP_CENTER,
                hideProgressBar: true
            });
            this.changeColor(false);
        }
    }

    // componentDidUpdate() {
    //     const {articles} = this.state;
    //     this.checkText(articles[0].description);
    // }

    makedescshort(s) {
        
        if(s.length < 800) {
            return s;
        }
        s = s.substring(0,800);
        var i = 0, cut = "";
        if(s.includes(' ')) {
          for(i = s.length-1; i >=0; i--) {
              if(s[i] === ' ') {
                  break;
              }
          }
        cut = s.substring(0,i) + "...";
        return cut;
      }
    }

    

    hideDesc() {
        console.log("HIDE DESC /////////////////////")
        var hidden = this.state.hideInitialdesc;
        this.setState({
            hideInitialdesc: !hidden
        })
    }

    render(){
        
        // console.log("PROPS = "+ this.props)
        // console.log("TYPEEEEEEEEEEEEEEEEEE=" + typeof(this.props.location.search));
        // console.log("LOCATION SEARCH="+this.props.location.search);
        const {articles} = this.state;
        // console.log("articlessss = " + articles)
        const {isRed, hideInitialdesc} = this.state;
        // console.log("hideInitialdesc = "+ hideInitialdesc)
        var keys=[]
        keys = Object.keys(articles);
        var title,urll,image,date,description = "";
        for (var i = 0; i< keys.length; i++){
            console.log("articlessss inside for = " + articles[i])
            title = articles[i].title;
            urll = articles[i].url;
            // var imag = JSON.stringify(articles[i].image);
            var imag = articles[i].image;
            // console.log("articles IMAG value="+imag);
            // image = ""+imag+"";
            // console.log("articles IMAGEEEEEEEE value="+image);
            date = articles[i].date;
            description = articles[i].description;
            
        }
        // if(localStorage.getItem(title) === null) {
        //     this.changeColor(false);
        // }
        // else {
        //     this.changeColor(true);
        // }    
        var desc = this.makedescshort(description);
        var twtrtag = [];
        twtrtag[0] = "CSCI_571_NewsApp";
        
        // console.log("typeof twtrtag = "+ typeof(twtrtag));
        // console.log("twtrtag[0]"+ twtrtag[0]);
        // console.log("desc = "+desc[0]);    
         console.log("description = "+description.length);   
        var hasMoreText = desc.length < description.length;
        // console.log("hasMoreText = "+ hasMoreText);  
        return(
            <>
            <LoadingSpinner></LoadingSpinner>
            <Card id="detailedcardtop" >
                <Card.Body>
                <div id="ct">
                <h3 id="titlestyle">{title}</h3>
                
                    <Row>
                        <Col xs={5} lg={9}>
                        <h5 id="dt">{date}</h5>
                        </Col>
                        <Col xs={5} lg={2}>
                            <ReactTooltip className = "rt" place={"top"} type={"dark"} effect={"solid"}/>
                            <FacebookShareButton id = "fb" data-tip = "Facebook" url={urll} hashtag="#CSCI_571_NewsApp"><FacebookIcon className="fbdetailed" size={28} round={true}/></FacebookShareButton>
                            <ReactTooltip className = "rt" place={"top"} type={"dark"} effect={"solid"}/>
                            <TwitterShareButton id = "tweet" data-tip = "Twitter" url="www.twitter.com" quote="Share Now" title = {urll} hashtags={twtrtag}><TwitterIcon  size={28} round={true}/></TwitterShareButton>                 
                            <ReactTooltip className = "rt" place={"top"} type={"dark"} effect={"solid"}/>
                            <EmailShareButton id = "email" data-tip = "Email" url="" body={urll} subject="#CSCI_571_NewsApp"><EmailIcon size={28} round={true}/></EmailShareButton>
                            
                        </Col>
                        <Col xs={1} lg="1">
                                               
                            <ReactTooltip className = "rt" place={"top"} type={"dark"} effect={"solid"}/>
                            <h3 id="bomark"><MdBookmarkBorder id="bkmk" style = {{display:isRed? 'inline' : 'none'}} onClick={()=> {this.addbkmk();}}/> </h3>
                            <h3 id="bomark"><MdBookmark id="secbut" style = {{display:isRed? 'none' : 'inline'}} onClick={()=> {this.addbkmk();}} data-tip = "Bookmark"/> </h3>
                      
                        </Col>
                    </Row>
                   
                </div>
                <Card.Img variant="bottom" id="bimage" src={imag} />
                <div style = {{display: hideInitialdesc? 'none' : 'inline'}}>
                    < p id="bottext">{desc}</p>
                </div>
                <div style = {{display: hasMoreText? 'inline' : 'none'}} onClick = {() => {this.hideDesc()}}>
                    <Smsl id="smslid" desc = {description}></Smsl>
                </div>
                
                </Card.Body>
                
            </Card>
            <div>
                <Comment id = {(this.props.location.search).substring(11)}></Comment>
            </div> 
            </>
            )
        }
}

export {myInitObject}