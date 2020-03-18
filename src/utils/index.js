//类似PHP date函数,时间戳(到秒)转时间字符串，暂时支持'Y-m-d H:i:s'格式转为'2000-01-01 01:01:01'
export function date(formate, timestamp) {
  var ret = false;
  if (formate && typeof formate === 'string') {
    if (timestamp != null) {
      timestamp = timestamp * 1000;
    } else {
      timestamp = Date.parse(new Date());
    }
    var dateObj = new Date(timestamp),
      Y = dateObj.getFullYear();
    if (!isNaN(Y)) {
      var m = (dateObj.getMonth() + 1).toString().padStart(2, '0')
      var d = dateObj.getDate().toString().padStart(2, '0')
      var H = dateObj.getHours().toString().padStart(2, '0')
      var i = dateObj.getMinutes().toString().padStart(2, '0')
      var s = dateObj.getSeconds().toString().padStart(2, '0')
      w = dateObj.getDay();
      ret = formate.trim();
      ret = ret.replace(/Y/g, Y);
      ret = ret.replace(/m/g, m);
      ret = ret.replace(/d/g, d);
      ret = ret.replace(/H/g, H);
      ret = ret.replace(/i/g, i);
      ret = ret.replace(/s/g, s);
      ret = ret.replace(/w/g, w);
    }
  }
  return ret;
}
//类似PHP strtotime函数 日期/时间字符串（可以没有前导0） now计算返回值的时间戳（到秒）,格式不支持返回false
//暂时只支持2000-(/)01-(/)01 01:01(:01), 2000-(/)01-(/)01T01:01(:01), 2000-01-01, 2000/01/01, now, -+1 day (不支持+week+month+year等)
export function strtotime(timeStr, timestamp) {
  function getTime() {
    debugger
    var curTime = Date.parse(new Date()) / 1000;
    if (timestamp == null) {
      return curTime;
    } else {
      dateStr = date('Y/m/d', timestamp);
      timeStr = date('H:i:s', timestamp);
      return +new Date(dateStr + ' ' + timeStr) / 1000;
    }
  }
  var ret = false;
  if (timeStr && typeof timeStr === 'string') {
    timeStr = timeStr.trim().toLocaleLowerCase();
    var matchRes, dateStr, timeArr;
    if (timeStr === 'now') {
      ret = getTime();
    } else if (matchRes = /^([+-])(\d+)\s(\w+)$/.exec(timeStr)) {
      switch (matchRes[3]) {
        case 'day':
        case 'days':
          if (matchRes[1] === '+') {
            ret = getTime() + (+matchRes[2] * 60 * 60 * 24);
          } else {
            ret = getTime() - (+matchRes[2] * 60 * 60 * 24);
          }
          break;
      }
    } else {
      timeStr = timeStr.replace('t', ' ');
      if (timeStr.indexOf(' ') !== -1) {
        timeArr = timeStr.split(' ');
        if (timeArr.length === 2) {
          dateStr = timeArr[0].replace(/-/g, '/');
          timeStr = timeArr[1];
          ret = +new Date(dateStr + ' ' + timeStr) / 1000;
        }
      } else {
        dateStr = timeStr.replace(/-/g, '/');
        timeStr = '00:00:00';
        ret = +new Date(dateStr + ' ' + timeStr) / 1000;
      }
    }
  }
  return isNaN(ret) ? false : ret;
}
/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    return value.toString().padStart(2, '0')
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

/**
 * @param {Array} arr
 * @returns {Array}
 */
export function uniqueArr(arr) {
  return Array.from(new Set(arr))
}

/**
 * @returns {string}
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

class Cache {
  constructor() {
    this.cache = JSON.parse(localStorage.getItem('cache')) || {}
  }
  set(key, value, expire) {
    if (!this.cache[key]) {
      this.cache[key] = {}
    }
    if (typeof expire === 'number') {
      this.cache[key].expire = +new Date() + expire * 1000
    }
    this.cache[key].value = value
    localStorage.setItem('cache', JSON.stringify(this.cache))
  }
  get(key, def) {
    var item = this.cache[key]
    if (item && item.expire && +new Date() > item.expire) {
      this.delete(key)
      item = undefined
    }
    return item === undefined ? def : JSON.parse(JSON.stringify(item.value))
  }
  delete(...keys) {
    if (!keys.length) {
      localStorage.setItem('cache', JSON.stringify({}))
    } else {
      keys.forEach((item) => {
        delete this.cache[item]
      })
      localStorage.setItem('cache', JSON.stringify(this.cache))
    }
  }
}
var singleInstance = null
export function cache() {
  if (!singleInstance) {
    singleInstance = new Cache()
  }
  return singleInstance
}