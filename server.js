/**
 * Created by Михаил on 12.12.2017.
 */
const express = require('express');
const app = express();
const port = 3000;
app.use(express.static('public'));
app.get('/', (request, response) => {
    response.sendfile('index.html');
});
app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
            }
    console.log('server is listening on ${port}');
});
