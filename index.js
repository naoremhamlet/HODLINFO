const express = require('express')
const PORT = process.env.PORT || 4040;
const { conn } = require('./connection');
var path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname,'public')));


const FetchAPI = require('./controller/FetchAPI');
const FetchDatabase = require('./controller/FetchDatabase');


app.on('ready', ()=> {
    FetchAPI(app, conn);
    FetchDatabase(app, conn);
})


app.listen(4040, () => {
    console.log(`Listening to ${PORT}`);
    app.emit('ready');
})