const { MongoClient } = require('mongodb')
const { dbUrl } = require('./conf')

let Db

exports.connectDb = () => {
        return MongoClient.connect(dbUrl)
        .then(client => {
          console.log('connected to DB')
          Db = client.db('project')

          index('companies','name')
          index('users','email')
        })
      }

function index(coll, field) {
  Db.ensureIndex(coll, field, { unique: true }, (err, obj) => {
    if (err) {
      console.log(err)
    }
  })
}

exports.insert = (collectionName, data) => {
    return new Promise((resolve, reject) => {

        const collection = Db.collection(collectionName)

        collection.insertOne(data, (err, result) => {

            if (err) {
                reject(err)
            } else {
                resolve(data)
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

        const collection = Db.collection(collectionName)

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

exports.update = (collectionName, id, values) => {

    return new Promise((resolve, reject) => {

        // update
        const collection = Db.collection(collectionName)

        const field = collectionName == 'users' ? 'email' : 'name'

        collection.updateOne({ [field]: id }, { $set: values }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })

    })
}
exports.pushArray = (collectionName, id, array, value) => {

    return new Promise((resolve, reject) => {

        // update
        const collection = Db.collection(collectionName)

        const field = collectionName == 'users' ? 'email' : 'name'

        collection.updateOne({ [field]: id }, { $push: {[array]: value} }, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve()
            }
        })

    })
}
exports.getAllField = (collectionName, field) => {

    return new Promise((resolve, reject) => {

        // update
        const collection = Db.collection(collectionName)

        collection.distinct(field, (err, data) => {
            if (err) {
                reject(err)
            } else {
                resolve(data)
            }
        })

    })
}
