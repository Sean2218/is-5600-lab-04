const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

module.exports = {
  list
}

/**
 * This function reads and returns all product data.
 * @returns {Promise<Array>}
 */
async function list() {
  const data = await fs.readFile(productsFile)
  return JSON.parse(data)
}