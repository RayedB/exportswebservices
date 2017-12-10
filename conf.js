const { DBUSER, DBPASS } = process.env
exports.dbUrl = 'mongodb+srv://'+DBUSER+':'+DBPASS+'@ees-dujxd.mongodb.net/app'
