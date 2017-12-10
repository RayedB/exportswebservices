const { MongoClient } = require('mongodb')
const { dbUrl } = require('./conf')

let Database

exports.connectDb = () => {
        return MongoClient.connect(dbUrl)
        .then(db => {
          console.log('connected to DB')
          Database = db
        })
}

exports.insert = (collectionName, data) => {

    return new Promise(function(resolve, reject) {

        const collection = Database.collection(collectionName)

        collection.insertOne(data, function(err, result) {

            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })
    })
}

exports.get = (collectionName, query) => {

    return new Promise(function(resolve, reject) {

        const collection = Database.collection(collectionName)

        collection.findOne(query, function(err, result) {

            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
