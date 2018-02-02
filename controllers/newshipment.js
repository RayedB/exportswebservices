const docparser = require('docparser-node')
const client = new docparser.Client(docParserAPIKey)
const CompanyModel = require('../models/companies')
const { docParserAPIKey } = require('../conf')

async function newShipment(req, res) {
  try {
    const shipment = {
      bill: {
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        encoding: req.file.encoding,
        file: req.file.filename
      },
      status: 'to_send'
    }
    const companyName = req.user.company
    await CompanyModel.addShipment(shipment, companyName)

    res.json({result: 'Shipment added'})

    const { parserId } = await CompanyModel.get(companyName)

    const filepath = './uploads/'+req.file.filename

    client.uploadFileByPath(parserId, filepath)
    .then(result => {
      console.log(result)
    })
    .catch(err => {
      console.log(err)
    })

  } catch(err) {
    console.log(err)
    res.status(500).send({error: 'Internal Error'})
  }
}

module.exports = newShipment
