const Db = require('../db')

<<<<<<< HEAD
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
=======
//Db.index('companies', 'name', { unique: true })

exports.addOne = (data) => {
  return Db.insert('companies',data)
}
>>>>>>> 1d7f607b8e59cf221a87312d6deeaeab8ca9c69c
