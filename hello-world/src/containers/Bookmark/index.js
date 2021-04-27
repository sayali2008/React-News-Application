import React,{Component} from 'react';
import './bookmark.css';
import VerticalCard from '../VerticalCard';
import 'react-toastify/dist/ReactToastify.css';
import Button from 'react-bootstrap/Button';
import {FaTrash} from 'react-icons/fa';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import {Row,Col} from 'react-bootstrap';

toast.configure();

class Bookmark extends React.Component{
constructor(props){
    super(props);
    this.state = {
        hasBkMk: true,
        articles: [],
        isEmptyArts: false
        
    }
}

removearticle(art_title) {
    var removestr = "Removing - "+ art_title;
    toast(removestr, {
        className: 'black-background',
        position:toast.POSITION.TOP_CENTER,
        hideProgressBar: true
    });
    localStorage.removeItem(art_title);
    this.setState({
        articles: this.state.articles.filter(art => art.title !== art_title)
    })
//     const {articles} = this.state;
//     console.log("articles.length = "+ articles.length)
//     if(articles.length <= 1) {
        
//         this.setState({ isEmptyArts: true})
//     }
}

componentWillMount() {
    const {hasBkMk, articles,isEmptyArts} = this.state;
    var keys = Object.keys(localStorage);
    var values = [];
    var i = 0;
    if(keys.length == 0) {
        this.setState({ isEmptyArts: true})
    }
    while( i < keys.length) {
        if(keys[i] === "true") {
            i++;
            continue;
        }
        values.push(localStorage.getItem([keys[i]]));
        i++;
    }
    values='{"results": ['+values+']}';
    
    // console.log(JSON.parse(values));
    // console.log("TYPE="+typeof(JSON.parse(values).results));

    this.setState({
                    articles : (JSON.parse(values).results),
                    hasBkMk: true
                })
}

makedescshort(s) {
        
    if(s.length < 60) {
        return s;
    }
    s = s.substring(0,60);
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

// componentDidMount(){
//     const {hasBkMk} = this.state;
//     // if(!hasBkMk) {
//     //     // console.log("No bookmarks present");
//     // }
// }


// const [show, setShow] = useState(false);
  
//     const handleClose = (e) => {
//       debugger;
//       setShow(false);
//     }
//     const handleShow = (e) => {
        
//         setShow(true);
//     }

render() {
    const {hasBkMk, articles, isEmptyArts} = this.state;
    return(
        <div id="topvertdiv" style={{width:'98%'}}>
        <h3 id="favtext" style = {{textAlign:"left", margin:'auto', display: isEmptyArts? 'none':'default'}}> Favorites<br/></h3>
            
        <div className = "row">
        
            {
                articles.length > 0 ? articles.map(article => {
                    const {title, image, section, date, source,url} = article;
                    const iden = "/article?articleid="+article['id'];
                    return <div key = {title} className = 'col-md-3'>
                    <Link to = {iden} >
                    <VerticalCard
                        key = {title}
                        c_title = {this.makedescshort(title)}
                        c_img = {image}
                        c_section = {section}
                        c_date = {date}
                        c_source = {source}
                        c_url = {url}
                        articles = {articles}
                        triggerParentUpdate = {(e) => {e.preventDefault();this.removearticle(title)}}
                        trybutton={true}
                        nexttrybutton={false}
                        longtitle={title}
                   />
                    </Link>
                     {/* <Button className="tbtn" onClick={() => this.removearticle(title)}><FaTrash ></FaTrash></Button> */}
                    </div>
                    {/* <Button className="tbtn" onClick={() => this.removearticle(title)}><FaTrash ></FaTrash></Button>
                    </> */}
                    // return <div key={title} title={title}>
                    //     <Button className="tbtn" onClick={() => this.removearticle(title)}><FaTrash ></FaTrash></Button>
                    //     <img src={image} width={"100px"} height={"100px"}></img>
                    //     <p>{title}<br/>{image}<br />{section}</p>   
                    //     <p>{date}<br/>{description}</p>
                    // </div>
                }) : <h3 style = {{textAlign:"left", margin:'auto'}}>You have no saved articles</h3>

            }
        </div>
        </div>
    );
}
}

export default Bookmark;