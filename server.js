var connect = require('connect');
connect.createServer(
    connect.static('dist')
).listen(8080);