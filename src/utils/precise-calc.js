/*
  * 将一个浮点数转成整数，返回整数和倍数。如 3.14 >> 314，倍数是 100
  * @param floatNum {number} 小数
  * @return {object}
  *   {times:100, num: 314}
  */
function toInteger(floatNum) {
  var ret = { times: 1, num: 0 }
  var isNegative = floatNum < 0
  if (isInteger(floatNum)) {
    ret.num = floatNum
    return ret
  }
  var strfi = floatNum + ''
  var dotPos = strfi.indexOf('.')
  var len = strfi.substr(dotPos + 1).length
  var times = Math.pow(10, len)
  var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
  ret.times = times
  if (isNegative) {
    intNum = -intNum
  }
  ret.num = intNum
  return ret
}
function isInteger(obj) {
  return Math.floor(obj) === obj
}
/**
 * 加法。
 * @param {Number} a
 * @param {Number} b
 */
const _add = (a, b) => {
  var o1 = toInteger(a)
  var o2 = toInteger(b)
  var n1 = o1.num
  var n2 = o2.num
  var t1 = o1.times
  var t2 = o2.times
  var max = t1 > t2 ? t1 : t2
  var result = null
  if (t1 === t2) { // 两个小数位数相同
    result = n1 + n2
  } else if (t1 > t2) { // o1 小数位 大于 o2
    result = n1 + n2 * (t1 / t2)
  } else { // o1 小数位 小于 o2
    result = n1 * (t2 / t1) + n2
  }
  return result / max
}

/**
 * 减法。
 * @param {Number} a
 * @param {Number} b
 */
const _sub = (a, b) => {
  var o1 = toInteger(a)
  var o2 = toInteger(b)
  var n1 = o1.num
  var n2 = o2.num
  var t1 = o1.times
  var t2 = o2.times
  var max = t1 > t2 ? t1 : t2
  var result = null
  if (t1 === t2) {
    result = n1 - n2
  } else if (t1 > t2) {
    result = n1 - n2 * (t1 / t2)
  } else {
    result = n1 * (t2 / t1) - n2
  }
  return result / max
}

/**
 * 乘法。
 * @param {Number} a
 * @param {Number} b
 */
const _mul = (a, b) => {
  var o1 = toInteger(a)
  var o2 = toInteger(b)
  var n1 = o1.num
  var n2 = o2.num
  var t1 = o1.times
  var t2 = o2.times
  // var max = t1 > t2 ? t1 : t2
  var result = null
  result = (n1 * n2) / (t1 * t2)
  return result
}

/**
 * 除法。
 * @param {Number} a
 * @param {Number} b
 */
const _div = (a, b) => {
  var o1 = toInteger(a)
  var o2 = toInteger(b)
  var n1 = o1.num
  var n2 = o2.num
  var t1 = o1.times
  var t2 = o2.times
  // var max = t1 > t2 ? t1 : t2
  var result = null
  result = (n1 / n2) * (t2 / t1)
  return result
}

const check = (item) => {
  if (isNaN(item) || item == null || item === '' || item === []) {
    throw item + '不是有数字'
  }
}
export function add(...params) {
  return params.reduce((total, item) => {
    check(item)
    return _add(total, item)
  })
}

export function sub(...params) {
  return params.reduce((total, item) => {
    check(item)
    return _sub(total, item)
  })
}

export function mul(...params) {
  return params.reduce((total, item) => {
    check(item)
    return _mul(total, item)
  })
}
export function div(...params) {
  return params.reduce((total, item) => {
    check(item)
    return _div(total, item)
  })
}
