const express = require('express')
const bodyParser = require('body-parser');
const app = express()
let entityDataAction = require('./app/entityDataAction')

const port = process.env.PORT || 5050;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
    let query = 'select count(*) from products'
    let queryList = [];
    queryList.push('INSERT into products VALUES(default, "sundev")')
    queryList.push('INSERT into products VALUES(default, "suntest");')
    entityDataAction.saveMultiEntity({}, queryList, function(err, result){
        if(err){
           res.send(err)
        }else {
           res.send(result)
        }
    })

    //     .subscribe(function(result){
    //     callback(null, result);
    // })
});

// listen for requests
app.listen(port, () => {
    console.log('Server is listening on port :', port);

});



module.exports=app