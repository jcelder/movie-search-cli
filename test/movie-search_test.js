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

})
