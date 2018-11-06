var mongoose = require('mongoose')

var candidateSchema = new mongoose.Schema({
  name: String,
  domains: Array,
  socialSites: Array,
  isAvailable: Boolean
})

module.exports = mongoose.model('Candidate', candidateSchema)
