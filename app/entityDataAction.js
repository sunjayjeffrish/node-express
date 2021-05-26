const Rx = require('rx-lite')
const dbConn = require('../config/db.config')
const Q = require('q')
const entityDataAction = function () {};
module.exports = entityDataAction;

entityDataAction.saveEntity = function (user, query, callback){
    dbConn.query(query, function(err, result){
        if(err){
            console.log('facing issues for dml : ',err);
            callback(err, null)
        }else {
            console.log('Total count : ', result);
            callback(null, result)
        }
    })
}

entityDataAction.saveEntityPromise = Q.denodeify(entityDataAction.saveEntity)

entityDataAction.saveMultiEntity = function(user, queryList, callback){
    let entitySaveObservables = []
    let savedEntities = {}
    queryList.forEach(query =>{
        entitySaveObservables.push(Rx.Observable.fromPromise(entityDataAction.saveEntityPromise(user, query)))
    });
    const entitySave$ = Rx.Observable.mergeDelayError(entitySaveObservables)
        .subscribe(function(result){
            if(result != null){
                savedEntities[result["id"]] = result
                console.log("Saved entities : ", savedEntities)
            }
        }, function(err){
            console.log("Facing error in saving ", err);
            callback(err, null)
        }, function() {
            callback(null, savedEntities)
        }
    )
}

entityDataAction.saveMultiEntityPromise = Q.denodeify(entityDataAction.saveMultiEntity)