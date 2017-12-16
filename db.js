const { MongoClient } = require('mongodb')
const { dbUrl } = require('./conf')

let Db

exports.connectDb = () => {
        return MongoClient.connect(dbUrl)
        .then(client => {
          console.log('connected to DB')
          Db = client.db('project')

          Db.ensureIndex('companies', "name", { unique: true }, (err, obj) => {
            if (err) {
              console.log(err)
            }
          })
        })
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
exports.getBy = (collectionName, query, fields) => {

    return new Promise((resolve, reject) => {

        const collection = DB.collection(collectionName);

        collection.find(query, fields, (err, cursor) => {
             if (err) {
               reject(err)
            } else {
                cursor.toArray((err, data) => {
                    resolve(data)
                })
            }
        })
    })
}

exports.getAll = function(collectionName, fields = {}) {

    return new Promise((resolve, reject) => {

        const collection = Db.collection(collectionName)

        collection.find({}, fields, (err, cursor) => {

            if (err) {
                reject(err)
            } else {
                cursor.toArray((err, data) => {
                    resolve(data)
                })
            }
        })
    })
}
