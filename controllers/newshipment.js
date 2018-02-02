const docparser = require('docparser-node')
const { docParserAPIKey } = require('../conf')
const client = new docparser.Client(docParserAPIKey)
const CompanyModel = require('../models/companies')

async function newShipment(req, res) {
  try {
    const shipment = {
      bill: {
        name: req.file.originalname,
        mimetype: req.file.mimetype,
        file: req.file.filename
      },
      status: 'to_send'
    }
    const companyName = req.user.company
    await CompanyModel.addShipment(shipment, companyName)

    res.json({result: 'Shipment added'})

    sendToDocParser(companyName, req.file.filename)

  } catch(err) {
    console.log(err)
    res.status(500).send({error: 'Internal Error'})
  }
}

async function sendToDocParser(company, file) {
  try {
    const { parserId } = await CompanyModel.get(company)

    const filepath = './uploads/'+file

    const { id } = await client.uploadFileByPath(parserId, filepath)

    CompanyModel.updateShipmentSent(file,id)
    .catch(err => console.log(err))

  } catch (err) {
    console.log(err)
  }
}
module.exports = newShipment
