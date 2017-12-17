const Db = require('../db')

exports.addOne = (data) => {
  return Db.insert('companies',data)
}

exports.getAll = () => {
  return Db.getAll('companies')
}
exports.get = (name) => {
  console.log(name)
  return Db.get('companies',name)
}
