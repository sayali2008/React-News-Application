import React from 'react';
import MyCard from '../MyCard';
import LoadingSpinner from '../LoadingSpinner';
import {Link} from 'react-router-dom';

class Sports extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            articles: []
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        var url = "https://nodebackend-8-sayali.appspot.com/guardian/section/sport";
        if(localStorage.getItem('true') === "NYTimes") {
            url = "https://nodebackend-8-sayali.appspot.com/nytimes/section/sports";
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
                url:  `${article.url}`,
                
            }
        )))
        .then(articles => this.setState({
            articles,
        }))
        .catch(error => console.log('parsing failed', error)) 
    }

    // componentWillUpdate(nextProps, nextState) {     
           
    //     var i = 0
    //     console.log("Contact willupdate() length = "+ nextState.articles.length);
    //     console.log("Articles added to local storage successfully");
    //     while(i < nextState.articles.length) {
    //         localStorage.setItem(JSON.stringify(nextState.articles[i].title), JSON.stringify(nextState.articles[i]));
    //         i+=1;
    //     }
    //     // localStorage.setItem(JSON.stringify(nextState.contacts[0].title), JSON.stringify(nextState.contacts));
    //     // localStorage.setItem('contactsDate', Date.now());
    // }

    
    render() {
        const {articles} = this.state;
    return(
        <div className = "homediv">
        <LoadingSpinner/>
        <div>
                {
                            articles.length > 0 ? articles.map(article => {
                                const {title, image, section, date, description,url} = article;
                                const iden = "/article?articleid="+article['id'];
                                return <Link to={iden} key = {title}>
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
                            }) : null
                }
        </div>
        </div>
    );
    }
}

export default Sports;