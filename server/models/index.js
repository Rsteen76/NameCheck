// Bring in the seperate models
const User = require('./user')
const Candidate = require('./Candidate')

// Import other models in the same manner

// Export models in a bundle
module.exports = {
  User,
  Candidate
}
