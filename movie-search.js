const rp = require('request-promise')
const cheerio = require('cheerio')

const searchTerm = process.argv.slice(2).join(' ')
if (!process.argv[2]) {
  console.error('USAGE ERROR: Invalid or No Argument Supplied')
  process.exit(1)
}

const urlSafe = (str) => {
  return str.replace(/ /g, '%2B')
}

const url = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${urlSafe(searchTerm)}&s=all`

const options = {
  uri: url,
  transform: (body) => {
    return cheerio.load(body)
  }
}

const printSearchResults = (results) => {
  results.forEach((str) => {
    console.log(str.slice(0, str.indexOf('-')))
  })
}


rp(options)
  .then(($) => {
    const results = $('.findSection').first().find('.result_text').map((i, elem) => $(elem).text())
    printSearchResults(results.toArray())
  })
  .catch((err) => {
    console.error(err.message)
  })

module.exports = { urlSafe }
