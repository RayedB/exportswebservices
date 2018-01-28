const CompanyModel = require('../models/companies')

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
  } catch(err) {
    console.log(err)
    res.status(500).send({error: 'Internal Error'})
  }
}
module.exports = newShipment
