const path = require('path')
const Products = require('./products')

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

  try {
    res.json(
      await Products.list({
        offset: Number(offset),
        limit: Number(limit),
        tag
      })
    )
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

/**
 * Get a single product by id.
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
async function getProduct(req, res, next) {
  const { id } = req.params

  try {
    const product = await Products.get(id)

    if (!product) {
      return next()
    }

    return res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

module.exports = {
  handleRoot,
  listProducts,
  getProduct
}