const Db = require('../db')

exports.add = (data) => Db.insert('companies',data)

exports.get = (name) =>  Db.get('companies',name)

exports.getAll = () =>  Db.getAll('companies')

exports.getUsers = () => Db.getAllField('companies', 'users')
