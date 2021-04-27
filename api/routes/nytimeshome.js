const express = require('express');
const request = require('request');
// const router = express.Router();
const router = express();
const api_key = "HCcMYyZaBH7szYhT40LAeE6lsrPLIiFh";
const def_img = "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";


function format_date(d) {
    return d.substring(0,10);
}

function check_data(articles) {
    console.log(articles);
    result = [];
    for(i in articles) {
        if(articles[i].title != null && articles[i].section != null && articles[i].published_date != null && articles[i].abstract !=null && articles[i].multimedia != null) {
            temp = {};
            temp['articleid'] = articles[i].url;
            temp['title'] = articles[i].title;
            temp['section'] = (articles[i].section).toUpperCase();
            temp['date'] = format_date(articles[i].published_date);
            temp['description'] = articles[i].abstract;
            temp['source'] = 'NYTIMES';
            var loopforimg = articles[i].multimedia;
            temp['image'] = def_img;
            temp['url'] = articles[i].url;
            for(j in loopforimg) {
                if(loopforimg[j].width >= 2000) {
                    temp['image'] = loopforimg[j].url;
                    break;
                }
            }
            result.push(temp);
        }
    }
    return result;
}

function art_search(articles) {
    result = [];
    for(i in articles) {
        console.log("ARTICLE = "+ articles[i].headline.main);
        if(articles[i].headline != null && articles[i].headline.main != null && articles[i].abstract !=null) {
            temp = {};
            temp['articleid'] = articles[i].web_url;
            temp['section'] = (articles[i].section_name).toUpperCase();
            temp['title'] = articles[i].headline.main;
            temp['date'] = format_date(articles[i].pub_date);
            temp['source'] = 'NYTIMES';
            temp['description'] = articles[i].abstract;
            var loopforimg = articles[i].multimedia;
            temp['image'] = def_img;
            temp['url'] = articles[i].web_url;
            for(j in loopforimg) {  
                if(loopforimg[j].width >= 2000) {
                    temp['image'] = "https://www.nytimes.com/" + loopforimg[j].url;
                    break;
                }
            }
            console.log("TEMP = "+ temp);
            result.push(temp);
        }
    }
    console.log("RESULT = "+ result);
    return result;
}

function searching(articles) {
    result = [];
    for(i in articles) {
        console.log("ARTICLE = "+ articles[i].headline.main);
        if(articles[i].headline != null && articles[i].headline.main != null && articles[i].news_desk !=null && articles[i].pub_date != null) {
            temp = {};
            temp['articleid'] = articles[i].web_url;
            temp['title'] = articles[i].headline.main;
            temp['date'] = format_date(articles[i].pub_date);
            temp['source'] = 'NYTIMES';
            temp['section'] = (articles[i].news_desk).toUpperCase();
            var loopforimg = articles[i].multimedia;
            temp['image'] = def_img;
            temp['url'] = articles[i].web_url;
            for(j in loopforimg) {  
                if(loopforimg[j].width >= 2000) {
                    temp['image'] = "https://www.nytimes.com/"+loopforimg[j].url;
                    break;
                }
            }
            console.log("TEMP = "+ temp);
            result.push(temp);
        }
    }
    console.log("RESULT = "+ result);
    return result;
}

///////1
router.get('/', function (req, res) {
    var url = 'https://api.nytimes.com/svc/topstories/v2/home.json?api-key='+api_key;
    console.log("url = "+url);
    request.get(url, (errorResponse, response,data) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        jsonObj = JSON.parse(data);
        results = [];
        articles = jsonObj.results;
        results = check_data(articles);
        res.send(results);
        // res.send(jsonObj.results);
    });
});

/////////////2
router.get('/section/:sectionName', function (req, res) {
    const section_name = req.params.sectionName;
    var url = 'https://api.nytimes.com/svc/topstories/v2/'+section_name+'.json?api-key='+api_key;
    console.log("url = "+url);
    request.get(url, (errorResponse, response,data) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        jsonObj = JSON.parse(data);
        results = [];
        articles = jsonObj.results;
        results = check_data(articles);
        res.send(results);
        // res.send(jsonObj.results);
    });
});


/////////////3
router.get('/article', function (req, res) {
    const art_web_url = req.query['aid'];
    var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=web_url:("'+art_web_url+'")&api-key='+api_key;
    console.log("url = "+url);
    request.get(url, (errorResponse, response,data) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        jsonObj = JSON.parse(data);
        articles = [];
        articles = jsonObj.response.docs;
        result = [];
        result = art_search(articles);
        res.send(result);
        // res.send(jsonObj.response.docs);
    });
});


/////////////4
router.get('/search/', function (req, res) {
    // const query_Keyword = req.params.queryKeyword;
    const query_Keyword = req.query['finderid'];
    var url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q='+query_Keyword+'&api-key='+api_key;
    console.log("url = "+url);
    request.get(url, (errorResponse, response,data) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        jsonObj = JSON.parse(data);
        articles = [];
        articles = jsonObj.response.docs;
        result = [];
        result = searching(articles);
        res.send(result);
        // res.send(jsonObj.response.docs);
    });
});

module.exports = router;