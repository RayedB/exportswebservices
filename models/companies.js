const Db = require('../db')

//Db.index('companies', 'name', { unique: true })

exports.addOne = (data) => {
  return Db.insert('companies',data)
}
