const http = require('http')
const cheerio = require('cheerio')

const searchTerm = process.argv.slice(2).join(' ')
if(!process.argv[2]) console.error('USAGE ERROR: Invalid or No Argument Supplied')

const urlSafe = (str) => {
  return str
}


module.exports = { urlSafe }
