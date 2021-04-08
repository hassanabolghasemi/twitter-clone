const { customAlphabet } = require('nanoid')

exports.usernameGenerator = (profile) => {
  let uName = profile.displayName.split(' ').join('')
  if (uName.length > 10) {
    return uName.slice(0, 9) + String(Math.floor(Math.random() * 999999) + 1)
  } else {
    let randLen = 16 - uName.length
    let rand = Math.floor(Math.random() * (Math.pow(10, randLen) - 1)) + 1
    return uName + String(rand)
  }
}

exports.tweetIDGenerator = () => {
  const alphabet = '0123456789'
  const nanoid = customAlphabet(alphabet, 20)

  return nanoid()
}

exports.uniquePosts = (arr) => {
  return [...new Map(arr.map((post) => [post.id, post])).values()]
}

exports.uniqueUsers = (arr) => {
  return [...new Map(arr.map((user) => [user.username, user])).values()]
}
