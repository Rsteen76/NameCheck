/* eslint-disable eqeqeq */
var Candidate = require('../models/Candidate')
const Unirest = require('unirest')

exports.getCandidates = (req, res, next) => {
  var candidates = []
  Candidate.find({}, (err, allCandidates) => {
    if (err) {
      console.log(err)
    } else {
      for (var i = 0; i < allCandidates.length; i++) {
        var nameData = {}
        nameData._id = allCandidates[i]._id
        nameData.name = allCandidates[i].name
        nameData.isAvailable = allCandidates[i].isAvailable
        allCandidates[i].domains.forEach(domain => {
          switch (domain.domain.slice(-4)) {
            case '.com':
              nameData.dotcom = domain.available
              break
            case '.org':
              nameData.dotorg = domain.available
              break
            case '.net':
              nameData.dotnet = domain.available
              break
          }
        })
        allCandidates[i].socialSites.forEach(socialSite => {
          switch (true) {
            case socialSite.callback_url.includes('google'):
              nameData.google = socialSite.available
              break
            case socialSite.callback_url.includes('facebook'):
              nameData.facebook = socialSite.available
              break
            case socialSite.callback_url.includes('instagram'):
              nameData.instagram = socialSite.available
              break
            case socialSite.callback_url.includes('slack'):
              nameData.slack = socialSite.available
              break
            case socialSite.callback_url.includes('twitter'):
              nameData.twitter = socialSite.available
              break
            case socialSite.callback_url.includes('youtube'):
              nameData.youtube = socialSite.available
              break
            default:
              break
          }
        })
        candidates.push(nameData)
      }
    }
    console.log(candidates)
    res.send({
      candidates
    })
  })
}

// Check if name is a yes, no or maybe and send back the result
exports.nameCheck = async (req, res, next) => {
  var name = req.body.name
  var counter = 0
  var domains = []
  var userNamesAvailable = []
  var dotcom = true
  var falseDomains = 0
  var falseSocial = 0

  getDomains(checkDomains)

  // Check domain availabilty
  async function getDomains (callback) {
    await new Promise((resolve) => {
      var url = 'https://api.godaddy.com/v1/domains/available?checkType=FAST'
      Unirest.post(url)
        .headers({
          'Authorization': 'sso-key e42XEN9ebVDq_RpCxjAeu1hrBixYT3vm8so:RpD6CHYYdtyw1n11ZKWXmP',
          'Content-Type': 'application/json'
        })
        .send([
          name + '.com',
          name + '.net',
          name + '.org'
        ])
        .end(function (response) {
          console.log(response.error)
          domains = response.body.domains
          resolve(domains)
        })
    })
    callback()
  }

  function checkDomains () {
    console.log(domains)
    // If no data is returned send error
    if (!domains) {
      console.log('No data returned')
      return next('No data returned')
    } else {
      // Check how many domains are unavailable
      for (var i = 0; i < domains.length; i++) {
        if (domains[i].available == false) {
          falseDomains++
          // Flag if the .com is not available
          if (domains[i].domain == name + '.com') {
            dotcom = false
          }
        }
      }
      getUsernames(finalCheck)
    }

    function getUsernames (callback) {
      // Social Sites to Check
      var sitenames = [
        'facebook',
        'twitter',
        'instagram',
        'youtube',
        'blogger',
        'slack'
      ]

      // Check Usename availabitliy
      let requests = sitenames.map((sitename) => {
        return new Promise((resolve) => {
          Unirest.post('https://api.namechk.com/services/check.json')
            .headers({
              'AUTHORIZATION': 'Bearer UMcLbvy2UARLngzqMTchIQ',
              'Accept': 'application/vnd.api.v1+json'
            }).send({
              'site': sitename,
              username: name
            }).end(function (response) {
              console.log(response.body.available)
              if (response.body.available == false) {
                falseSocial++
              }
              userNamesAvailable.push(response.body)
              resolve()
            })
        })
      })
      Promise.all(requests).then(() => {
        callback()
      })
    }
  }

  // Do final check for a yes, no or maybe for a name
  function finalCheck () {
    console.log('Start finalCheck')
    console.log(userNamesAvailable)
    console.log(falseSocial + ' FalseSocial')
    console.log(falseDomains + ' FalseDomains')
    console.log(dotcom + ' Dotcom Available')

    // Default domain desireablilty to no
    var triage = 'no'

    if (falseDomains < 2 && falseSocial < 2) {
      // Could be a yes or a maybe
      if (falseDomains == 1) {
        if (dotcom == false) {
          if (falseSocial < 2) {
            triage = 'maybe'
          }
        }
      } else if (falseSocial == 1) {
        triage = 'maybe'
      } else {
        triage = 'yes'
      }
    }
    if (triage != 'no') {
      var candidate = {
        'name': name,
        'domains': domains,
        'socialSites': userNamesAvailable,
        'isAvailable': (triage == 'yes')
      }
      createCandidate(candidate)
    }
    res.send(triage)
  }

  // Create a new candidate
  function createCandidate (candidate) {
    Candidate.findOneAndUpdate({
      'name': candidate.name
    }, {
      $set: {
        'name': candidate.name,
        'domains': candidate.domains,
        'socialSites': candidate.socialSites,
        'isAvailable': candidate.isAvailable
      }
    }, {
      upsert: true
    }, (err, newlyCreated) => {
      if (err) {
        // Log the error
        console.log(err)
      } else {
        // Log the success
        console.log('New Candidate Created')
      }
    })
  }
}

// Delete unwanted name
exports.delete = async (req, res) => {
  await Candidate
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({
        'message': 'Success'
      })
    })
    .catch(err => {
      res.status(500).json({
        err: err
      })
    })
}
