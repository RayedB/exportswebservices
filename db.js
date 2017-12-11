const { MongoClient } = require('mongodb')
const { dbUrl } = require('./conf')

let Db

exports.connectDb = () => {
        return MongoClient.connect(dbUrl)
        .then(db => {
          console.log('connected to DB')
          Db = db
        })
}

exports.index = function(collectionName, field, options) {
    if (Db) {
        Db.ensureIndex(collectionName, field, options, (err) => {
            if (err) {
                console.log(err)
            }
        })
    } else {
        console.error('*** DB is not ready')
    }
}

exports.insert = (collectionName, data) => {

    return new Promise((resolve, reject) => {

        const collection = Db.collection(collectionName)

        collection.insertOne(data, (err, result) => {

            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

exports.get = (collectionName, query) => {

    return new Promise((resolve, reject) => {

        const collection = Db.collection(collectionName)

        collection.findOne(query, (err, result) => {

            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
