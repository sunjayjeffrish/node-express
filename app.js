const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const dbConn = require('./config/db.config')

const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
    let query = 'select count(*) from products'
    dbConn.query(query, function(err, result){
        if(err){
            console.log('facing issues for dml : ',err);
        }else {
            console.log('Total count : ', result);
            res.send({"count": result})
        }
    })
});

// listen for requests
app.listen(port, () => {
    console.log('Server is listening on port :', port);

});

module.exports=app