const async = require('async')

var generateGetUser = (id) => {

  return (callback) => {
    //db.findOne()
    var user = {
      id: 99,
      name: 'Lee'
    }
    setTimeout(() => {
      console.log(`id: ${id}`)
      callback(null, user);
    },1000)
  }
}

var generateError = () => {
  return (callback) => {
    callback('Houston, we have an error')
  }
}

var generateGetContent = (contentId) => {
  return (callback) => {
    //db.findOne()
    var content = {
      id: 1,
      content: {
        tags: [
          'sample', 'test'
        ],
        details: {
          info: 'test info'
        }
      }
    }

    setTimeout(() => {
      console.log(`contentId: ${contentId}`)
      callback(null, content)
    },5000)
  }
}

var asyncTasks = [generateGetContent(1), generateError(), generateGetUser(99)]

//reflectAll allows results to still come back from one of the functions even if one of them fails.
async.parallel(async.reflectAll(asyncTasks), (err, results) => {
  var content = (results[0].value) ? results[0].value : null
  var otherData = (results[1].value) ? results[1].value : null
  var user = (results[2].value) ? results[2].value : null
  console.log(`Content: ${JSON.stringify(content, undefined, 2)}`)
  if (!otherData) console.log('I knew I would get an error!')
  console.log(`Other Data: ${JSON.stringify(otherData, undefined, 2)}`)
  console.log(`User: ${JSON.stringify(user, undefined, 2)}`)
})

var otherTasks = {
  'contentTask'   : generateGetContent(1),
  'otherDataTask' : generateError(),
  'userTask'      : generateGetUser(99)
}
// passing in tasks as an object allows for cleaner code rather than referencing an array index
async.parallel(async.reflectAll(otherTasks), (err, results) => {
  var user = (results.userTask) ? results.userTask.value : null
  var content = (results.contentTask) ? results.contentTask.value : null
  var otherData = (results.otherDataTask) ? results.otherDataTask.value : null
  console.log(`Content take 2: ${JSON.stringify(content, undefined, 2)}`)
  if (!otherData) console.log('I knew I would get an error again!')
  console.log(`Other Data take 2: ${JSON.stringify(otherData, undefined, 2)}`)
  console.log(`User take 2: ${JSON.stringify(user, undefined, 2)}`)
})
