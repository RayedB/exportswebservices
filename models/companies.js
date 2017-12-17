const Db = require('../db')

exports.add = (data) => Db.insert('companies',data)

exports.getAll = () =>  Db.getAll('companies')

exports.get = (name) =>  Db.get('companies',name)

 exports.getUsers = () => Db.getAllField('companies', 'users')
