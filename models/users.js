const Db = require('../db')

exports.add = (data) => Db.insert('users',data)

exports.get = (email) =>  Db.get('users',{email})

exports.update = (email,data) => Db.update('users', email, data)
