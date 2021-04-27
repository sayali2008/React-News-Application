import React, {Component} from 'react';
import MyCard from '../MyCard';
import './home.css';
import LoadingSpinner from '../LoadingSpinner';
import Detailed from '../Detailed';
import { Button } from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            show: false,
            contacts: []
        }
    }

    componentDidMount() {
        console.log("Comp did mount called");
        this.fetchData();
    }

    fetchData() {
        var url = "https://nodebackend-8-sayali.appspot.com/guardian/";
        console.log("urlllll:"+url);
        if(localStorage.getItem('true') === "NYTimes") {
            url = "https://nodebackend-8-sayali.appspot.com/nytimes/";
        }
        fetch(url)
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.map(article => (
            {
                id: `${article.articleid}`,
                title: `${article.title}`,
                image: `${article.image}`,
                section: `${article.section}`,
                date: `${article.date}`,
                description: `${article.description}`,
                source: `${article.source}`,
                url:  `${article.url}`
            }
        )))
        .then(contacts => this.setState({
            contacts,
        }))
        .catch(error => console.log('parsing failed', error)) 
    }

    // componentWillUpdate(nextProps, nextState) {     
           
    //     var i = 0
    //     console.log("Contact willupdate() length = "+ nextState.contacts.length);
    //     console.log("Articles added to local storage successfully");
    //     while(i < nextState.contacts.length) {
    //         localStorage.setItem(JSON.stringify(nextState.contacts[i].title), JSON.stringify(nextState.contacts[i]));
    //         i+=1;
    //     }
    //     // localStorage.setItem(JSON.stringify(nextState.contacts[0].title), JSON.stringify(nextState.contacts));
    //     // localStorage.setItem('contactsDate', Date.now());
    // }

    
    
    render() {
        const {contacts} = this.state;
    return(
        <div className = "homediv">
        <LoadingSpinner/>
        <div>
                {
                            contacts.length > 0 ? contacts.map(contact => {
                                const {id, title, image, section, date, description, url} = contact;
                                // console.log("IDen=" + contact['id']);
                                const iden = "/article?articleid="+contact['id'];
                                return <Link to = {iden} key = {title}>
                                    <MyCard
                                    key = {title}
                                    c_title = {title}
                                    c_img = {image}
                                    c_section = {section}
                                    c_date = {date}
                                    c_desc = {description}
                                    c_url = {url}
                                />
                                </Link>
                                
                                // return <div key={title} title={title}>
                                //     <img src={image}></img>
                                //     <p>{title}<br/>{image}<br />{section}</p>
                                //     <p>{date}<br/>{description}</p>
                                // </div>
                            }) : null
                }
        </div>
        </div>
    );
    }
}

export default Home;