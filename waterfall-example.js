const async = require('async')
const GitHubApi = require('github')

var github = new GitHubApi({
  version: '3.0.0'
})

var getUserAvatar = (callback) => {
  github.search.users({q:'airbnb'}, (err, result) => {
    if (err) {
      callback(err, null)
      return;
    }

    var avatarUrl = result.items[0].avatar_url
    callback(null, avatarUrl)
  })
}

var wrapAvatarInHtml = (avatarUrl, callback) => {
  var avatarWithHtml = `<img src=${avatarUrl} />`
  callback(null, avatarWithHtml)
}

async.waterfall([getUserAvatar, wrapAvatarInHtml], (err, results) => {
  if (err) {
    console.log(err)
    return
  }

  console.log(results)
})
