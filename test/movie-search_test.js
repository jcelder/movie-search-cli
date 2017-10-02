const expect = require('chai').expect
const exec = require('child_process').exec

describe('movie-search.js', function() {

  describe('CLI', function() {
    it('should show USAGE when no argument is supplied', (done) => {
      exec('node movie-search.js', (error, stdout, stderr) => {
              expect(stderr).to.deep.include('USAGE')
              done()
      })
    })
  })
  describe('urlSafe()', function() {
    it('should return \'finding%20nemo\' when passed \'finding nemo\'', () => {
      const urlSafe = require('../movie-search.js').urlSafe
      expect(urlSafe('finding nemo')).to.deep.equal('finding%20nemo')
    })
  })
})
