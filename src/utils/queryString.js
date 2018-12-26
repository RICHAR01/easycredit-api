
export function queryString (obj, numPrefix, tempKey) {
  var outputString = []

  Object.keys(obj).forEach(function (val) {
    var key = val

    numPrefix && !isNaN(key) ? key = numPrefix + key : ''

    key = encodeURIComponent(key.replace(/[!'()*]/g, escape))
    tempKey ? key = tempKey + '[' + key + ']' : ''

    var value = encodeURIComponent(obj[val].replace(/[!'()*]/g, escape))
    outputString.push(key + '=' + value)
  })

  return outputString.join('&')
}
