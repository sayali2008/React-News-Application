const express = require('express');
const request = require('request');
// const router = express.Router();
const router = express();
const api_key = "5c7eb650-578f-49e9-b0cd-34a5873cfb49";
const def_img = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";

function format_date(d) {
    return d.substring(0,10);
}

function check_data(articles) {
    console.log("----------WORLD ARTICLES-------------");
    // console.log(articles);
    result = [];
    for(i in articles) {
        // console.log("EVERY ARTICLE = "+articles[i].blocks.body[0].bodyTextSummary);
        if(articles[i].webTitle != null && articles[i].sectionId != null && articles[i].webPublicationDate != null && articles[i].blocks !=null && articles[i].blocks.body != null && articles[i].blocks.body[0].bodyTextSummary != "") {
            temp = {};
            temp['articleid'] = articles[i].id;
            temp['title'] = articles[i].webTitle;
            temp['section'] = (articles[i].sectionId).toUpperCase();
            temp['date'] = format_date(articles[i].webPublicationDate);
            temp['source'] = 'GUARDIAN';
            temp['description'] = articles[i].blocks.body[0].bodyTextSummary;
            temp['url'] = articles[i].webUrl;
            if(articles[i].blocks.main == null || articles[i].blocks.main.elements == null || Object.keys(articles[i].blocks.main.elements[0].assets).length == 0) {
                temp['image'] = def_img;
            }
            else {
                temp['image'] = articles[i].blocks.main.elements[0].assets[articles[i].blocks.main.elements[0].assets.length - 1].file;
            }
            result.push(temp);
        }
    }
    return result;
}

router.get('/', function (req, res) {
    var url = 'https://content.guardianapis.com/search?api-key='+api_key+'&section=(sport|business|technology|politics)&show-blocks=all'
    console.log("url = "+url);
    request.get(url, (errorResponse, response,data) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        jsonObj = JSON.parse(data);
        articles = jsonObj.response.results;
        result = [];
        result = check_data(articles);
        res.send(result);
        // res.send(jsonObj.response.results);
    });
});

router.get('/section/:sectionName', function (req, res) {
    const section_name = req.params.sectionName;
    var url = 'https://content.guardianapis.com/'+section_name+'?api-key='+api_key+'&show-blocks=all'
    console.log("url = "+url);
    request.get(url, (errorResponse, response,data) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        jsonObj = JSON.parse(data);
        result = [];
        articles = jsonObj.response.results;
        result = check_data(articles);
        res.send(result);
        // res.send(jsonObj.response.results);
    });
});


router.get('/article', function (req, res) {
    const article_id = req.query['aid'];
    var url = 'https://content.guardianapis.com/'+article_id+'?api-key='+api_key+'&show-blocks=all';
    console.log("url = "+url);
    request.get(url, (errorResponse, response,data) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        jsonObj = JSON.parse(data);
        result = [];
        articles = [];
        articles.push(jsonObj.response.content);
        // articles = jsonObj.response.content;
        console.log("articles[0]="+articles[0].blocks.body[0].bodyTextSummary);
        result = check_data(articles);
        res.send(result);
        // res.send(jsonObj.response.content);
    });
});

router.get('/search/', function (req, res) {
    // const query_Keyword = req.params.queryKeyword;
    const query_Keyword = req.query['finderid'];
    var url = 'https://content.guardianapis.com/search?q='+query_Keyword+'&api-key='+api_key+'&show-blocks=all';
    console.log("url = "+url);
    request.get(url, (errorResponse, response,data) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        jsonObj = JSON.parse(data);
        result = [];    
        articles = jsonObj.response.results;
        result = check_data(articles);
        res.send(result);
        // res.send(jsonObj.response.results);
    });
  });

module.exports = router;