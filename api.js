const Products = require('./products')
//const fs = require('fs').promises
const path = require('path')

/**
 * Handle the root route
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
}

/**
 * List all products
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  try {
    res.json(await Products.list())
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  handleRoot,
  listProducts
}