const path = require('path')
const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

/**
 * Handle the root route
 * and send the index.html file.
 * @param {object} req
 * @param {object} res
 */
function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
}

/**
 * Get all products using limit, offset, and tag,
 * then return them as JSON.
 * @param {object} req
 * @param {object} res
 */
async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query

  res.json(
    await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag
    })
  )
}

/**
 * Get a single product by id.
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function getProduct(req, res, next) {
  const { id } = req.params
  const product = await Products.get(id)

  if (!product) {
    return next()
  }

  return res.json(product)
}

/**
 * Create a new product placeholder.
 * @param {object} req
 * @param {object} res
 */
async function createProduct(req, res) {
  console.log('request body:', req.body)
  res.json(req.body)
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct
})