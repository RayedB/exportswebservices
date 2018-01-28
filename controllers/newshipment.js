const docparser = require('docparser-node')
const CompanyModel = require('../models/companies')
const { docParserAPIKey } = require('../conf')
const client = new docparser.Client(docParserAPIKey)

async function newShipment(req, res) {
  try {
    const shipment = {
      bill: {
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        encoding: req.file.encoding,
        file: req.file.filename
      },
      status: 'hihihi'
    }
    await CompanyModel.addShipment(shipment, req.user.company)
    res.json({result: 'Shipment added'})

    client.ping()
      .then(() => {
        console.log('authentication succeeded!')
      })
      .catch(function(err) {
        console.log('authentication failed!')
      })
  } catch(err) {
    console.log(err)
    res.status(500).send({error: 'Internal Error'})
  }
}
module.exports = newShipment
