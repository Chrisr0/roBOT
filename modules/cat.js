const request = require('request');

var catApiUrl = 'https://api.thecatapi.com/v1/images/search';

exports.getUrl = function() {
    var stream;
    stream = request(catApiUrl).pipe();
    const chunks = []
    return new Promise((resolve, reject) => {
    stream.on('data', chunk => chunks.push(chunk))
    stream.on('error', reject)
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
  })

}
