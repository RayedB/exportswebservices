const Db = require('../db')

exports.add = (data) => Db.insert('companies',data)

exports.get = (name) =>  Db.get('companies',{name})

exports.getAll = () =>  Db.getAll('companies')

exports.getUsers = () => Db.getAllField('companies', 'users')

exports.getByUser = (email) => {
  return Db.getBy('companies', { 'users': email})
  .then(res => res[0])
}

exports.addUser = (email, company) => {
  return Db.pushArray('companies',company, 'users', email)
}
exports.addShipment = (shipment, company) => {
  return Db.pushArray('companies', company, 'shipments', shipment)
}

exports.updateShipmentSent = (file, id) => {
  const query = { 'shipments.bill.file': file }
  const toUpdate = { 'shipments.$.status': 'sent', 'shipments.$.docParserId': id}
  return Db.updateArray('companies', query, toUpdate)
}
