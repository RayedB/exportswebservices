const Db = require('../db')

exports.add = (data) => Db.insert('companies',data)

exports.get = (name) =>  Db.get('companies',name)

exports.getAll = () =>  Db.getAll('companies')

exports.getUsers = () => Db.getAllField('companies', 'users')

exports.getByUser = (email) => {
  return Db.getBy('companies', { 'users': email})
  .then(res => res[0])
}

exports.addUser = (email, company) => Db.pushArray('companies',company, "users", email)
exports.addShipment = (shipment, company) => Db.pushArray('companies', company,"shipments", shipment)
