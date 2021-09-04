const http = require('http')
const config = require('../utils/config.utility')

/**
 * Recursive function to make http request to producer on '/generate' route
 */
function generateExpressions() {

    http.request({
        host: 'localhost',
        port: config.PRODUCER_PORT,
        path: '/generate'
      }, function(response) {
        let str = '';
        response.on('data', function(chunk) {
            str += chunk;
        });
        response.on('end', function() {
          console.log(str);
        });
        response.on('error', function(error) {
          throw new Error(error);
        });
      }).end();

    setTimeout(generateExpressions, 1000);
}

//calling recursive function
generateExpressions()
