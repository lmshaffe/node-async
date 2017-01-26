const async = require('async')

var generateGetUser = (id) => {

  return (callback) => {
    db.save()
    var user = {
      id: 99,
      name: 'Lee'
    }
    setTimeout(() => {
      console.log(id)
      callback(null, user);
    },3000)
  }
}

var generateError = () => {
  return (callback) => {
    callback('error')
  }
}

var generateGetContent = (contentId) => {
  
}

var asyncTasks = [generateGetUser(99), generateError()]

//reflectAll allows results to still come back from one of the functions even if one of them fails.
async.parallel(async.reflectAll(asyncTasks), (err, results) => {
  console.log(results)
})
