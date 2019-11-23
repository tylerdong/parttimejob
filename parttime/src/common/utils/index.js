let Type = (function () {
  let type = {}
  let typeArr = ['String', 'Object', 'Number', 'Array', 'Undefined', 'Function', 'Null', 'Symbol', 'Boolean', 'RegExp', 'BigInt']
  for (let i = 0; i < typeArr.length; i++) {
    (function (name) {
      type['is' + name] = function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + name + ']'
      }
    })(typeArr[i])
  }
  return type
})()

let RegExp = {
}

let Validator = {
  common: (rule, val, callback, title) => {
    // TODO
  }
}

export {
  Type,
  RegExp,
  Validator
}
