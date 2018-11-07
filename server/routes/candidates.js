/* eslint-disable eqeqeq */
var express = require('express')
var router = express.Router()
var Candidate = require('../models/Candidate')
const Unirest = require('unirest')

/* GET Candidates */
router.get('/', (req, res, next) => {
  var candidates = []
  Candidate.find({}, (err, allCandidates) => {
    if (err) {
      console.log(err)
    } else {
      for (var i = 0; i < allCandidates.length; i++) {
        var nameData = {}
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
    res.send({
      candidates
    })
  })
})
// router.post('/', function (req, res, next) {
//   var newName = req.body.name
//   console.log(newName)
//   var newCandidate = {
//     name: newName
//   }
//   Candidate.findOneAndUpdate({
//     'name': newName
//   }, {
//     $set: {
//       'name': newName,
//       'domains': domains,
//       'socialSites': socialSites,
//       'pulled': 'false'
//     }
//   }, {
//     upsert: true
//   }, function (err, newlyCreated) {
//     if (err) {
//       console.log(err)
//     } else {
//       // redirect back to campground page
//       res.send(newlyCreated)
//     }
//   })
// })

router.post('/namecheck', async function (req, res, next) {
  var name = req.body.name
  var counter = 0
  var domains = []
  var userNamesAvailable = []
  var dotcom = true
  var falseDomains = 0
  var falseSocial = 0

  getDomains(checkDomains)

  // Check domain availabilty
  function getDomains (callback) {
    return new Promise((resolve) => {
      var url = 'https://api.godaddy.com/v1/domains/available?checkType=FAST'
      Unirest.post(url)
        .headers({
          'Authorization': 'sso-key e42XEN9ebVDq_RpCxjAeu1hrBixYT3vm8so:RpD6CHYYdtyw1n11ZKWXmP',
          'Content-Type': 'application/json'
        })
        .send(
        [
          name + '.com',
          name + '.net',
          name + '.org'
        ]
        )
        .end(function (response) {
          domains = response.body.domains
          resolve(domains)
        })
    })
      .then(() => {
        callback()
      })
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
          // Flag if the .com is available
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

  function finalCheck () {
    console.log('Start finalCheck')
    console.log(userNamesAvailable)
    console.log(counter)
    console.log(dotcom)

    // Default domain desireablilty to no
    var triage = 'no'

    if (falseDomains < 2 || falseSocial < 2) {
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
})

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
  }, function (err, newlyCreated) {
    if (err) {
      console.log(err)
    } else {
      // redirect back to campground page
      console.log('New Candidate Created')
    }
  })
}

module.exports = router
