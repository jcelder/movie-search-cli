const http = require('http')
const cheerio = require('cheerio')

const searchTerm = process.argv.slice(2).join(' ')
if (!process.argv[2]) {
  console.error('USAGE ERROR: Invalid or No Argument Supplied')
  process.exit(1)
}

const urlSafe = (str) => {
  return str.replace(/ /g, '%2B')
}

const url = `http://www.im.com/find?ref_=nv_sr_fn&q=${urlSafe(searchTerm)}&s=all`

const printSearchResults = (results) => {
  results.forEach((str) => {
    console.log(str.slice(0, str.indexOf('-')))
  })
}

http.get(url, (res) => {
  const { statusCode } = res;
  let error
  if (statusCode !== 200) {
    error = new Error(`Request Failed.
      Status Code: ${statusCode}`)
  }
  if (error) {
    console.error(error.message)
    // consume response data to free up memory
    res.resume();
    return
  }

  res.setEncoding('utf8')
  let rawData = ''
  res.on('data', chunk => rawData += chunk )
  res.on('end', () => {
    try {
      const $ = cheerio.load(rawData)
      const results = $('.findSection').first().find('.result_text').map((i, elem) => $(elem).text())
      // console.log(results)
      printSearchResults(results.toArray())
    } catch (e) {
      console.error(e.message)
    }
  })
})



module.exports = { urlSafe }
