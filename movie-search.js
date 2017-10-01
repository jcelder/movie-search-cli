const http = require('http')
const cheerio = require('cheerio')
const urlify = require('urlify')

const searchTerm = process.argv.slice(2);

if(!process.argv[2]) console.error('USAGE ERROR: Invalid or No Argument Supplied')
