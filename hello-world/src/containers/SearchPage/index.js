import React from 'react';
import {Link} from 'react-router-dom';
import VerticalCard from '../VerticalCard';
import LoadingSpinner from '../LoadingSpinner';

class SearchPage extends React.Component {
    constructor(props){
        super(props);
        this.currentItem = '';
        this.numarts = 0;
        this.state = {
            isLoading: false,
            articles: [],
            articlesny: []
        }
    }

    fetchDataWrapper(){
        var art_iden = (this.props.location.search).substring(3);
        console.log("art_iden="+art_iden);
        art_iden = art_iden.replace(/%20/g, ' '); 
        console.log(art_iden);
        this.fetchData(art_iden);
        this.fetchDatany(art_iden);
    }

    fetchDatany(art_iden) {
        var url = "https://nodebackend-8-sayali.appspot.com/nytimes/search?finderid="+art_iden;
        fetch(url)
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.map(article => (
            {
                id: `${article.articleid}`,
                title: `${article.title}`,
                image: `${article.image}`,
                section: `${article.section}`,
                date: `${article.date}`,
                source: `${article.source}`
            }
        )))
        .then(articlesny => {
            this.setState({
                articlesny,
                isLoading: true
            })
        }
        )
        .catch(error => console.log('parsing failed', error)) 
    }

    fetchData(art_iden) {
        var url = "https://nodebackend-8-sayali.appspot.com/guardian/search?finderid="+art_iden;
        fetch(url)
        .then(response => response.json())
        .then(parsedJSON => parsedJSON.map(article => (
            {
                id: `${article.articleid}`,
                title: `${article.title}`,
                image: `${article.image}`,
                section: `${article.section}`,
                date: `${article.date}`,
                source : `${article.source}`
            }
        )))
        .then(articles => {
            this.currentItem = art_iden;
            this.setState({
                articles,
                isLoading: true
            })

        }
        )
        .catch(error => console.log('parsing failed', error)) 
    }
    
    render() {
        if(this.state.isLoading == false || this.currentItem != (this.props.location.search).substring(3).replace(/%20/g, ' ')){
                this.fetchDataWrapper();
                return <><LoadingSpinner/></>
        }else{
        const {articles, articlesny} = this.state;
        var art_len = 0;
        if(articles.length > 5) {
            art_len = 5;
        }
        else {
            art_len = articles.length;
        }
        var art_len_ny = 10 - art_len;
        if(articlesny.length > art_len_ny) {
            art_len_ny = 10 - art_len;
        }
        else {
            art_len = articlesny.length;
        }
    return(
        <div className = "homediv" style = {{marginLeft:'2%'}}>
        <div>
            <h2 style = {{textAlign: 'left'}}>Results</h2>
        </div>
        <div class = "row">
        {
                articles.length > 0 ? articles.map(article => {
                    if(art_len > 0) {
                        art_len = art_len - 1;
                        const {title, image, section, date, source} = article;
                        const iden = "/article?articleid="+article['id'];
                        return <div key = {article['id']} class = 'col-md-3'>
                        <Link to = {iden}>
                        <VerticalCard
                            key = {title}
                            c_title = {title}
                            c_img = {image}
                            c_section = {section}
                            // c_source = {source}
                            c_date = {date}
                            articles = {articles}
                            triggerParentUpdate = {(e) => {e.preventDefault();this.removearticle(title)}}
                            hideDelete = {true}
                            trybutton={false}
                            nexttrybutton={true}
                            longtitle={title}
                        />
                        </Link>
                        </div>
                    }                    
                }) : null

            }
            {
                articlesny.length > 0 ? articlesny.map(article => {
                    if(art_len_ny > 0) {
                        art_len_ny = art_len_ny - 1;
                        const {title, image, section, date, source} = article;
                        const iden = "/article?articleid="+article['id'];
                        return <div key = {title} class = 'col-md-3'>
                        <Link to = {iden}>
                        <VerticalCard
                            key = {title}
                            c_title = {title}
                            c_img = {image}
                            c_section = {section}
                            c_date = {date}
                            articles = {articles}
                            triggerParentUpdate = {(e) => {e.preventDefault();this.removearticle(title)}}
                            hideDelete = {true}
                        />
                        </Link>
                        </div>
                    }
                    
                }) : null

            }
        </div>
        </div>
    );
    }}
}

export default SearchPage;