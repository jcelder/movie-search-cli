const http = require('http')
const cheerio = require('cheerio')

const searchTerm = process.argv.slice(2).join(' ')
if(!process.argv[2]) console.error('USAGE ERROR: Invalid or No Argument Supplied')

const urlSafe = (str) => {
  return str.replace(/ /g, '%2B')
}

const url = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${urlSafe(searchTerm)}&s=all`

http.get(url, (res) => {
  
})

module.exports = { urlSafe }
