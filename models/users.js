const Db = require('../db')

exports.add = (data) => Db.insert('users',data)
