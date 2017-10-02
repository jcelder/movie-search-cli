const http = require('http')
const cheerio = require('cheerio')

const searchTerm = process.argv.slice(2).join(' ')
if (!process.argv[2]) console.error('USAGE ERROR: Invalid or No Argument Supplied')

const urlSafe = (str) => {
  return str.replace(/ /g, '%2B')
}

const url = `http://www.imdb.com/find?ref_=nv_sr_fn&q=${urlSafe(searchTerm)}&s=all`
const results = []

const printSearchResults = () => {
  results.forEach((str) => {
    console.log(str.slice(0, str.indexOf('-')))
  })
}

http.get(url, (res) => {
  const { statusCode } = res;
  let error
  if (statusCode !== 200) {
    error = new Error(`Request Failed. \n
      Status Code: ${statusCode}`)
  }
  if (error) {
    console.error(error)
    res.resume();
  }

  res.setEncoding('utf8')
  let rawData = ''
  res.on('data', (chunk) => rawData += chunk )
  res.on('end', () => {
    try {
      const $ = cheerio.load(rawData)
      $('.findSection').first().find('.result_text').each(function (i, elem) {
        results[i] = $(elem).text()
      })
      // console.log(results)
      printSearchResults()
    } catch (e) {
      console.error(e.message)
    }
  })
})



module.exports = { urlSafe }
