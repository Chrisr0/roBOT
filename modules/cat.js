const fetch = require("node-fetch");

var catApiUrl = 'https://api.thecatapi.com/v1/images/search';

exports.getUrl = function() {
    var url;
    var response = fetch(catApiUrl);

    if(response.ok){
        url = response.json()[0].url;
    }else{
        url = 'error';
        console.log(response.status);
    }

    return url;
}
